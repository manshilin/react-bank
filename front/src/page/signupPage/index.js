//front/src/page/signUpPage/index.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./index.css";
import HeaderTimeWifi from "../../component/headerTimeWifi";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Log form data to check values before signup
    try {
      const { user, token } = await signup(formData);
      console.log("Signup response:", { user, token }); // Log signup response
      if (user && token) {
        navigate("/signup-confirm"); // Redirect to confirmation page after successful registration
      }
    } catch (error) {
      console.error("Signup error:", error); // Log any signup errors
    }
  };

  return (
    <main>
      
        <HeaderTimeWifi color="black" />
      
      
      <h1 className="h1title">Sign Up</h1>
      <p className="pdescribe">Select login method</p>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <button type="submit">Continue</button>
      </form>
    </main>
  );
};

export default SignupPage;
