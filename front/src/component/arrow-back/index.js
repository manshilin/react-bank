import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const BackArrow = () => {
  const navigate = useNavigate();

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)}>
      <path d="M10 6L5 12L10 18" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

export default BackArrow;
