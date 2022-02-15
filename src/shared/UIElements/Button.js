import React from "react";

const Button = ({
  children,
  type = "submit",
  isWidthFull,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${isWidthFull && "w-full"} ${
        disabled && "cursor-not-allowed"
      } text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-blue-800`}
    >
      {children}
    </button>
  );
};

export default Button;
