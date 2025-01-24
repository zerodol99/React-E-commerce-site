import React, { createContext, useState } from 'react';

// Création du contexte
export const CartContext = createContext();

// Composant fournisseur du contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Si le produit est déjà dans le panier, augmente la quantité
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Sinon, ajoute un nouveau produit avec une quantité initiale de 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Supprimer un produit du panier
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculer le total du panier
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
