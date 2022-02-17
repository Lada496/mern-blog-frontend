import { useEffect, useCallback, useContext, useState } from "react";
import { UserContext } from "../../shared/context/user-context";
import PageHeading from "../../shared/UIElements/PageHeading";
import PostsList from "../components/PostsList";

const MyPage = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchPostsByUserId = useCallback(() => {
    setError("");
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/posts/myposts/posts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then(async (response) => {
        setIsLoading(false);
        console.log(response);
        if (!response.ok) {
          throw Error("Failed to fetch your posts");
        }
        const data = await response.json();
        setMyPosts(data.posts);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, userContext.details]);

  useEffect(() => {
    if (userContext?.details?.length > 0 || myPosts.length === 0) {
      fetchPostsByUserId();
    }
  }, [userContext.details, myPosts]);

  useEffect(() => {
    console.log(userContext.details);
  }, [userContext]);

  return (
    <div className="mx-10 my-5">
      <PageHeading>{`${userContext?.details?.name}'s`} Page</PageHeading>
      {userContext?.details?.posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-100">No posts yet!</p>
      )}
      {isLoading && (
        <p className="text-gray-500 dark:text-gray-100">Loaindg...</p>
      )}
      {myPosts.length > 0 && <PostsList posts={myPosts} />}
    </div>
  );
};

export default MyPage;
