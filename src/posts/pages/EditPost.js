import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeading from "../../shared/UIElements/PageHeading";
import PostForm from "../components/PostForm";
import Message from "../../shared/UIElements/Message";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";

const EditPost = () => {
  const params = useParams();
  const pid = params.pid;
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchPostById = useCallback(() => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/posts/${pid}`)
      .then(async (response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw Error("Failed to fetch data");
        }
        const data = await response.json();
        setPost(data.post);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [pid]);
  useEffect(() => {
    if (!post) {
      fetchPostById();
    }
  }, [fetchPostById, post]);
  return (
    <div className="mx-10 my-5">
      <PageHeading>Edit Post</PageHeading>
      {isLoading && <Message text="Loading..." />}
      {error && <ErrorMessage text={error} />}
      {post && <PostForm currentPost={post} isEditMode={true} />}
    </div>
  );
};

export default EditPost;
