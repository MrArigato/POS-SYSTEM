import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Products</Typography>
      <List>
        {products.map(product => (
          <ListItem key={product._id}>
            <ListItemText primary={`${product.name} - $${product.price}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Products;
