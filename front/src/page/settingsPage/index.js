// front/src/page/settingsPage/index.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import axios from 'axios'; 
import HeaderTimeWifi from '../../component/headerTimeWifi';
import BackArrow from '../../component/arrow-back';

function SettingsPage() {
  // Retrieve authentication context and update function
  const { user, updateUser } = useContext(AuthContext);

  // State for password and email changes
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Function to handle password change
  const handleChangePassword = () => {
    // Perform password change logic (replace with your implementation)
    // ...

    // Update authentication context
    updateUser({ ...user, password: newPassword });
  };

  // Function to handle email change
  const handleChangeEmail = () => {
    // Perform email change logic (replace with your implementation)
    // ...

    // Update authentication context
    updateUser({ ...user, email: newEmail });
  };

  // Function to handle logout
  // Function to handle logout
const handleLogout = async () => {
  try {
    // Get the session token from localStorage
    const session = JSON.parse(localStorage.getItem('sessionAuth'));

    // Send HTTP request to logout route
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.token}` // Include the session token in the request headers
      }
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    // Clear authentication context upon successful logout
    updateUser(null);
    localStorage.clear();
    localStorage.removeItem('sessionAuth');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <div>
      <HeaderTimeWifi color="black"/>
      <BackArrow />
      <h1>Settings</h1>
      <div>
        <h2>Change Password</h2>
        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div>
        <h2>Change Email</h2>
        <input type="email" placeholder="New Email" onChange={(e) => setNewEmail(e.target.value)} />
        <button onClick={handleChangeEmail}>Change Email</button>
      </div>
      <div>
        <h2>Logout</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default SettingsPage;
