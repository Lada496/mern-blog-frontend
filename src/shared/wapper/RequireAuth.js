import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import Message from "../UIElements/Message";

const RequireAuth = ({ children }) => {
  const [userContext] = useContext(UserContext);

  const location = useLocation();

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
