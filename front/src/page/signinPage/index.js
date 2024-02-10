import React from 'react';
import { useNavigate } from 'react-router-dom'; // Додайте це
import { AuthContext } from '../../context/authContext';
import './index.css';

function SigninPage() {
    const { user } = React.useContext(AuthContext);
    const navigate = useNavigate(); // Додайте це

    React.useEffect(() => {
      if (user && !user.confirm) {
        navigate('/signup-confirm');
      }
    }, [user, navigate]); // Додайте navigate в залежності useEffect


  return (
    <main>
      <h1 className="h1title">Sign in</h1>
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
};
export default SigninPage;
