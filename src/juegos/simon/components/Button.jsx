import React, { forwardRef } from 'react';

const Button = forwardRef(({ onClick, index }, ref) => {
  return (
    <button
      className="w-full h-full shadow-sm rounded-sm duration-200 bg-gray-600 hover:scale-105 active:opacity-50 active:mt-2"
      onClick={onClick}
      id={index}
      ref={ref}
    ></button>
  );
});

export default Button;