// Додаємо властивість session до глобального об'єкта Window
declare global {
  interface Window {
    session: Session | null;
  }
}

export const SESSION_KEY = 'sessionAuth';

type User = {
  id: number;
  email: string;
  password: string;
  role: number;
  isConfirm: boolean;
  currentBalance: number; 
};

interface Session {
  token: string;
  user: User;
  currentBalance: number; // Додано currentBalance
}

// Оновлений виклик функції saveSession
export const saveSession = (session: Session): void => {
  try {
    console.log("Saving session:", session); 
    window.session = session;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    console.log("Session saved:", window.session); 
  } catch (er) {
    console.log("Error saving session:", er); 
    window.session = null;
  }
};

// Оновлений виклик функції loadSession
export const loadSession = (): Session | null => {
  try {
    const session: Session | null = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (session) {
      window.session = session;
    } else {
      window.session = null;
    }
    return window.session;
  } catch (er) {
    console.log("Error loading session:", er);
    window.session = null;
    return null;
  }
};

// Оновлений виклик функції getSession
export const getSession = (): Session | null => {
  try {
    const session: Session | null = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') || window.session;
    return session || null;
  } catch (er) {
    console.log("Error getting session:", er);
    return null;
  }
};

// Оновлений виклик функції getTokenSession
export const getTokenSession = (): string | null => {
  try {
    const session: Session | null = getSession();
    return session ? session.token : null;
  } catch (er) {
    console.log("Error getting token session:", er);
    return null;
  }
};
