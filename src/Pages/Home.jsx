import React, { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../api';

export default function Home() {
  const [products, setProducts] = useState([]); // Tous les produits
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [searchTerm, setSearchTerm] = useState(''); // Recherche par nom
  const [categoryFilter, setCategoryFilter] = useState(''); // Filtre par catégorie
  const [priceRange, setPriceRange] = useState({ min: '', max: '' }); // Filtre par prix

  // Récupérer les produits et les catégories depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Par défaut, tous les produits sont affichés
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories'); // Récupère les catégories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Fonction de filtrage
  const handleFilter = () => {
    let filtered = products;

    // Filtrer par nom
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par catégorie
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Filtrer par prix
    if (priceRange.min) {
      filtered = filtered.filter((product) => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((product) => product.price <= parseFloat(priceRange.max));
    }

    setFilteredProducts(filtered); // Met à jour les produits affichés
  };

  // Réinitialiser les filtres
  const handleReset = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setPriceRange({ min: '', max: '' });
    setFilteredProducts(products);
  };

  return (
    <Container>
      <h1 className="my-4">Products</h1>

      {/* Formulaire de filtres */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="search">
              <Form.Label>Search by Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="category">
              <Form.Label>Filter by Category</Form.Label>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Price</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={handleFilter}>
              Apply Filters
            </Button>{' '}
            <Button variant="secondary" onClick={handleReset}>
              Reset Filters
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Liste des produits */}
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

