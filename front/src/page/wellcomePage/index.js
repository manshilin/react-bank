// front/src/page/wellcomePage/index.js
import React, { useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../component/button';
import './index.css';
import HeaderTimeWifi from '../../component/headerTimeWifi';

const WellcomePage = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
 

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  }


  return (
    <main>

      <div className='backgroundFirst'>
      <HeaderTimeWifi color="white" />
        <h1 className='title'>Hello!</h1>
        <p className='text'>Welcome to bank app</p>
        <div className='money'>
          </div>
       
      </div>

      
        {/* Button-link to Signup Page */}
        
          <div>
            <Link to="/signup">
          <Button text="Sign Up" className="button" />
        </Link>
      </div>
      
          <div>
            <Link to="/signin">
          <Button text="Sign In" className="button" />
        </Link>
      </div>
    </main>
  );
};

export default WellcomePage;