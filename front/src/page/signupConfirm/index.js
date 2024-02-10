import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/authContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    // Initialize form data fields (e.g., username, password)
  });

  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      // Make an API request for user registration using formData
      const response = await fetch('your_registration_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns authentication data (e.g., token)
        setAuthData(data);
        navigate('/signup-confirm');
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      {/* Your registration form */}
      <form>
        {/* Form fields go here */}
        <button type="button" onClick={handleSignup}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

