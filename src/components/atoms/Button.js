import React from 'react';

const Button = ({ children, className, onClick }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;