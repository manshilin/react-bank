// front/src/page/recoveryPage/index.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./index.css";

function RecoveryPage() {
    //const { recoverAccount } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
  
    const handleRecover = async () => {

      console.log("Дані для відправлення:", JSON.stringify(email));
      const response = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      if (response.ok) {
      const data = await response.json();
      console.log("Відповідь від сервера:", data);
      // Припущено, що API повертає дані про автентифікацію (наприклад, токен)
      // setAuthData(data);
      // navigate('/signup-confirm');

      } else {
        // Обробка помилки реєстрації
        console.error("Реєстрація не вдалася");
      }

    };
  
    return (
      <div className='page'>
        <h1>Recover password</h1>
        <p>Choose a recovery method</p>
        <form>
        {/* Form fields go here */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) =>
            setEmail(
             e.target.value,
            )
          }
        />
        </form>
        
        <button onClick={handleRecover}>Send code</button>
      </div>
    );
  }
  
  // ... інший код ...
  
  export default RecoveryPage;
  