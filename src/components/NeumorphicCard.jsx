import React from 'react';

const NeumorphicCard = ({ 
  children, 
  className = '', 
  onClick, 
  starCount = 8, 
  mode = 'study', // 'study' or 'wellness'
  ...props 
}) => {
  const generateStars = () => {
    return [...Array(starCount)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 1 + 0.5}px`,
          height: `${Math.random() * 1 + 0.5}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ));
  };

  return (
    <div
      className={`neumorphic-card-with-stars neumorphic-${mode} ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="neumorphic-card-stars">
        {generateStars()}
      </div>
      <div className="neumorphic-card-content relative z-10 h-full flex flex-col">
        <div className="flex-1 min-h-0 overflow-auto neumorphic-scrollbar-compact">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NeumorphicCard;
