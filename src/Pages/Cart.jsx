import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, calculateTotal } = useContext(CartContext);
  const navigate = useNavigate(); // Permet de rediriger l'utilisateur

  // Vérifie si l'utilisateur est connecté
  const handleFinalizeOrder = () => {
    const token = localStorage.getItem('authToken'); // Vérifie la présence du token
    if (token) {
      alert('Order finalized! Thank you for your purchase!');
    } else {
      alert('Please log in to finalize your order.');
      navigate('/login'); // Redirige vers la page de connexion
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Your cart is empty.</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  min="1"
                />
              </td>
              <td>{item.price} $</td>
              <td>{(item.price * item.quantity).toFixed(2)} $</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: {calculateTotal()} $</h3>
      <Button variant="success" onClick={handleFinalizeOrder}>
        Finalize Order
      </Button>
    </Container>
  );
}
