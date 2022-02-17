import React from "react";

const LikesForm = ({ likes }) => {
  return (
    <form>
      {/* <input type="hidden" name="articleId" value="<%= article._id %>" />
      <input type="hidden" name="likes" value="<%= article.likes %>" /> */}
      <div className="flex items-center">
        <svg
          onclick="this.closest('form').submit();return false;"
          className="w-6 h-6 stroke-slate-500 hover:stroke-slate-700 dark:hover:stroke-slate-300 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          ></path>
        </svg>
        <span className="mt-2 mb-2 text-slate-500 dark:text-slate-400">
          {likes.length}
        </span>
      </div>
    </form>
  );
};

export default LikesForm;
