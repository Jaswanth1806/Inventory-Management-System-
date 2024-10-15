import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditItem.css'; // Import the CSS file

function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/api/items/get/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:9000/api/items/edit/${id}`, item)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  const handleArchive = () => {
    axios.post(`http://localhost:9000/api/items/archive/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:9000/api/items/delete/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div className="edit-item-container">
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit} className="edit-item-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            id="name"
            type="text" 
            name="name" 
            value={item.name} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input 
            id="description"
            type="text" 
            name="description" 
            value={item.description} 
            onChange={handleChange} 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input 
            id="quantity"
            type="number" 
            name="quantity" 
            value={item.quantity} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input 
            id="price"
            type="number" 
            name="price" 
            value={item.price} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Update Item</button>
          <button type="button" onClick={handleArchive} className="archive-button">Archive Item</button>
          <button type="button" onClick={handleDelete} className="delete-button">Delete Item</button>
        </div>
      </form>
    </div>
  );
}

export default EditItem;
