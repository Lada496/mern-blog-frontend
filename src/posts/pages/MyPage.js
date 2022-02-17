import { useEffect, useCallback, useContext, useState } from "react";
import { UserContext } from "../../shared/context/user-context";
import Message from "../../shared/UIElements/Message";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import PageHeading from "../../shared/UIElements/PageHeading";
import PostsList from "../components/PostsList";
import { useMyData } from "../../shared/hooks/use-mydata";

const MyPage = () => {
  useMyData();
  const [userContext, setUserContext] = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    if (
      !userContext.isLoading &&
      userContext?.details?.posts.length > 0 &&
      myPosts.length === 0
    ) {
      fetchPostsByUserId();
    }
  }, [userContext.details, myPosts]);

  return (
    <div className="mx-10 my-5">
      {error && <ErrorMessage text="Failed to fetch data" />}

      {userContext?.details && (
        <PageHeading>
          {userContext.details.name}
          <span className="lowercase">'s</span> Page
        </PageHeading>
      )}
      {isLoading && <Message text="Loaindg..." />}
      {userContext?.details?.posts.length === 0 ? (
        <Message text="No posts yet!" />
      ) : (
        <PostsList posts={myPosts} />
      )}
    </div>
  );
};

export default MyPage;
