const express = require('express');
const Moralis = require('moralis').default;
const cors = require('cors');

const app = express();
app.use(cors()); // To handle CORS issues

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBjMjZlNjM0LTQyMWQtNGUwMi05ZDQ4LWQyM2IyMDI0ZGExMCIsIm9yZ0lkIjoiNDExMjQ2IiwidXNlcklkIjoiNDIyNjIxIiwidHlwZUlkIjoiMDgyOGQ3YzMtMGNlMC00Y2IzLWIxYzQtMmYwYjdhMzE1NDY5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg1ODAyNzMsImV4cCI6NDg4NDM0MDI3M30.xF1yDtuZvrfs5RcegmGo4yik22GBGhfIVgNAU3an9VE';

async function startMoralis() {
  await Moralis.start({
    apiKey: apiKey
  });
}

// Fetch wallet token balances
app.get('/wallet-balances/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: '0x1',
      address: walletAddress,
    });
    res.json(response.raw);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching token balances');
  }
});

// Fetch token price
app.get('/token-price/:tokenAddress', async (req, res) => {
  const { tokenAddress } = req.params;

  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: '0x1',
      include: 'percent_change',
      address: tokenAddress,
    });
    res.json(response.raw);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching token price');
  }
});

// Start the server
startMoralis()
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(error => console.error('Error starting Moralis', error));
