import React from 'react';

const NeumorphicButton = ({ 
  children, 
  onClick, 
  isSelected = false,
  className = '',
  disabled = false,
  ...props 
}) => {
  const buttonClass = isSelected ? 'neumorphic-button-selected' : 'neumorphic-button';
  
  return (
    <button
      className={`${buttonClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeumorphicButton;
