import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeading from "../../shared/UIElements/PageHeading";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import Message from "../../shared/UIElements/Message";
import PostsList from "../components/PostsList";

const UserPosts = () => {
  const params = useParams();
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoadidng] = useState(false);
  const fetchPostsByUserId = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/posts/user/${params.uid}`)
      .then(async (response) => {
        setIsLoadidng(false);
        if (!response.ok) {
          throw Error("Failed to fetch posts by userId");
        }
        const data = await response.json();
        setPosts(data.posts);
      })
      .catch((err) => {
        setIsLoadidng(false);
        setError("Failed to fetch posts by userId");
      });
  }, [params.uid]);
  useEffect(() => {
    if (!posts) {
      fetchPostsByUserId();
    }
  }, [fetchPostsByUserId, posts]);

  return (
    <div className="mx-10 my-5">
      {error && <ErrorMessage text={error} />}
      {isLoading && <Message text="Loaindg..." />}
      {posts && (
        <PageHeading>
          {posts[0].name}
          <span className="lowercase">'s</span> Page
        </PageHeading>
      )}
      {posts && posts.length !== 0 && <PostsList posts={posts} />}
    </div>
  );
};

export default UserPosts;
