import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { AuthContext } from "../../context/authContext";

import "./index.css"; 

const SignupPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignup = async () => {
    const { user, token } = await signup(formData);
    if (user && token) {
      navigate("/signup-confirm");
    }
  }

  useEffect(() => {
    if (user && user.isConfirm) {
      navigate("/signup-confirm");
    }
  }
  , [user, navigate]);

  return (
    <main>
      <h1 className="h1title">Sign Up</h1>
      <p className="pdescribe">Select login method</p>
      <form>
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
        <label htmlFor="password">Password</label> {/* Додано поле для пароля */}
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
      </form>
      <button type="button" onClick={handleSignup}>
        Continue
      </button>
    </main>
  );
}

export default SignupPage;

