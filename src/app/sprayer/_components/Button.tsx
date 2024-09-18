import React from 'react';

interface ButtonProps {
  onClick: () => void;  
  className?: string;   
  text: string;         
}

const Button: React.FC<ButtonProps> = ({ onClick, className, text }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;