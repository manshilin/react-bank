// front/src/page/wellcomePage/index.js
import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../component/button';
import './index.css';

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
    <Fragment>

      <div className='backgroundFirst'>
        <img src="./img/money.png" alt="pic" />
       
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
        
        

        {/* Button-link to Login Page */}
    </Fragment>
  );
};

export default WellcomePage;
