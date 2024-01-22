import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import './index.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const navigate = useNavigate;
  // const { setAuthData } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      // Make an API request for user registration using formData
      const response = await fetch("http://localhost:4000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns authentication data (e.g., token)
      //   setAuthData(data);
      //  navigate('/signup-confirm');
       console.log(data)
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <main>
      {/* Your registration form */}
      <h1 className='h1title'>Sign Up</h1>
      <p className='pdescribe'>Select login method</p>

      <form>
        {/* Form fields go here */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) =>
            setFormData({  email: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setFormData({  password: e.target.value })
          }
        />
        
      </form>
      <button type="button" onClick={handleSignup}>
           Continue
        </button>
    </main>
  );
};

export default SignupPage;
