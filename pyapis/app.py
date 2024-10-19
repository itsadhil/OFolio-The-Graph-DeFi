from flask import Flask, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)

API_KEY = '432b63100f10424c9f44f8530b6479fe'
CONTRACT_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

# Route for random NFTs (Featured NFTs)
@app.route('/api/nfts', methods=['GET'])
def get_random_nfts():
    url = f"https://api.opensea.io/api/v2/chain/ethereum/contract/{CONTRACT_ADDRESS}/nfts/"
    headers = {"accept": "application/json", "x-api-key": API_KEY}
    nfts = []
    token_ids = random.sample(range(1, 9001), 4)  # Random 4 NFTs from token IDs 1 to 9000
    for token_id in token_ids:
        response = requests.get(f"{url}{token_id}", headers=headers)
        if response.status_code == 200:
            nft_data = response.json()
            nfts.append({
                "token_id": token_id,
                "name": nft_data['nft'].get('name', f"NFT #{token_id}"),
                "image_url": nft_data['nft'].get('image_url'),
                "floor_price": '1 ETH',  # Placeholder value
            })
    return jsonify(nfts)

# Route for ordered NFTs (Bored Ape collection)
@app.route('/api/boredape', methods=['GET'])
def get_boredape_nfts():
    url = f"https://api.opensea.io/api/v2/chain/ethereum/contract/{CONTRACT_ADDRESS}/nfts/"
    headers = {"accept": "application/json", "x-api-key": API_KEY}
    nfts = []
    # Fetch the first 10 NFTs in sequential order (adjust range as needed)
    for token_id in range(1, 6):  # Replace 6 with 11 or higher to get more results
        response = requests.get(f"{url}{token_id}", headers=headers)
        if response.status_code == 200:
            nft_data = response.json()
            nfts.append({
                "token_id": token_id,
                "name": nft_data['nft'].get('name', f"NFT #{token_id}"),
                "image_url": nft_data['nft'].get('image_url'),
                "floor_price": '1 ETH',  # Placeholder value
            })
    return jsonify(nfts)

# Route for fetching NFTs from a specific address
@app.route('/api/nfts/address/<address>', methods=['GET'])
def get_nfts_from_address(address):
    url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{address}/nfts"
    headers = {
        "accept": "application/json",
        "x-api-key": API_KEY
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to fetch NFTs"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
