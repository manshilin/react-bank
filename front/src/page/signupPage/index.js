import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./index.css"; 

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, token } = await signup(formData);
    if (user && token) {
      navigate("/signup-confirm"); // перенаправити на сторінку підтвердження після реєстрації
    }
  };

  return (
    <main>
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
        <button type="submit">
          Continue
        </button>
      </form>
    </main>
  );
};

export default SignupPage;
