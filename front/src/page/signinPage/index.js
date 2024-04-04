// front/src/page/signinPage/index.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import HeaderTimeWifi from '../../component/headerTimeWifi';
import Button from '../../component/button';

function SigninPage() {
    const { user, token, signin } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user && !user.confirm) {
        navigate('/signup-confirm');
      }
    }, [user, navigate]);
  
    useEffect(() => {
      if (token) {
        navigate('/balance');
      }
    }, [token, navigate]);
  
    const handleSignin = async () => {
      const { user, token } = await signin(formData);
      if (user && token) {
        // Чекаємо, поки стан оновиться
        await new Promise(resolve => setTimeout(resolve, 0));
        navigate('/balance');
      } else {
        console.error('Error signing in');
      }
    };
    
    
  
    return (
        <main>
          <HeaderTimeWifi color="black"/>
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
            </form>
            <Button text="Continue" type="primary" onClick={handleSignin} />
        </main>
    );
}

export default SigninPage;

