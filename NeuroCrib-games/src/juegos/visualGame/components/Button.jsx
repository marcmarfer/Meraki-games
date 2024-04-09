import React, { forwardRef } from 'react'

const Button = forwardRef(({ onClick, index, disabled }, ref) => {
  const className = `w-full h-full shadow-sm rounded-sm duration-200 bg-gray-600 ${
    disabled ? '' : 'hover:scale-105 active:opacity-50'
  }`

  return (
    <button
      className={className}
      onClick={onClick}
      id={index}
      ref={ref}
      disabled={disabled}
    ></button>
  )
})

export default Button
