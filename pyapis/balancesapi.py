from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Moralis API Key
MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBjMjZlNjM0LTQyMWQtNGUwMi05ZDQ4LWQyM2IyMDI0ZGExMCIsIm9yZ0lkIjoiNDExMjQ2IiwidXNlcklkIjoiNDIyNjIxIiwidHlwZUlkIjoiMDgyOGQ3YzMtMGNlMC00Y2IzLWIxYzQtMmYwYjdhMzE1NDY5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg1ODAyNzMsImV4cCI6NDg4NDM0MDI3M30.xF1yDtuZvrfs5RcegmGo4yik22GBGhfIVgNAU3an9VE'

def fetch_token_balances(wallet_address):
    url = f'https://deep-index.moralis.io/api/v2/{wallet_address}/erc20?chain=eth'
    
    headers = {
        "accept": "application/json",
        "X-API-Key": MORALIS_API_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    # Check if request was successful
    if response.status_code == 200:
        data = response.json()
        token_balances = []
        for token in data:
            token_data = {
                "token": token['name'],
                "symbol": token['symbol'],
                "balance": int(token['balance']) / (10 ** int(token['decimals']))
            }
            token_balances.append(token_data)
        return token_balances
    else:
        return None

@app.route('/token-balances', methods=['GET'])
def get_token_balances():
    wallet_address = request.args.get('walletAddress')
    if not wallet_address:
        return jsonify({"error": "Wallet address is required"}), 400

    token_balances = fetch_token_balances(wallet_address)
    if token_balances is not None:
        return jsonify({"wallet": wallet_address, "balances": token_balances})
    else:
        return jsonify({"error": "Failed to fetch token balances"}), 500

if __name__ == '__main__':
    app.run(debug=True)
