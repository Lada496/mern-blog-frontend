import { useContext, useCallback, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import Message from "../UIElements/Message";
// import { useMyData } from "../hooks/use-mydata";

const RequireAuth = ({ children }) => {
  const [userContext] = useContext(UserContext);

  const location = useLocation();

  useEffect(() => {
    console.log(userContext);
  }, [userContext]);
  // if (userContext.init || userContext.isLoading) {
  //   <Message text="Loading..." />;
  // }

  if (
    userContext.token === null &&
    !userContext.isLoading &&
    !userContext.init
  ) {
    return <Navigate to="/authenticate" state={{ from: location }} />;
  }
  if (userContext.token) {
    return children;
  }
  return (
    <div className="mx-10 my-5">
      <Message text="Loading..." />
    </div>
  );
};

export default RequireAuth;
