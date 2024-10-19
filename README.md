
# OFolio Portfolio Dashboard

OFolio is a decentralized finance (DeFi) portfolio dashboard designed to give users a comprehensive view of their assets, transactions, staking, liquidity, and APR data. It is built using React.js on the frontend and Flask on the backend, integrating various blockchain APIs to fetch real-time wallet data.

## Key Features

- **Portfolio Overview**: Displays PNL (Profit and Loss) and Net Worth of the user's wallet.
- **Assets**: Provides detailed information on tokens, including balances and values.
- **Transactions**: Shows transaction history with hash, from/to details, and value.
- **Positions**: Lists DeFi positions with token balances and USD values.
- **Liquidity**: Displays liquidity pool data, including token amounts and liquidity.
- **Stakes**: Shows staking details like total shares and ETH transferred.
- **APR Data**: Retrieves the latest Annual Percentage Rate (APR) from Dune Analytics.

## Tech Stack

- **Frontend**: React.js, styled-components, Recharts
- **Backend**: Flask, Moralis API, The Graph, Dune Analytics
- **APIs Used**: Moralis, The Graph, Dune Analytics, OpenSea

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/itsadhil/OFolio-The-Graph-DeFi
   cd defi-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```

4. **Run the Backend**:
   ```bash
   cd ../pyapis
   python commonapi.py
   ```

5. **Open the App**: Visit `http://localhost:3000` to view the dashboard.

## How to Use

1. **Connect Wallet**: Input your wallet address to display all portfolio-related data.
2. **Navigate Sections**: Use the sidebar to switch between Portfolio, Assets, Transactions, Positions, Liquidity, and Stakes tabs.
3. **APR Data**: View the latest APR data under the Stakes tab.

## API Endpoints

- **POST /get-pnl**: Fetches profit and loss data.
- **POST /get-net-worth**: Fetches net worth of the wallet.
- **POST /get-token-balances**: Retrieves token balances.
- **POST /get-transactions**: Fetches transaction history.
- **POST /get-positions**: Retrieves DeFi positions.
- **POST /get-liquidity**: Retrieves liquidity pool data.
- **POST /get-stakes**: Fetches staking information.
- **GET /get-apr**: Retrieves APR data from Dune Analytics.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This `README.md` now correctly reflects the steps to install dependencies and run the frontend and backend, along with the necessary `npm` commands under the `defi-app` directory.
