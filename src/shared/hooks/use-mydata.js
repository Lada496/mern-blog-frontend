import { useEffect, useCallback, useContext } from "react";
import { UserContext } from "../context/user-context";

export const useMyData = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const fetchUserDetails = useCallback(() => {
    setUserContext((prev) => ({ ...prev, isLoading: true }));
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((prev) => ({ ...prev, isLoading: false }));
      if (response.ok) {
        const data = await response.json();
        setUserContext((prev) => ({ ...prev, details: data }));
      } else {
        if (response.status === 401) {
          window.location.reload();
        } else {
          setUserContext((prev) => ({ ...prev, details: null }));
        }
      }
    });
  }, [setUserContext, userContext.token]);
  useEffect(() => {
    if ((userContext.token && !userContext.details) || userContext.refetch) {
      fetchUserDetails();
      setUserContext((prev) => ({ ...prev, refetch: false }));
    }
  }, [
    fetchUserDetails,
    userContext.details,
    userContext.token,
    userContext.refetch,
  ]);
};
