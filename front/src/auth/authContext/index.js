// src/auth/AuthContext/index.js
import React from 'react';
 
export const AuthContext = React.createContext({
  user: null, // дані про поточного користувача
  signUp: async (username, password) => {
    // функція для реєстрації нового користувача
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    
  },
  signIn: async (username, password) => {
    // функція для входу користувача
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  signOut: async () => {
    // функція для виходу користувача 
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
});

