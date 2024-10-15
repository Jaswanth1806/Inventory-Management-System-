import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddItem.css'; // Import the CSS file

function AddItem() {
  const [item, setItem] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/items/add', item)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="add-item-container">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            onChange={handleChange} 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input 
            type="number" 
            name="quantity" 
            placeholder="Quantity" 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input 
            type="number" 
            name="price" 
            placeholder="Price" 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Add Item</button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
