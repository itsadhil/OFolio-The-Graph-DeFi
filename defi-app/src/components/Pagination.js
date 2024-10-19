import React from 'react';
import styled from 'styled-components';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page); // Make sure this function is passed correctly
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton key={i} onClick={() => handlePageChange(i)} active={i === currentPage}>
          {i}
        </PageButton>
      );
    }
    return buttons;
  };

  return (
    <PaginationContainer>
      {renderPageButtons()}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? '#007bff' : '#444')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;