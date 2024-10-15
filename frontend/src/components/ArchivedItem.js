import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArchivedItem.css'; // Import the CSS file

function ArchivedItems() {
  const [archivedItems, setArchivedItems] = useState([]);

  useEffect(() => {
    // Fetch all archived items
    axios.get('http://localhost:9000/api/items/archived')
      .then(response => setArchivedItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9000/api/items/archived/delete/${id}`)
      .then(() => {
        // Remove the deleted item from the state
        setArchivedItems(archivedItems.filter(item => item._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="archived-items-container">
      <header className="archived-items-header">
        <h1>Archived Items</h1>
      </header>
      <div className="archived-items-grid">
        {archivedItems.map(item => (
          <div key={item._id} className="archived-item-card">
            <h2 className="card-title">{item.name}</h2>
            <p className="card-description">{item.description || 'No description available'}</p>
            <p className="card-quantity">Quantity: {item.quantity}</p>
            <p className="card-price">Price: ${item.price.toFixed(2)}</p>
            <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchivedItems;
