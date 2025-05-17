import React from 'react';

function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      className="form-control w-100 w-md-50 mx-auto"
      placeholder="Type your name..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;