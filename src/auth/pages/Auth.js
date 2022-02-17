import { useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserContext } from "../../shared/context/user-context";
import Message from "../../shared/UIElements/Message";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userContext, setUserContext] = useContext(UserContext);
  const location = useLocation();
  let from = location.state?.from?.pathname || "/mypage";
  if (userContext.isLoading || userContext.init) {
    return <Message text="Loading..." />;
  }

  if (userContext.token) {
    return <Navigate to={from} />;
  }
  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default Auth;
