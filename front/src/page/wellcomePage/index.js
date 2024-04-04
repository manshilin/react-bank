// front/src/page/wellcomePage/index.js
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../component/button";
import "./index.css";
import HeaderTimeWifi from "../../component/headerTimeWifi";

const WellcomePage = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <main>
      <div className="headerContiner">
        
        <div className="backgroundFirst">
          <HeaderTimeWifi color="white" />
          <h1 className="title">Hello!</h1>
          <p className="text">Welcome to bank app</p>
          <div className="money"></div>
        </div>

        <div className="buttonLink">
          <Link to="/signup">
            <Button text="Sign Up" type="transparent" />
          </Link>

          <Link to="/signin">
            <Button text="Sign In" type="transparent" />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default WellcomePage;
