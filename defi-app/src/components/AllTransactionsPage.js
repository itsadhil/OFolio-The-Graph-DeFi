import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Ensure this is correctly imported

const AllTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/transactions/file/YOUR_WALLET_ADDRESS');
        const data = await response.json();
        setTransactions(data.transactions || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  // Logic for displaying current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {currentTransactions.length > 0 ? (
          currentTransactions.map((transaction, index) => (
            <li key={index}>{transaction.details || `Transaction #${index + 1}`}</li>
          ))
        ) : (
          <li>No transactions found</li>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange} // Correctly pass the page change handler
        />
      )}
    </div>
  );
};

export default AllTransactionsPage;
