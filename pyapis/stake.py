import requests

# Define the API endpoint and headers
api_key = "dc9f5390d04f898e423dcda1c50b5eea"
subgraph_url = f"https://gateway.thegraph.com/api/{api_key}/subgraphs/id/Sxx812XgeKyzQPaBpR5YZWmGV5fZuBaPdh7DFhzSwiQ"

# Prompt user for sender address
sender_address = input("Enter the sender address: ")

# Define the query, incorporating the sender address
query = f"""
query MyQuery {{
  lidoSubmissions(where: {{sender: "{sender_address}"}}) {{
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

# Send the request
response = requests.post(subgraph_url, json={'query': query})

# Check for errors
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    
    # Extract the 'lidoSubmissions' field from the response
    submissions = data.get("data", {}).get("lidoSubmissions", [])
    
    # Initialize total shares and total amount of ETH
    total_shares = 0
    total_eth_transferred = 0.0  # Variable to track total ETH transferred

    # Check if submissions exist
    if submissions:
        for submission in submissions:
            # Convert amount from Wei to ETH
            amount_in_wei = int(submission.get('amount'))
            amount_in_eth = amount_in_wei / 10**18  # Conversion from Wei to Ether
            
            # Update total ETH transferred
            total_eth_transferred += amount_in_eth  # Add to total ETH
            
            # Get shares and sharesAfter as integers
            shares_after = int(submission.get('sharesAfter'))
            
            print("Submission Details:")
            print(f"  ID: {submission.get('id')}")
            print(f"  Sender: {submission.get('sender')}")
            print(f"  Amount (ETH): {amount_in_eth:.6f}")  # Display ETH with 6 decimal places
            print(f"  Transaction Hash: {submission.get('transactionHash')}")
            print(f"  Shares Before: {submission.get('sharesBefore')}")
            print(f"  Shares: {submission.get('shares')}")
            print(f"  Shares After: {shares_after}")
            print()  # Add an empty line for readability

            # Update total shares with the last 'sharesAfter' value
            total_shares = shares_after
        
        # Display total shares and total ETH at the end
        print(f"Total Shares in Wallet: {total_shares}")  # Display total shares as integer
        print(f"Total Amount of ETH Transferred to the Pool: {total_eth_transferred:.6f} ETH")  # Display total ETH transferred
    else:
        print("No submissions found for the given sender.")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
