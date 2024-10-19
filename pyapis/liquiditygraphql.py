import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

liquidity_app = Flask(__name__)
CORS(liquidity_app)  # Enable CORS for the liquidity API

# Function to fetch mint data dynamically
def fetch_mint_data(wallet_address):
    url = "https://gateway.thegraph.com/api/dc9f5390d04f898e423dcda1c50b5eea/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B"
    query = f"""
    {{
      mints(where: {{sender: "{wallet_address}"}}) {{
        amount0
        amount1
        pool {{
          id
          liquidity
        }}
        token0 {{
          id
          name
        }}
        token1 {{
          id
          name
        }}
      }}
    }}
    """
    response = requests.post(url, json={'query': query})
    return response.json()

# API route to get liquidity data
@liquidity_app.route('/get-liquidity', methods=['POST'])
def get_liquidity():
    data = request.json
    wallet_address = data.get('walletAddress')

    if not wallet_address:
        return jsonify({"error": "Wallet address is required"}), 400

    mint_response = fetch_mint_data(wallet_address)

    # Check for errors in the response
    if 'errors' in mint_response:
        return jsonify({"error": mint_response['errors']}), 500

    # Aggregate transaction data (you can add your aggregation logic here)

    return jsonify(mint_response)

if __name__ == '__main__':
    liquidity_app.run(debug=True, port=5001)  # You can choose any available port
