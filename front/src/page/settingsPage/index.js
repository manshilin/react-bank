import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import HeaderTimeWifi from '../../component/headerTimeWifi';
import BackArrow from '../../component/arrow-back';
import Button from '../../component/button';
import './index.css';

function SettingsPage() {
  const { state, updateUser } = useAuth();

  // Оновлення станів
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Змінено назву стану для поточного пароля

  const user = state.user;

  const handleChangePassword = async () => {
    if (!user) {
      console.error('User is not defined');
      alert('User is not defined');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sessionAuth')}`
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword: currentPassword, // Використання оновленого стану
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Password update failed');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser); // Оновлення контексту користувача
      alert('Password updated successfully');
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('Failed to update password');
    }
  };

  const handleChangeEmail = async () => {
    if (!user) {
      console.error('User is not defined');
      alert('User is not defined');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sessionAuth')}`
        },
        body: JSON.stringify({
          email: user.email,
          newEmail: newEmail,
          password: currentPassword, // Передача поточного пароля
        }),
      });

      if (!response.ok) {
        throw new Error('Email update failed');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser); // Оновлення email у контексті користувача
      alert('Email updated successfully');
    } catch (error) {
      console.error('Failed to update email:', error);
      alert('Failed to update email');
    }
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
      <HeaderTimeWifi color="black" />
      <div className="headerSetting">
        <BackArrow />
        <h1>Settings</h1>
      </div>

      <div className='blockEmail'>
        <h2>Change Email</h2>
        <label>New Email</label>
        <input type="email" onChange={(e) => setNewEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setCurrentPassword(e.target.value)} />
        <Button type="transparent" text="Save Email" onClick={handleChangeEmail} />
        <div className='divider'></div>
      </div>

      <div className='blockPassword'>
        <h2>Change Password</h2>
        <label>Old Password</label>
        <input type="password" placeholder="Old Password" onChange={(e) => setCurrentPassword(e.target.value)} />
        <label>New Password</label>
        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
        <Button type="transparent" text="Save Password" onClick={handleChangePassword} />
      </div>

      <div className='logOut'>
        <h2>Logout</h2>
        <Button type="red" text="Logout" onClick={handleLogout} />
      </div>
    </main>
  );
}

export default SettingsPage;
