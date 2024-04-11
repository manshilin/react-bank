// front/src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./normalize.css";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";

const container = document.getElementById('root')!; // Use the non-null assertion operator (!)
const root = createRoot(container); // Now TypeScript knows container is not null

root.render(
  <div className='app-container'>
    
      <AuthProvider>
      <App />
    </AuthProvider>

  
     
  </div>
   
);
