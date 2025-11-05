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
      className={`${buttonClass} ${className} !px-3 !py-2 md:!px-6 md:!py-3 !text-xs md:!text-sm`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeumorphicButton;
