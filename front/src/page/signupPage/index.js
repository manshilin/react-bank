//front/src/page/signUpPage/index.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./index.css";
import HeaderTimeWifi from "../../component/headerTimeWifi";
import Button from "../../component/button";
import BackArrow from "../../component/arrow-back";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await signup(formData);
      if (user && token) {
        navigate("/signup-confirm");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Функція для Button, що імітує submit
  const handleSubmitClick = () => {
    document.querySelector("form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  return (
    <main>
      <HeaderTimeWifi color="black" />
      <BackArrow title="Sign up" layout="column"/>
      <p className="pdescribe">Select login method</p>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      </form>
      <Button text="Continue" type="primary" onClick={handleSubmitClick} />
    </main>
  );
};

export default SignupPage;
