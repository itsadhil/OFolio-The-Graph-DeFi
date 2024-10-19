import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add React Router's useNavigate for redirection
import './MainUI.css'; 

const MainUI = () => {
  const [featuredNFTs, setFeaturedNFTs] = useState([]);
  const [boredApeNFTs, setBoredApeNFTs] = useState([]); 
  const [trendingNFTs, setTrendingNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const exploreRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (event) => {
    event.preventDefault();
    const address = event.target.elements.search.value.trim(); // Get the address from the input
    if (address) {
      navigate(`/address/${address}`); // Redirect to the new page with the address
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (exploreRef.current) {
        const rect = exploreRef.current.getBoundingClientRect();
        const fullyInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        setIsInView(fullyInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchFeaturedNFTs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/nfts');
        const data = await response.json();
        setFeaturedNFTs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured NFTs');
        setLoading(false);
      }
    };

    const fetchBoredApeNFTs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/boredape');  
        const data = await response.json();
        setBoredApeNFTs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Bored Ape NFTs');
        setLoading(false);
      }
    };

    const fetchTrendingNFTs = async () => {
      try {
        const trendingData = [
          { id: 1, collection_name: 'Courtyard.io', floor_price: '18 POL', volume: '3.8 ETH' },
          { id: 2, collection_name: 'TODAY - Mythic', floor_price: '0.07 ETH', volume: '6.3 ETH' },
          { id: 3, collection_name: 'Sprotoladys', floor_price: '0.05 ETH', volume: '0.78 ETH' },
          { id: 4, collection_name: 'Lil Pudgys', floor_price: '0.82 ETH', volume: '3.1 ETH' },
          { id: 5, collection_name: 'Mutant Ape Yacht', floor_price: '1.81 ETH', volume: '6.5 ETH' },
          { id: 6, collection_name: 'BAKC', floor_price: '0.33 ETH', volume: '0.93 ETH' },
          { id: 7, collection_name: 'Ninja Squad Official', floor_price: '0.14 ETH', volume: '0.38 ETH' },
          { id: 8, collection_name: 'Treehouse Squirrel', floor_price: '0.29 ETH', volume: '0.54 ETH' },
          { id: 9, collection_name: 'Pudgy Penguins', floor_price: '9.40 ETH', volume: '8.8 ETH' },
          { id: 10, collection_name: 'Sproto Gremlins', floor_price: '4.00 ETH', volume: '3.1 ETH' },
        ];
        setTrendingNFTs(trendingData);
      } catch (err) {
        console.error('Failed to fetch trending NFTs:', err);
      }
    };

    fetchFeaturedNFTs();
    fetchBoredApeNFTs();  
    fetchTrendingNFTs();
  }, []);

  return (
    <div className="main-ui-container">
      <header className="header">
        <div className="logo">
          <video className="logo-video" autoPlay muted>
            <source src={require('./logo.webm')} type="video/webm" />
          </video>
        </div>
        <form onSubmit={handleSearch} className="search-container">
          <input 
            type="text" 
            name="search" // Use the name attribute to fetch value
            placeholder="Search NFTs by Address..." 
            className="search-bar"
          />
          <button type="submit">Search</button>
        </form>
        <button className="connect-wallet-button">Connect Wallet</button>
      </header>

      {/* Featured NFTs */}
      <section className="featured-nfts">
        <h2>Featured NFTs</h2>
        {loading ? (
          <div>Loading NFTs...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="nft-banner">
            {featuredNFTs.map((nft, index) => (
              <div key={nft.token_id || index} className="nft-card">
                <div className="image-container">
                  <img src={nft.image_url || '/default.png'} alt={nft.name} className="nft-image" />
                  <div className="nft-info">
                    <h3>{nft.name || `NFT #${nft.token_id}`}</h3>
                    <p className="floor-price">{nft.floor_price || 'N/A'} ETH</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending NFTs */}
      <section className="trending-nfts">
        <h2>Trending</h2>
        <table className="trending-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Collection</th>
              <th>Floor Price</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {trendingNFTs.length > 0 ? trendingNFTs.map((nft, index) => (
              <tr key={nft.id}>
                <td>{index + 1}</td>
                <td>{nft.collection_name}</td>
                <td>{nft.floor_price}</td>
                <td>{nft.volume}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No trending data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Explore NFTs Title */}
      <section className={`explore-nft-section ${isInView ? 'in-view' : ''}`} ref={exploreRef}>
        <h2 className="explore-nfts-title">Explore NFTs</h2>
      </section>

      {/* Bored Ape Banner */}
      <section className="bored-ape-banner">
        <div className="banner-container">
          <img src={require('./bored-ape-yacht-club-banner-1-758x379.jpg')} alt="Bored Ape Banner" className="bored-ape-banner-image" />
          <div className="banner-gradient">
            <div className="banner-text">
              <h2>Visit Bored Ape Collection</h2>
              <a href="/boredape" className="visit-link">Explore Now →</a>
            </div>
            </div>
        </div>
      </section>

      {/* Bored Ape Collection Section */}
      <section className="bored-ape-collection">
        <div className="nft-banner">
          {boredApeNFTs.map((nft, index) => (
            <div key={nft.token_id || index} className="nft-card">
              <div className="image-container">
                <img src={nft.image_url || '/default.png'} alt={nft.name} className="nft-image" />
                <div className="nft-info">
                  <h3>{nft.name || `NFT #${nft.token_id}`}</h3>
                  <p className="floor-price">{nft.floor_price || 'N/A'} ETH</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainUI;

