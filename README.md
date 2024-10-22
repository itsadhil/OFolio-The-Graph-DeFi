# 🚀 **OFolio Portfolio Dashboard** 🚀

OFolio is your one-stop decentralized finance (DeFi) portfolio dashboard, built to provide **real-time insights** into your assets, transactions, liquidity, staking, and much more. Whether you're a casual investor or a DeFi expert, OFolio brings clarity to your wallet, helping you monitor your entire DeFi portfolio in one seamless and intuitive interface. 🔥

![OFolio Logo](./assets/ofoliologo.png)

---

## 🌟 **Features At A Glance** 🌟

- **Portfolio Overview**: Track your **PNL** (Profit and Loss) and **Net Worth** at a glance. 📊
- **Token Assets**: Get detailed insights into your tokens, including balances, USD values, and price charts. 💰
- **Transaction History**: View a complete list of transactions, including transaction hashes, sender/receiver details, and value. 🔍
- **DeFi Positions**: Track your DeFi positions and monitor the performance of your staked assets. 📈
- **Liquidity Pools**: Dive deep into liquidity pool stats with detailed token amounts and liquidity information. 🌊
- **Staking & APR Data**: Keep an eye on your staking shares, ETH transferred, and live **APR** data fetched from **Dune Analytics**. 💎

---

## 💻 **Tech Stack**

### Frontend 🖥️
- **React.js**: Dynamic user interface built with **React** and **styled-components** for custom design.
- **Recharts**: Interactive charts to display **token balances**, **price trends**, and **PNL** performance.

### Backend 🔧
- **Flask**: Backend powered by Flask to fetch and process data from various blockchain APIs.
- **Moralis**: Real-time blockchain data provider for wallet balances, transactions, and token data.
- **The Graph**: Decentralized indexing protocol used for querying on-chain data.
- **Dune Analytics**: Live **APR** data extraction from Dune's blockchain analytics.

### APIs & Integrations 🌐
- **Moralis API**: Fetches real-time wallet balances, transaction history, and token details.
- **The Graph Protocol**: Aggregates data from DeFi protocols for liquidity and staking positions.
- **Dune Analytics**: Provides real-time **APR** and DeFi analytics data for staked assets.
- **OpenSea API**: Fetches NFT data for wallet assets and specific collections.

---

## ⚙️ **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/itsadhil/OFolio-The-Graph-DeFi
   cd OFolio-The-Graph-DeFi
   ```

2. **Install Frontend Dependencies**:
   Navigate to the `defi-app` folder and install the necessary dependencies:
   ```bash
   cd defi-app
   npm install
   ```

3. **Install Backend Dependencies**:
   Navigate to the `pyapis` folder for the backend setup:
   ```bash
   cd ../pyapis
   pip install -r requirements.txt
   ```

4. **Run the Frontend**:
   Start the React app by navigating back to the `defi-app` folder:
   ```bash
   cd ../defi-app
   npm start
   ```
   The app will run on `http://localhost:3000`.

5. **Run the Backend**:
   Now run the Flask backend to serve the API endpoints:
   ```bash
   cd ../pyapis
   python commonapi.py
   ```
   Flask will start running on `http://127.0.0.1:5000`.

---

## 💡 **How to Use**

1. **Connect Your Wallet**:
   Enter your **wallet address** in the input field to load and view real-time DeFi portfolio data. 

2. **Explore Your Dashboard**:
   Use the sidebar to navigate through different sections:
   - **Portfolio**: Check your PNL and Net Worth.
   - **Assets**: View token balances and USD values.
   - **Transactions**: Monitor your transaction history.
   - **Positions**: Track your DeFi staking and liquidity positions.
   - **Liquidity**: Dive into detailed liquidity pool data.
   - **Stakes & APR**: See staking shares and **APR** performance from Dune Analytics.

3. **Live APR**:
   Under the **Stakes** tab, view real-time APR data using the latest results from **Dune Analytics**.

---

## 🛠️ **API Endpoints**

### 🤑 **Wallet & Portfolio Data**

- **POST** `/get-pnl`: Fetches profit and loss data for the connected wallet.
- **POST** `/get-net-worth`: Retrieves the net worth of the wallet.
- **POST** `/get-token-balances`: Gets the current token balances for the wallet.
- **POST** `/get-transactions`: Fetches the transaction history of the wallet.
- **POST** `/get-positions`: Lists all DeFi staking positions.
- **POST** `/get-liquidity`: Retrieves liquidity pool data for the wallet.

### 💎 **Staking & APR Data**

- **POST** `/get-stakes`: Fetches staking details, including ETH transferred and shares.
- **GET** `/get-apr`: Retrieves the latest APR (Annual Percentage Rate) data from **Dune Analytics**.

---

## 🚀 **Future Improvements**

- **Multi-chain Support**: Extend support to multiple blockchains such as **Binance Smart Chain**, **Polygon**, and **Avalanche**.
- **NFT Portfolio**: View your entire NFT portfolio in one place, complete with real-time pricing and historical performance.
- **Portfolio Analytics**: Advanced metrics and historical charts for a deeper understanding of your DeFi positions.
- **Dark Mode**: A beautiful **dark mode** toggle to make the dashboard even easier on the eyes.

---

## 📜 **License**

This project is licensed under the **MIT License**. Check the [LICENSE](./LICENSE) file for more details.

---

**OFolio** is your gateway to mastering your DeFi investments. Built to give you full control over your assets, we are committed to improving transparency and access in the world of decentralized finance. 💼💡

> ✨ “The future of finance is DeFi, and the future of DeFi is in your hands with OFolio.” ✨

---

🔥 Made with 💙 by [itsadhil](https://github.com/itsadhil).
