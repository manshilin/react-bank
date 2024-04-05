// front/src/page/settingsPage/index.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import HeaderTimeWifi from '../../component/headerTimeWifi';
import BackArrow from '../../component/arrow-back';
import './index.css';
import Button from '../../component/button';


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
    <main>
      <HeaderTimeWifi color="black"/>
      <div className="headerSetting">
      <BackArrow />
        <h1>Settings</h1>
      </div>

      <div className='blockEmail'>
        <h2>Change Email</h2>
        <label>New Email</label>
        <input type="email"   />
        <label>Password</label>
        <input type="password"  onChange={(e) => setNewEmail(e.target.value)} />
        <Button type="transparent" text="Save Email" onClick={handleChangeEmail}/>
        <div className='divider'></div>
      </div>
      
      <div className='blockPassword'>
        <h2>Change Password</h2>
        <label>New Password</label>
        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
        <label> Old Password</label>
        <input type="password" placeholder="Old Password" onChange={(e) => setNewPassword(e.target.value)} />
        <Button type="transparent" text="Save Password" onClick={handleChangePassword}/>
      <div className='divider'></div>
      </div>
      
      <div className='logOut'>
        <h2>Logout</h2>
        <Button type="red" text="Logout" onClick={handleLogout} />
      </div>
    
    </main>
  );
}

export default SettingsPage;
