import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.get('http://localhost:3000/api/sales', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSales(response.data);
    };

    fetchSales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/sales', { product, quantity, total }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProduct('');
      setQuantity('');
      setTotal('');
      const response = await axios.get('http://localhost:3000/api/sales', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSales(response.data);
    } catch (error) {
      console.error('Sales recording failed', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Sales</Typography>
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
        <TextField
          label="Total"
          fullWidth
          margin="normal"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Record Sale</Button>
      </form>
      <List>
        {sales.map(sale => (
          <ListItem key={sale._id}>
            <ListItemText primary={`${sale.product.name} - ${sale.quantity} - $${sale.total}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Sales;
