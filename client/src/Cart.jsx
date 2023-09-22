import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [itemAddedMessage, setItemAddedMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = async (itemId) => {
    try {
      const response = await axios.post('http://localhost:5555/api/add_to_cart', {
        item_id: itemId,
      });
      setItemAddedMessage(response.data.message);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setItemAddedMessage('An error occurred while adding the item to the cart.');
    }
  };

  return (
    <div>
      
      <h2>Cart</h2>
      <select onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div>
          <h3>Selected Category: {categories.find((c) => c.id === selectedCategory)?.name}</h3>

          {/* Displays item per category */}
          <ul>
            {categories
              .find((c) => c.id === selectedCategory)
              ?.items.map((item) => (
                <li key={item.id}>
                  {item.product_name} - ${item.price}
                  <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
                </li>
              ))}
          </ul>
          
        </div>
      )}

      <h3>Cart Items:</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.product_name} - ${item.price}
          </li>
          
        ))}
      </ul>

      {itemAddedMessage && <div>{itemAddedMessage}</div>}
      
    </div>
  );
};

export default Cart;
