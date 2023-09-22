import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {useState} from "react"
const UpdateEmail = ({currentUser}) => {
    const [email, setEmail] = useState("")
    console.log(currentUser)
    function handleSubmit(e){
        fetch("/api/UpdateEmail", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email})
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Update Email</button>
    </form>
  );
};


export default UpdateEmail;
