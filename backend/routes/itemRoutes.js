const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Item = require('../models/Item');
const ArchivedItem = require('../models/ArchivedItem');

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single item by ID
// Add item
router.post('/add', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit item
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Archive item
router.post('/archive/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const archivedItem = new ArchivedItem({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    });
    await archivedItem.save();

    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item archived successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete archived item
router.delete('/archived/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid archived item ID' });
  }

  try {
    const result = await ArchivedItem.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Archived item not found' });

    res.json({ message: 'Archived item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all archived items
router.get('/archived', async (req, res) => {
  try {
   const archivedItems = await ArchivedItem.find({});
   res.json(archivedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
