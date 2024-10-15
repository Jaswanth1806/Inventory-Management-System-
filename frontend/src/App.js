import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inventory from './components/Inventory';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import ArchivedItems from './components/ArchivedItem'; // Correct the import if needed
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Inventory</Link></li>
            <li className="nav-item"><Link to="/add" className="nav-link">Add Item</Link></li>
            <li className="nav-item"><Link to="/archived" className="nav-link">Archived Items</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
            <Route path="/archived" element={<ArchivedItems />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
