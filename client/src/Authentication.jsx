// import React from 'react';
// import axios from 'axios';

// const API_URL = '/auth';

// class AuthService extends React.Component {
//     login(email, password) {
//         return axios
//             .post(`${API_URL}/login`, { email, password })
//             .then((response) => {
//                 if (response.data.token) {
//                     localStorage.setItem('user', JSON.stringify(response.data));
//                 }
//                 return response.data;
//             });
//     }

//     logout() {
//         localStorage.removeItem('user');
//     }

//     getCurrentUser() {
//         return JSON.parse(localStorage.getItem('user'));
//     }

//     register(email, password) {
//         return axios
//             .post(`${API_URL}/register`, { email, password })
//             .then((response) => {
//                 return response.data;
//             });
//     }

//     render() {
//         return null;
//     }
// }

// export default AuthService;
