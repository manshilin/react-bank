// Import React and necessary components/modules
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../auth/authContext";

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
  const handleLogout = () => {
    // Perform logout logic (replace with your implementation)
    // ...

    // Clear authentication context
    updateUser(null);
  };

  return (
    <div>
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
