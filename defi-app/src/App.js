import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ConnectWalletModal from './components/ConnectWalletModal';
import PortfolioDashboard from './components/PortfolioDashboard'; // Portfolio page
import AllTransactionsPage from './components/AllTransactionsPage'; // Paginated transactions page
import MainUi from './components/MainUI'; // Import the MainUi component

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      {/* Conditionally show the Navbar only on the homepage */}
      {location.pathname === '/' && <Navbar openModal={handleOpenModal} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Footer />
              {isModalOpen && <ConnectWalletModal closeModal={handleCloseModal} />}
            </>
          }
        />
        {/* Portfolio Dashboard route */}
        <Route path="/portfolio" element={<PortfolioDashboard />} />
        {/* Paginated Transactions Page route */}
        <Route path="/all-transactions" element={<AllTransactionsPage />} />
        {/* New route for MainUi */}
        <Route path="/openblock" element={<MainUi />} /> {/* New route for MainUi */}
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
