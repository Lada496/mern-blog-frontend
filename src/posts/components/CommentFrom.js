import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import LoadingButtonEl from "../../shared/UIElements/LoadingButtonEl";
import Button from "../../shared/UIElements/Button";
import { UserContext } from "../../shared/context/user-context";

const CommentFrom = ({ setFetchedComments }) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userContext] = useContext(UserContext);
  const [error, setError] = useState("");
  const pid = params.pid;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => {
    setIsSubmitting(true);
    setError("");
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/comments/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({
        comment: data.comment,
        date: new Date(),
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          throw Error("Create new comment falied");
        }
        const data = await response.json();
        setFetchedComments((prev) => [data.comment, ...prev]);
        e.target.reset();
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError(err);
      });
  };

  let buttonDisaled = errors.comment || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 p-5 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
    >
      {error && <ErrorMessage text="Failed to uplode comment" />}
      <div className="mb-6">
        <label
          htmlFor="comment"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Comment
        </label>
        <textarea
          {...register("comment", { required: true })}
          rows="4"
          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        {errors.comment && <ErrorMessage text="This is required" />}
      </div>

      <Button disabled={buttonDisaled}>
        {isSubmitting ? <LoadingButtonEl /> : "Submit"}
      </Button>
    </form>
  );
};

export default CommentFrom;
