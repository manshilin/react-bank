import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { loadSession, saveSession } from './session';
export type User = {
  id: number;
  email: string;
  password: string;
  role: number;
  isConfirm: boolean;
};
export type State = {
  user: User | null;
  token: string | null;
};
export type Action = {
  type: string;
  user?: User;
  token?: string;
};
export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  signup: (formData: { email: string; password: string }) => Promise<{ user: User | null; token: string | null }>;
}>({
  state: { user: null, token: null },
  dispatch: () => {}, // змінено на функцію, яка не повертає нічого
  signup: async () => ({ user: null, token: null }),
});
export const initialState: State = {
  user: null,
  token: null,
};
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.user || null, token: action.token || null };
    case 'SIGN_OUT':
      return { ...state, user: null, token: null };
    default:
      throw new Error('Invalid action type');
  }
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const signup = async (formData: { email: string; password: string }) => {
    try {
      // Виконайте запит до сервера тут
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Помилка реєстрації');
      }
  
      const data = await response.json();
  
      const user = data.user;
      const token = data.token;
  
      if (user && token) {
        dispatch({ type: 'SIGN_IN', user, token });
      }
  
      return { user, token };
    } catch (error) {
      console.error("Error during signup:", error);
      // Поверніть об'єкт з null значеннями, якщо виникає помилка
      return { user: null, token: null };
    }
  };
  
  useEffect(() => {
    const session = loadSession();
    if (session) {
      dispatch({ type: 'SIGN_IN', user: session.user, token: session.token });
    }
  }, []);
  useEffect(() => {
    if (state.user && state.token) {
      saveSession({ user: state.user, token: state.token });
    }
  }, [state]);
  return (
    <AuthContext.Provider value={{ state, dispatch, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
