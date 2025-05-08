// ShopByStore.js

import React, { useState, useEffect } from 'react';

const ShopByStore = () => {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    // Fetch store data from the API
    const fetchStoreData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        setStoreData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStoreData();
  }, []);

  return (
    <main className="parent">
      {storeData.map((store) => (
        <div className="store" key={store.id}>
          <a href={store.link}>
            <i className="fas fa-store"></i>
            <h2>{store.name}</h2>
          </a>
        </div>
      ))}
    </main>
  );
};

export default ShopByStore;
