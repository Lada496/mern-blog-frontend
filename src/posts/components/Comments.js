import { useState, useCallback, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import Message from "../../shared/UIElements/Message";
import CommentFrom from "./CommentFrom";
import { UserContext } from "../../shared/context/user-context";

const Comments = ({ comments }) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const pid = params.pid;
  const fetchComments = useCallback(() => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/comments/${pid}`)
      .then(async (response) => {
        setIsLoading(false);
        if (!response.ok) {
          throw Error("Failed to fetch data");
        }
        const data = await response.json();
        setFetchedComments(data.comments);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [pid]);
  useEffect(() => {
    if (comments.length > 0 && fetchedComments.length === 0) {
      fetchComments();
    }
  }, [fetchedComments, fetchComments]);

  return (
    <div className="mt-5 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
        Comments
      </h1>
      {isLoading && <Message text="Loading..." />}
      {error && <ErrorMessage text="Failed to fetch comments" />}
      {comments.length === 0 && fetchedComments.length === 0 && (
        <h1 className="text-gray-900 dark:text-white">
          No Comments Added Yet!
        </h1>
      )}
      {fetchedComments?.length > 0 && (
        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
          {fetchedComments.map((comment) => (
            <li
              key={comment.id}
              className="items-center block p-3 flex-col gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="text-sm font-normal dark:text-white">
                {comment.comment}
              </div>
              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                by {comment.name} -{" "}
                {new Date(comment.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </li>
          ))}
        </ol>
      )}

      {userContext.token && (
        <CommentFrom setFetchedComments={setFetchedComments} />
      )}
    </div>
  );
};

export default Comments;
