import { useEffect, useCallback, useContext } from "react";
import { UserContext } from "../../shared/context/user-context";
import PageHeading from "../../shared/UIElements/PageHeading";

const MyPage = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
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
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userContext.details]);

  useEffect(() => {
    console.log(userContext.details);
  }, [userContext]);
  return (
    <div className="mx-10 my-5">
      <PageHeading>{`${userContext?.details?.name}'s`} Page</PageHeading>
      {userContext?.details?.posts.length === 0 && (
        <p className="text-gray-500 dark:gray-100">No posts yet!</p>
      )}
    </div>
  );
};

export default MyPage;
