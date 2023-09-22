import React, { useState, useEffect,useHistory } from 'react';
import axios from 'axios';
import Login from './Login';
function Sales() {
    const [sales, setSales] = useState([]);
    const history = useHistory();

    const fetchSales = async () => {
        try {
            const response = await axios.get('/sales');
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const navigateToHome = () => {
        history.push('./Home');
    };

    return (
        <div>
            <h2>Sales List</h2>
            <button onClick={navigateToHome}>Navigate to Some Route</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.product_name}</td>
                            <td>${sale.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;

