import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMyData } from "../../shared/hooks/use-mydata";
import { UserContext } from "../../shared/context/user-context";

const LikesForm = ({ likes }) => {
  useMyData();
  const [userContext] = useContext(UserContext);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonClass, setButtonClass] = useState(
    "w-6 h-6 stroke-slate-500 hover:stroke-slate-700 dark:hover:stroke-slate-300 cursor-pointer"
  );
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const pid = params.pid;
  const onSubmit = (data, e) => {
    if (!userContext.details) {
      navigate("/authenticate", { state: { from: location } });
      return;
    }
    setIsSubmitting(true);
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/posts/likes/${pid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userContext.details._id,
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          throw Error("Create update likes failed");
        }
        const data = await response.json();
        setCurrentLikes(data.post.likes);
      })
      .catch((err) => {
        setIsSubmitting(false);
        // console.log(err);
      })
      .finally(e.target.reset());
  };
  let isLiked = false;
  useEffect(() => {
    if (userContext.details) {
      isLiked = currentLikes.includes(userContext.details._id);
      setButtonClass(
        `w-6 h-6 ${
          isLiked
            ? "fill-red-400 stroke-red-400"
            : "stroke-slate-500 hover:stroke-slate-700 dark:hover:stroke-slate-300"
        } cursor-pointer`
      );
    } else {
      setButtonClass(
        "w-6 h-6 stroke-slate-500 hover:stroke-slate-700 dark:hover:stroke-slate-300 cursor-pointer"
      );
    }
  }, [userContext, currentLikes]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="submit"
        className="flex items-center"
        disabled={isSubmitting}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={buttonClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="mt-2 mb-2 text-slate-500 dark:text-slate-400">
          {currentLikes.length}
        </span>
      </button>
    </form>
  );
};

export default LikesForm;
