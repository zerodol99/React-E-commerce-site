import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Card className="mb-4" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.price} $</Card.Text>
        <Button as={Link} to={`/product/${product.id}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

