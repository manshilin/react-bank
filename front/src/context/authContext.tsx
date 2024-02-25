// front/src/context/authContext.tsx
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
  loading: boolean;
  
};
export type Action = {
  type: string;
  user?: User | null;
  token?: string | null;
  loading?: boolean;
};
// 1. Створення контексту для автентифікації, що містить стан, диспетчера та функцію реєстрації
export const AuthContext = createContext<{
  state: { user: User | null; token: string | null }; // Стан автентифікації
  dispatch: React.Dispatch<Action>; // Диспетчер для виконання дій над станом
  signup: (formData: { email: string; password: string }) => Promise<{ user: User | null; token: string | null }>; // Функція реєстрації користувача
  signin: (formData: { email: string; password: string }) => Promise<{ user: User | null; token: string | null }>; // Додайте цей рядок
}>({
  state: { user: null, token: null }, // Початковий стан
  dispatch: () => {}, // Пустий диспетчер
  signup: async () => ({ user: null, token: null }), // Пуста функція реєстрації
  signin: async () => ({ user: null, token: null }), // Пуста функція фходу
});
// 2. Початковий стан автентифікації
export const initialState: State = {
  user: null, // Початковий користувач
  token: null, // Початковий токен
  loading: false, // Додайте цей рядок
};
// 3. Редуктор для зміни стану автентифікації
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.user || null, token: action.token || null, loading: false }; // Залогінити користувача
    case 'SIGN_OUT':
      return { ...state, user: null, token: null, loading: false }; // Вийти з облікового запису
    case 'LOADING':
      return { ...state, loading: true }; // Додайте цей рядок
    default:
      throw new Error('Invalid action type'); // Неправильний тип дії
  }
}
// 4. Компонент, що надає стан та функції автентифікації через контекст
export function AuthProvider({ children }: { children: React.ReactNode }) {
   // Використання редуктора для керування станом автентифікації
  const [state, dispatch] = useReducer(reducer, initialState); 
  // Функція реєстрації нового користувача
  const signup = async (formData: { email: string; password: string }): Promise<{ user: User | null; token: string | null }> => {
    dispatch({ type: 'LOADING', loading: true }); // Встановити loading в true перед початком запиту
    try {
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
      // Отримання даних з відповіді сервера
      const data = await response.json();
      // Витягнення користувача та токена з даних
      const user = data.session.user;
      const token = data.session.token;
      // Залогінити користувача, якщо він та токен були отримані
      if (user && token) {
        dispatch({ type: 'SIGN_IN', user: { ...user, email: formData.email }, token });
      }
      // Повернення користувача та токена
      return { user, token };
    } catch (error) {
      console.error("Error during signup:", error);
      dispatch({ type: 'SIGN_IN', user: null, token: null }); 
      return { user: null, token: null };
    } finally {
      dispatch({ type: 'LOADING', loading: false }); // Встановити loading в false після отримання відповіді
    }
  };
  // Функція входу в систему
  const signin = async (formData: { email: string; password: string }): Promise<{ user: User | null; token: string | null }> => {
    dispatch({ type: 'LOADING', loading: true }); // Встановити loading в true перед початком запиту
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
      // Отримання даних з відповіді сервера
      const data = await response.json();
      console.log(data);
      // Витягнення користувача та токена з даних
      const user = data.session.user;
      const token = data.session.token;
      
      // Залогінити користувача, якщо він та токен були отримані
      if (user && token) {
        dispatch({ type: 'SIGN_IN', user: { ...user, email: formData.email }, token });
      }
      // Повернення користувача та токена
      return { user, token };
    } catch (error) {
      console.error("Error during signin:", error);
      dispatch({ type: 'SIGN_IN', user: null, token: null }); 
      return { user: null, token: null };
    } finally {
      dispatch({ type: 'LOADING', loading: false }); // Встановити loading в false після отримання відповіді
    }
  };
  // Ефект, що завантажує збережену сесію користувача під час монтажу компонента
useEffect(() => {
  // Завантаження сесії користувача
  const session = loadSession();
  if (session) {
    console.log('sessionToken',session.token); // Додайте цей рядок
    // Якщо сесія існує, то залогінити користувача
    dispatch({ type: 'SIGN_IN', user: session.user, token: session.token });
  } 
}, []);
// Ефект, що зберігає нову сесію користувача
  useEffect(() => {
    // Збереження сесії користувача
    if (state.user && state.token) {
      // Збереження сесії користувача
      saveSession({ user: state.user, token: state.token });
    }
  }, [state]);
  // Повернення компоненту з вбудованим контекстом автентифікації
  return (
    // Передача стану, диспетчера та функції реєстрації через контекст
    <AuthContext.Provider value={{ state, dispatch, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
// 5. Хук для спрощеного доступу до контексту автентифікації
export function useAuth() {
  // Повернення контексту автентифікації
  return useContext(AuthContext);
}
