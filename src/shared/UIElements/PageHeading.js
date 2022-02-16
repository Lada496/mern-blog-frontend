import React from "react";

const PageHeading = ({ children }) => {
  return (
    <h1 className="mb-2 text-2xl font-bold capitalize text-gray-800 dark:text-gray-100 capitalize">
      {children}
    </h1>
  );
};

export default PageHeading;
