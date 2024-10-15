import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InventoryChart from './InventoryChart';
import './Inventory.css'; // Import the CSS file

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <h1>Inventory</h1>
        <Link to="/add" className="add-item-button">Add New Item</Link>
      </header>
      <div className="inventory-grid">
        {items.map(item => (
          <div key={item._id} className="inventory-card">
            <h2 className="card-title">{item.name}</h2>
            <p className="card-description">{item.description || 'No description available'}</p>
            <p className="card-quantity">Quantity: {item.quantity}</p>
            <p className="card-price">Price: ${item.price.toFixed(2)}</p>
            <Link to={`/edit/${item._id}`} className="edit-button">Edit</Link>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <InventoryChart />
      </div>
    </div>
  );
}

export default Inventory;
