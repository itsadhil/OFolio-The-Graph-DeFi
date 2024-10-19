import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const PortfolioDashboard = () => {
  const [pnlData, setPnlData] = useState({});
  const [netWorthData, setNetWorthData] = useState({});
  const [tokenData, setTokenData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [positionsData, setPositionsData] = useState([]);
  const [liquidityData, setLiquidityData] = useState([]);
  const [stakesData, setStakesData] = useState({ total_shares: 0, total_eth_transferred: 0.0 });
  const [aprData, setAprData] = useState('');  // State to store APR data
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Portfolio');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://127.0.0.1:5000/get-pnl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa', chain: 'eth' }),
          }),
          fetch('http://127.0.0.1:5000/get-net-worth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa', chain: 'eth' }),
          }),
          fetch('http://127.0.0.1:5000/get-token-balances', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa', chain: 'eth' }),
          }),
          fetch('http://127.0.0.1:5000/get-transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa', chain: 'eth' }),
          }),
          fetch('http://127.0.0.1:5000/get-positions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa', chain: 'eth' }),
          }),
          fetch('http://127.0.0.1:5000/get-liquidity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress: '0x00000000219ab540356cBB839Cbe05303d7705Fa' }),
          }),
        ]);

        const [pnlRes, netWorthRes, tokenRes, transactionRes, positionsRes, liquidityRes] = await Promise.all(responses.map(res => res.json()));
        setPnlData(pnlRes);
        setNetWorthData(netWorthRes);
        setTokenData(tokenRes.result || []);
        setTransactionData(transactionRes.result || []);
        setPositionsData(positionsRes.result || []);
        setLiquidityData(liquidityRes.result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStakesAndAprData = async () => {
      try {
        const stakesResponse = await fetch('http://127.0.0.1:5000/get-stakes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: '0xc36442b4a4522e871399cd717abdd847ab11fe88' }),
        });
        const stakesData = await stakesResponse.json();
        setStakesData(stakesData);

        // Fetch APR data
        const aprResponse = await fetch('http://127.0.0.1:5000/get-apr', {
          method: 'GET',
        });
        const aprData = await aprResponse.json();
        setAprData(aprData.apr_data);  // Store the APR data
      } catch (error) {
        console.error('Error fetching stakes or APR data:', error);
      }
    };

    if (activePage === 'Stakes') {
      fetchStakesAndAprData();
    }
  }, [activePage]);

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  // Sample data for charts
  const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4000 },
    { name: 'May', value: 6000 },
  ];

  const pieData = tokenData.map(token => ({
    name: token.name,
    value: token.usd_value || 0,
  }));

  const barData = tokenData.map(token => ({
    name: token.name,
    value: token.usd_value || 0,
  }));

  return (
    <DashboardContainer>
      <Sidebar>
        <LogoContainer>
          <LogoImage src={require('./ofoliologo.png')} alt="Logo" />
          <Logo>OFolio</Logo>
        </LogoContainer>
        <NavMenu>
          <NavItem active={activePage === 'Portfolio'} onClick={() => handleNavClick('Portfolio')}>Portfolio</NavItem>
          <NavItem active={activePage === 'Assets'} onClick={() => handleNavClick('Assets')}>Assets</NavItem>
          <NavItem active={activePage === 'Transactions'} onClick={() => handleNavClick('Transactions')}>Transactions</NavItem>
          <NavItem active={activePage === 'Positions'} onClick={() => handleNavClick('Positions')}>Positions</NavItem>
          <NavItem active={activePage === 'Liquidity'} onClick={() => handleNavClick('Liquidity')}>Liquidity</NavItem>
          <NavItem active={activePage === 'Stakes'} onClick={() => handleNavClick('Stakes')}>Stakes</NavItem> {/* New Stakes Tab */}
        </NavMenu>
      </Sidebar>

      <MainContent>
        <Header>
          <WalletButton>0xc36...fe88</WalletButton>
          <SearchBar placeholder="Search..." />
        </Header>

        {activePage === 'Portfolio' && (
          <PNLAndGraphContainer>
            <PNLCard>
              <PNLValue>${typeof pnlData.total_realized_profit_usd === 'number' ? pnlData.total_realized_profit_usd.toFixed(2) : '0.00'}</PNLValue>
              <PNLLabel>PNL</PNLLabel>
            </PNLCard>
            <PNLCard>
              <PNLValue>${typeof netWorthData.total_networth_usd === 'number' ? netWorthData.total_networth_usd.toFixed(2) : '0.00'}</PNLValue>
              <PNLLabel>Net Worth</PNLLabel>
            </PNLCard>
            <PerformanceContainer>
              {/* Line Chart */}
              <LineChart width={500} height={300} data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </PerformanceContainer>
            {/* Pie Chart */}
            <PieChart width={300} height={300}>
              <Pie data={pieData} cx={150} cy={150} labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {/* Bar Chart */}
            <BarChart width={500} height={300} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </PNLAndGraphContainer>
        )}

        {activePage === 'Assets' && (
          <AssetsSection>
            <AssetsTitle>Assets</AssetsTitle>
            <AssetsTable>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>Price</th>
                  <th>Value (USD)</th>
                </tr>
              </thead>
              <tbody>
                {tokenData.map((token, index) => (
                  <tr key={index}>
                    <td><img src={token.logo || ''} alt={token.symbol} width="30" /></td>
                    <td>{token.name}</td>
                    <td>{token.balance_formatted}</td>
                    <td>${typeof token.usd_price === 'number' ? token.usd_price.toFixed(2) : '0.00'}</td>
                    <td>${typeof token.usd_value === 'number' ? token.usd_value.toFixed(2) : '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </AssetsTable>
          </AssetsSection>
        )}

        {activePage === 'Transactions' && (
          <TransactionsSection>
            <AssetsTitle>Transaction History</AssetsTitle>
            <TransactionsTable>
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.hash}</td>
                    <td>{transaction.from_address}</td>
                    <td>{transaction.to_address}</td>
                    <td>${(transaction.value / 10 ** 18).toFixed(4)}</td>
                    <td>{new Date(transaction.block_timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </TransactionsTable>
          </TransactionsSection>
        )}

        {activePage === 'Positions' && (
          <PositionsSection>
            <AssetsTitle>DeFi Positions</AssetsTitle>
            <PositionsTable>
              <thead>
                <tr>
                  <th>Protocol</th>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>USD Value</th>
                </tr>
              </thead>
              <tbody>
                {positionsData.map((position, index) => (
                  position.tokens.map((token, tokenIndex) => (
                    <tr key={`${index}-${tokenIndex}`}>
                      <td>{position.protocol_name}</td>
                      <td>{token.name}</td>
                      <td>{token.balance_formatted}</td>
                      <td>${typeof token.usd_value === 'number' ? token.usd_value.toFixed(2) : '0.00'}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </PositionsTable>
          </PositionsSection>
        )}

        {activePage === 'Liquidity' && (
          <LiquiditySection>
            <AssetsTitle>Liquidity Data</AssetsTitle>
            <LiquidityTable>
              <thead>
                <tr>
                  <th>Pool ID</th>
                  <th>Total Amount0</th>
                  <th>Total Amount1</th>
                  <th>Liquidity</th>
                  <th>Token0</th>
                  <th>Token1</th>
                </tr>
              </thead>
              <tbody>
                {liquidityData.map((pool, index) => (
                  <tr key={index}>
                    <td>{pool.id}</td>
                    <td>{typeof pool.total_amount0 === 'number' ? pool.total_amount0.toFixed(2) : '0.00'}</td>
                    <td>{typeof pool.total_amount1 === 'number' ? pool.total_amount1.toFixed(2) : '0.00'}</td>
                    <td>{typeof pool.liquidity === 'number' ? pool.liquidity.toFixed(2) : '0.00'}</td>
                    <td>{pool.token0.name}</td>
                    <td>{pool.token1.name}</td>
                  </tr>
                ))}
              </tbody>
            </LiquidityTable>
          </LiquiditySection>
        )}

        {activePage === 'Stakes' && (
          <StakesSection>
            <AssetsTitle>Stakes Data</AssetsTitle>
            <StakesData>
              <p>Total Shares in Wallet: {stakesData.total_shares}</p>
              <p>Total Amount of ETH Transferred: {stakesData.total_eth_transferred.toFixed(6)} ETH</p>
            </StakesData>

            <APRSection>
              <APRTitle>APR Data</APRTitle>
              <APRData>{aprData}</APRData>
            </APRSection>
          </StakesSection>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default PortfolioDashboard;

// Styled Components for layout
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: rgba(0, 0, 0, 0.7); /* Make sidebar transparent */
  backdrop-filter: blur(10px); /* Optional: Add blur effect */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px; /* Curved edges */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* Optional: Add shadow for depth */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 40px; /* Adjust logo size */
  height: auto;
  margin-right: 10px; /* Spacing between logo and text */
`;

const Logo = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 24px;
  margin: 0; /* Remove default margin */
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#444' : 'transparent')}; /* Highlight active item */
  &:hover {
    background-color: #444;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto; /* Enable scrolling */
  max-height: calc(100vh - 60px); /* Keep it within the viewport height */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #222;
  border-radius: 10px; /* Add rounded corners */
`;

const WalletButton = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
`;

const SearchBar = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  width: 200px;
  &:focus {
    outline: none;
    border: 1px solid #007bff;
  }
`;

const PNLAndGraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const PNLCard = styled.div`
  width: 150px;
  text-align: center;
`;

const PNLValue = styled.p`
  font-size: 24px;
  color: #00ff00;
`;

const PNLLabel = styled.p`
  font-size: 12px;
  color: #aaa;
`;

const PerformanceContainer = styled.div`
  width: 80%; 
`;

const AssetsSection = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const AssetsTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  color: white;
`;

const AssetsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #444;
    color: white;
  }

  th {
    background-color: #222;
  }

  td {
    text-align: center;
  }
`;

const TransactionsSection = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #444;
    color: white;
  }

  th {
    background-color: #222;
  }

  td {
    text-align: center;
  }
`;

const PositionsSection = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const PositionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #444;
    color: white;
  }

  th {
    background-color: #222;
  }

  td {
    text-align: center;
  }
`;

const LiquiditySection = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const LiquidityTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #444;
    color: white;
  }

  th {
    background-color: #222;
  }

  td {
    text-align: center;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
`;

const StakesSection = styled.div`
  margin-top: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
`;

const StakesData = styled.div`
  color: white;
  font-size: 18px;
`;

const APRSection = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 18px;
`;

const APRTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  color: white;
`;

const APRData = styled.p`
  font-size: 18px;
  color: white;
`;
