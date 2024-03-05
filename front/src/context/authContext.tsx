// front/src/context/authContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { loadSession, saveSession } from './session';

export type User = {
  id: number;
  email: string;
  password: string;
  role: number;
  isConfirm: boolean;
  currentBalance: number;
};

export type State = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

export type Session = {
  user: User;
  token: string;
  currentBalance: number; 
};

export type Action = {
  type: string;
  user?: User | null;
  token?: string | null;
  loading?: boolean;
};

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  signup: (formData: { email: string; password: string }) => Promise<{ user: User | null; token: string | null }>;
  signin: (formData: { email: string; password: string }) => Promise<{ user: User | null; token: string | null }>;
}>({
  state: { user: null, token: null, loading: false },
  dispatch: () => {},
  signup: async () => ({ user: null, token: null }),
  signin: async () => ({ user: null, token: null }),
});

export const initialState: State = {
  user: null,
  token: null,
  loading: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.user || null, token: action.token || null, loading: false };
    case 'SIGN_OUT':
      return { ...state, user: null, token: null, loading: false };
    case 'LOADING':
      return { ...state, loading: true };
    default:
      throw new Error('Invalid action type');
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signup = async (formData: { email: string; password: string }): Promise<{ user: User | null; token: string | null }> => {
    dispatch({ type: 'LOADING', loading: true });
    try {
      console.log("Sending signup request with form data:", formData); // Log the form data being sent
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("Received response:", response); // Log the received response
      if (!response.ok) {
        throw new Error('Помилка реєстрації');
      }
      const data = await response.json();
      const user = data.session.user;
      const token = data.session.token;
      const currentBalance = data.currentBalance; // Get user balance from data
      console.log('currentBalance:', currentBalance); // Додано виведення в консоль
      if (user && token && currentBalance) {
        dispatch({ type: 'SIGN_IN', user: { ...user, email: formData.email, currentBalance }, token });
      }
      return { user, token };
    } catch (error) {
      console.error("Error during signup:", error);
      dispatch({ type: 'SIGN_IN', user: null, token: null });
      return { user: null, token: null };
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };
  
  
  // Signin function
  const signin = async (formData: { email: string; password: string }): Promise<{ user: User | null; token: string | null }> => {
    dispatch({ type: 'LOADING', loading: true });
    try {
      const response = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Помилка входу в систему');
      }
      const data = await response.json();
  const user = data.session.user;
  const token = data.session.token;
  const currentBalance = data.currentBalance; // Get user balance from data
  console.log('currentBalance:', currentBalance); // Додано виведення в консоль
  if (user && token && currentBalance) {
    dispatch({ type: 'SIGN_IN', user: { ...user, email: formData.email, currentBalance }, token });
  }
      return { user, token };
    } catch (error) {
      console.error("Error during signin:", error);
      dispatch({ type: 'SIGN_IN', user: null, token: null });
      return { user: null, token: null };
    } finally {
      dispatch({ type: 'LOADING', loading: false });
    }
  };
  // Load session on initial render
  useEffect(() => {
    const session = loadSession();
    if (session) {
      dispatch({ type: 'SIGN_IN', user: session.user, token: session.token });
    }
  }, []);

   useEffect(() => {
    if (state.user && state.token) {
      saveSession({ user: state.user, token: state.token, currentBalance: state.user.currentBalance });
    }
  }, [state]);
  return (
    <AuthContext.Provider value={{ state, dispatch, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}