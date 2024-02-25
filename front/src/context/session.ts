// front/src/context/session.ts
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
};
interface Session {
  token: string;
  user: User;
}
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
    console.log(er);
    window.session = null;
    return null;
  }
};
export const getTokenSession = (): string | null => {
  try {
    const session: Session | null = getSession();
    return session ? session.token : null;
  } catch (er) {
    console.log(er);
    return null;
  }
};
export const getSession = (): Session | null => {
  try {
    const session: Session | null = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') || window.session;
    return session || null;
  } catch (er) {
    console.log(er);
    return null;
  }
};
