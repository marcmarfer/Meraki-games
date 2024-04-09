/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from 'react'

const Button = forwardRef(
  ({ children, onClick, index, disabled, selectedOne }, ref) => {
    const className = `w-full h-full shadow-sm rounded-sm duration-200 font-bold text-4xl grid place-content-center ${
      disabled
        ? ''
        : selectedOne
        ? 'bg-white text-transparent'
        : 'hover:scale-105 active:opacity-50 active:mt-2 bg-white'
    }`

    return (
      <button
        className={className}
        onClick={onClick}
        id={index}
        ref={ref}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
)

export default Button
