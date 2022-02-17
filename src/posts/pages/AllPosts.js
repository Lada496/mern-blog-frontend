import { useState, useCallback, useEffect } from "react";
import PageHeading from "../../shared/UIElements/PageHeading";
import Message from "../../shared/UIElements/Message";
import PostsList from "../components/PostsList";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";

const AllPosts = () => {
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchAllPosts = useCallback(() => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/posts")
      .then(async (response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw Error("Failed to fetch all posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  });

  useEffect(() => {
    if (!posts) {
      fetchAllPosts();
    }
  }, [fetchAllPosts, posts]);
  return (
    <div className="mx-10 my-5">
      <PageHeading>Welcome! Let's write your story!</PageHeading>
      {error && <ErrorMessage text="Failed to fetch data" />}
      {isLoading && <Message text="Loaindg..." />}
      {posts?.length === 0 && <Message text="No posts yet!" />}
      {posts?.length > 0 && <PostsList posts={posts} />}
    </div>
  );
};

export default AllPosts;
