from flask import Flask, jsonify, request
from flask_cors import CORS
from moralis import evm_api
from collections import defaultdict
import requests
import random
from dune_client.client import DuneClient
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS

# Moralis API key for wallet-related operations
api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI0Njc4ZGU3LWQ5NDktNDhkNC1hMmRjLWU1ZDg3MzkwYTMxMyIsIm9yZ0lkIjoiNDEyNDg4IiwidXNlcklkIjoiNDIzODkzIiwidHlwZUlkIjoiN2E1NTQ5NzAtNmYxOC00NzRmLTg1ZWUtYThmNmI3NzEyNTdhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjkzNTAwNDksImV4cCI6NDg4NTExMDA0OX0.eaxB1PBXrM5j7Ok4rdxiPoi-_nfonBgN0YrjUbG0atY"

# OpenSea API configurations
API_KEY = '432b63100f10424c9f44f8530b6479fe'
CONTRACT_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

# Dune API Client
dune = DuneClient("Wz0bbLIGHp7YTt5rc1IO9EgF910WPa8M")

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

# PNL Route
@app.route('/get-pnl', methods=['POST'])
def get_pnl():
    data = request.json
    wallet_address = data.get('walletAddress')
    chain = data.get('chain', 'eth')  # Default to Ethereum if not provided
    
    params = {
        "chain": chain,
        "address": wallet_address
    }
    
    try:
        result = evm_api.wallets.get_wallet_profitability_summary(
            api_key=api_key,
            params=params
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fixed Net Worth Route with Debugging
@app.route('/get-net-worth', methods=['POST'])
def get_net_worth():
    data = request.json
    wallet_address = data.get('walletAddress')
    
    # Debugging print to check wallet address received by the server
    print(f"Fetching net worth for wallet: {wallet_address}")
    
    params = {
        "exclude_spam": True,
        "exclude_unverified_contracts": True,
        "address": wallet_address
    }

    try:
        # Fetching the net worth from Moralis API
        result = evm_api.wallets.get_wallet_net_worth(
            api_key=api_key,
            params=params
        )
        
        # Debugging print to check the response from Moralis API
        print(f"Net worth API response: {result}")
        
        # Check if the response contains the required field
        if "total_networth_usd" in result:
            return jsonify(result)
        else:
            # Log if the expected field is missing
            print("Error: 'total_networth_usd' not found in response.")
            return jsonify({"error": "'total_networth_usd' not found in response"}), 500
    except Exception as e:
        # Log the exception and return an error response
        print(f"Error fetching net worth: {e}")
        return jsonify({"error": str(e)}), 500

# Token Balances Route
@app.route('/get-token-balances', methods=['POST'])
def get_token_balances():
    data = request.json
    wallet_address = data.get('walletAddress')
    chain = data.get('chain', 'eth')  # Default to Ethereum if not provided
    
    params = {
        "chain": chain,
        "address": wallet_address
    }
    
    try:
        result = evm_api.wallets.get_wallet_token_balances_price(
            api_key=api_key,
            params=params
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Transactions Route
@app.route('/get-transactions', methods=['POST'])
def get_transactions():
    data = request.json
    wallet_address = data.get('walletAddress')
    chain = data.get('chain', 'eth')  # Default to Ethereum if not provided

    params = {
        "chain": chain,
        "order": "DESC",
        "address": wallet_address
    }

    try:
        result = evm_api.transaction.get_wallet_transactions(
            api_key=api_key,
            params=params
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Positions Route
@app.route('/get-positions', methods=['POST'])
def get_positions():
    data = request.json
    wallet_address = data.get('walletAddress')
    chain = data.get('chain', 'eth')

    params = {
        "chain": chain,
        "address": wallet_address
    }

    try:
        result = evm_api.wallets.get_defi_positions_summary(
            api_key=api_key,
            params=params
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Liquidity Route
@app.route('/get-liquidity', methods=['POST'])
def get_liquidity():
    data = request.json
    wallet_address = data.get('walletAddress')

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
    mint_data = response.json()
    
    if 'errors' in mint_data:
        return jsonify({"error": mint_data['errors']}), 500

    # Aggregate token values for each pool ID
    pool_transactions = defaultdict(lambda: {
        "total_amount0": 0,
        "total_amount1": 0,
        "liquidity": 0,
        "token0": None,
        "token1": None,
        "pool_id": None,
    })

    for mint in mint_data['data']['mints']:
        pool_id = mint["pool"]["id"]
        amount0 = float(mint["amount0"])
        amount1 = float(mint["amount1"])
        liquidity = float(mint["pool"]["liquidity"])

        pool_transactions[pool_id]["total_amount0"] += amount0
        pool_transactions[pool_id]["total_amount1"] += amount1

        if liquidity > pool_transactions[pool_id]["liquidity"]:
            pool_transactions[pool_id]["liquidity"] = liquidity

        if pool_transactions[pool_id]["token0"] is None:
            pool_transactions[pool_id]["token0"] = {
                "id": mint["token0"]["id"],
                "name": mint["token0"]["name"]
            }
            pool_transactions[pool_id]["token1"] = {
                "id": mint["token1"]["id"],
                "name": mint["token1"]["name"]
            }
            pool_transactions[pool_id]["pool_id"] = pool_id

    return jsonify({"result": list(pool_transactions.values())})

# New Route for fetching staking information
@app.route('/get-stakes', methods=['POST'])
def get_stakes():
    data = request.json
    wallet_address = data.get('walletAddress')

    subgraph_url = "https://gateway.thegraph.com/api/dc9f5390d04f898e423dcda1c50b5eea/subgraphs/id/Sxx812XgeKyzQPaBpR5YZWmGV5fZuBaPdh7DFhzSwiQ"

    # Define the query for fetching stake details
    query = f"""
    query MyQuery {{
      lidoSubmissions(where: {{sender: "{wallet_address}"}}) {{
        amount
        transactionHash
        id
        sender
        shares
        sharesAfter
        sharesBefore
      }}
    }}
    """

    response = requests.post(subgraph_url, json={'query': query})

    if response.status_code == 200:
        data = response.json()
        submissions = data.get("data", {}).get("lidoSubmissions", [])

        total_shares = 0
        total_eth_transferred = 0.0

        if submissions:
            for submission in submissions:
                amount_in_wei = int(submission.get('amount'))
                amount_in_eth = amount_in_wei / 10**18
                total_eth_transferred += amount_in_eth
                shares_after = int(submission.get('sharesAfter'))
                total_shares = shares_after

            return jsonify({
                "total_shares": total_shares,
                "total_eth_transferred": total_eth_transferred
            })
        else:
            return jsonify({"total_shares": 0, "total_eth_transferred": 0.0})

    return jsonify({"error": "Unable to fetch staking data"}), response.status_code

# New Route for fetching APR data using Dune
@app.route('/get-apr', methods=['GET'])
def get_apr():
    query_id = 570874  # Replace with your query ID
    try:
        query_result = dune.get_latest_result(query_id)
        latest_data = format_latest_entry(query_result)
        return jsonify({"apr_data": latest_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Helper function to format the latest APR entry
def format_latest_entry(query_result):
    rows = query_result.result.rows
    if not rows:
        raise ValueError("No data found in the query result.")

    # Convert the time strings to datetime objects for sorting
    for row in rows:
        row['time'] = datetime.strptime(row['time'], '%Y-%m-%d %H:%M:%S.%f UTC')

    # Sort rows by the 'time' field in descending order
    sorted_rows = sorted(rows, key=lambda x: x['time'], reverse=True)

    # Get the latest entry
    latest_entry = sorted_rows[0]

    date = latest_entry.get('time', 'N/A')
    instant_apr = latest_entry.get('Lido staking APR(instant)', 'N/A')
    apr_30 = latest_entry.get('Lido staking APR(ma_30)', 'N/A')
    apr_7 = latest_entry.get('Lido staking APR(ma_7)', 'N/A')
    protocol_apr_7 = latest_entry.get('protocol APR(ma_7)', 'N/A')
    protocol_apr = latest_entry.get('protocol_apr', 'N/A')

    formatted_entry = (
        f"Date: {date}\n"
        f"Instant APR: {format_apr(instant_apr)}\n"
        f"30-day APR: {format_apr(apr_30)}\n"
        f"7-day APR: {format_apr(apr_7)}\n"
        f"Protocol APR (ma_7): {format_apr(protocol_apr_7)}\n"
        f"Protocol APR: {format_apr(protocol_apr)}\n"
    )

    return formatted_entry

def format_apr(value):
    try:
        return f"{float(value):.2f}%" if isinstance(value, (int, float)) else value
    except (ValueError, TypeError):
        return 'N/A'

if __name__ == '__main__':
    app.run(debug=True)
