import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
    
    const [users, setUsers] = useState([]);

    
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        {}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            {}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
    const handleLogout = async () => {
        try {
            await axios.get('/auth/logout');
            // Handle successful logout (e.g., redirect to login page)
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error (e.g., show error message)
        }
    };

  



export default User;
