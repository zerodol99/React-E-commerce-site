import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import api from '../api';
import { CartContext } from '../context/CartContext'; // Importation du contexte

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Récupère la fonction addToCart

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <Card className="mt-4">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Price:</strong> {product.price} $</Card.Text>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Ajouter au panier
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

