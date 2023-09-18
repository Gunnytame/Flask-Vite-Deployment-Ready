import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';

function Cart() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemName, setItemName] = useState('');

    const addItem = () => {
        if (itemName.trim() !== '') {
            setSelectedItems([...selectedItems, itemName]);
            setItemName('');
        }
    };

    const removeItem = (index) => {
        const updatedItems = [...selectedItems];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>
                            {item}{' '}
                            <button onClick={() => removeItem(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Add Items to Cart:</h3>
                <input
                    type="search"
                    placeholder="Search Catalog"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <button onClick={addItem}>Add to Cart</button>
            </div>
            <NavLink to="/">Go back to Home</NavLink>
        </div>
    );
}

export default Cart;
