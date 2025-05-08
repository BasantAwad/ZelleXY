// ShoppingHub.js

import React, { useState, useEffect } from 'react';

const ShoppingHub = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch category data from the API
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setCategoryData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <main className="parent">
      {categoryData.map((category) => (
        <div className="category" key={category.id}>
          <a href={category.link}>
            <i className="fas fa-store"></i>
            <h2>{category.name}</h2>
          </a>
        </div>
      ))}
    </main>
  );
};

export default ShoppingHub;
