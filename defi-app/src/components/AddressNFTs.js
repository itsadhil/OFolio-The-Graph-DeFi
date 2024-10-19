import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the address from the URL
import './MainUI.css'; // Reuse the MainUI styles for consistent design

const AddressNFTs = () => {
  const { address } = useParams(); // Get the address from the route
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTsFromAddress = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/nfts/address/${address}`);
        const data = await response.json();
        if (data.nfts && Array.isArray(data.nfts)) {
          setNfts(data.nfts);
        } else {
          setNfts([]);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch NFTs from address');
        setLoading(false);
      }
    };

    fetchNFTsFromAddress();
  }, [address]);

  return (
    <div className="main-ui-container">
      <h2>NFTs for Address {address}</h2>
      {loading ? (
        <div>Loading NFTs...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="nft-banner"> {/* Reuse the grid layout from MainUI */}
          {nfts.length > 0 ? (
            nfts.map((nft, index) => (
              <div key={nft.token_id || index} className="nft-card"> {/* Card styling */}
                <div className="image-container">
                  <img src={nft.image_url || '/default.png'} alt={nft.name} className="nft-image" />
                  <div className="nft-info">
                    <h3>{nft.name || `NFT #${nft.token_id}`}</h3>
                    <p className="floor-price">{nft.floor_price || 'N/A'} ETH</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No NFTs found for this address.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressNFTs;
