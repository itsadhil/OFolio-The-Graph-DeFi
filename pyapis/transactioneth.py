from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Moralis API Key
MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBjMjZlNjM0LTQyMWQtNGUwMi05ZDQ4LWQyM2IyMDI0ZGExMCIsIm9yZ0lkIjoiNDExMjQ2IiwidXNlcklkIjoiNDIyNjIxIiwidHlwZUlkIjoiMDgyOGQ3YzMtMGNlMC00Y2IzLWIxYzQtMmYwYjdhMzE1NDY5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg1ODAyNzMsImV4cCI6NDg4NDM0MDI3M30.xF1yDtuZvrfs5RcegmGo4yik22GBGhfIVgNAU3an9VE'


def fetch_transactions(wallet_address):
    url = f'https://deep-index.moralis.io/api/v2/{wallet_address}?chain=eth'
    
    headers = {
        "accept": "application/json",
        "X-API-Key": MORALIS_API_KEY
    }
    
    response = requests.get(url, headers=headers)
    
    # Check if request was successful
    if response.status_code == 200:
        data = response.json()
        transactions = []
        for tx in data['result']:  # Assuming the response is an array of transactions
            tx_data = {
                "hash": tx['hash'],
                "from": tx['from_address'],
                "to": tx['to_address'],
                "value": int(tx['value']) / (10 ** 18),  # Convert from Wei to Ether
                "timestamp": tx['block_timestamp']
            }
            transactions.append(tx_data)
        return transactions
    else:
        return None

@app.route('/transactions', methods=['GET'])
def get_transactions():
    wallet_address = request.args.get('walletAddress')
    if not wallet_address:
        return jsonify({"error": "Wallet address is required"}), 400

    transactions = fetch_transactions(wallet_address)
    if transactions is not None:
        return jsonify({"wallet": wallet_address, "transactions": transactions})
    else:
        return jsonify({"error": "Failed to fetch transactions"}), 500

if __name__ == '__main__':
    app.run(debug=True)
