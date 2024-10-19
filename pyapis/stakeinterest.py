from dune_client.client import DuneClient
from datetime import datetime

# Initialize the Dune client with your API key
dune = DuneClient("Wz0bbLIGHp7YTt5rc1IO9EgF910WPa8M")

# Function to format the latest entry of the query data
def format_latest_entry(query_result):
    # Extract the rows from the query_result object directly
    rows = query_result.result.rows  # Accessing rows directly from the result

    if not rows:
        raise ValueError("No data found in the query result.")

    # Convert the time strings to datetime objects for sorting
    for row in rows:
        row['time'] = datetime.strptime(row['time'], '%Y-%m-%d %H:%M:%S.%f UTC')

    # Sort rows by the 'time' field in descending order
    sorted_rows = sorted(rows, key=lambda x: x['time'], reverse=True)

    # Get the latest entry
    latest_entry = sorted_rows[0]  # Access the first entry after sorting

    # Extract and format each relevant APR field from the latest entry
    date = latest_entry.get('time', 'N/A')
    instant_apr = latest_entry.get('Lido staking APR(instant)', 'N/A')
    apr_30 = latest_entry.get('Lido staking APR(ma_30)', 'N/A')
    apr_7 = latest_entry.get('Lido staking APR(ma_7)', 'N/A')
    protocol_apr_7 = latest_entry.get('protocol APR(ma_7)', 'N/A')
    protocol_apr = latest_entry.get('protocol_apr', 'N/A')

    # Format the data for the latest entry
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
    """Format APR values; if it's a number, format as a percentage."""
    try:
        return f"{float(value):.2f}%" if isinstance(value, (int, float)) else value
    except (ValueError, TypeError):
        return 'N/A'


# Get the latest result for the query
query_result = dune.get_latest_result(570874)

try:
    # Process the query result to extract and format only the latest entry
    latest_data = format_latest_entry(query_result)

    # Display the latest entry data in the terminal
    print("Latest APR Data:")
    print(latest_data)

except Exception as e:
    print(f"An error occurred: {e}")
