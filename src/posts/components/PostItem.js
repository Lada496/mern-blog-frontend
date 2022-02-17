import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  // console.log(post);
  const date = new Date(post.date);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="max-w-md mx-auto bg-white mb-3 rounded-xl shadow-md overflow-hidden md:max-w-2xl dark:bg-gray-800 dark:border-gray-700 ">
      <div className="md:flex md:h-52">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={post.image}
            alt={post.title}
          />
        </div>
        <div className="px-8 py-4">
          <p className="mb-2 text-slate-500 dark:text-slate-400 text-xs">
            by <span className="capitalize">{post.name}</span> -{" "}
            {date.toLocaleString("en-US", options)}
          </p>
          <h5 className="mb-2 text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
            {post.title.length >= 25
              ? post.title.slice(0, 25).concat("...")
              : post.title}
          </h5>
          <p className="block md:h-16 mt-2 mb-2 text-slate-500 dark:text-slate-400 ">
            {post.body.length >= 100
              ? post.body.slice(0, 100).concat("...")
              : post.body}
          </p>
          <Link
            to={`../../${post.userId}/${post.id}`}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 focus:ring-4 focus:ring-blue-300 dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillrrule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
