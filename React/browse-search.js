// ProductSearch.js

import React, { useState } from 'react';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      // Make an API request to search for products
      const response = await fetch(`URL/${searchTerm}`);
      const data = await response.json();

      // Process the data (display results, etc.)
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ProductSearch;
