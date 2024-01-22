// WelcomePage.jsx
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../component/button';
import './index.css';

const WellcomePage = () => {
  return (
    <Fragment>

      <div className='backgroundFirst'>
        <img src="./img/money.png" alt="pic" />
       
      </div>

      <div>
        {/* Button-link to Signup Page */}
        <Link to="/signup">
          <Button text="Sign Up" className="button" />
        </Link>
      </div>
      <div>
        {/* Button-link to Signin Page */}
        <Link to="/signin">
          <Button text="Sign In" className="button" />
        </Link>
      </div>
    </Fragment>
  );
};

export default WellcomePage;
