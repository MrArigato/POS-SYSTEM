import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await axios.get('http://localhost:3000/api/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setInventory(response.data);
    };

    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/inventory', { product, quantity }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProduct('');
      setQuantity('');
      const response = await axios.get('http://localhost:3000/api/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Inventory update failed', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Inventory</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product"
          fullWidth
          margin="normal"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <TextField
          label="Quantity"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Add to Inventory</Button>
      </form>
      <List>
        {inventory.map(item => (
          <ListItem key={item._id}>
            <ListItemText primary={`${item.product.name} - ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Inventory;
