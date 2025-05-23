import React from 'react';

function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Enter your full name..."
      className="form-control"
      style={{
        fontSize: '16px',
        padding: '14px 16px',
        borderRadius: '12px',
        border: '2px solid #ccc',
        width: '100%',
        marginBottom: '1rem',
        boxSizing: 'border-box',
      }}
    />


  );
}

export default SearchBar;