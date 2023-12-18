// WelcomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Online Banking Platform</h1>
      <p>Explore the features and manage your finances with ease.</p>
      <div>
        {/* Button-link to Signup Page */}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        
        {/* Button-link to Signin Page */}
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
