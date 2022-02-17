import React from "react";
import CommentFrom from "./CommentFrom";

const Comments = ({ comments }) => {
  return (
    <div className="mt-5 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
        Comments
      </h1>
      {comments.length === 0 ? (
        <h1 className="text-gray-900 dark:text-white">
          No Comments Added Yet!
        </h1>
      ) : (
        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="items-center block p-3 flex-col gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="text-sm font-normal">{comment.comment}</div>
              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                {comment.name}
              </span>
            </li>
          ))}
        </ol>
      )}

      <CommentFrom />
    </div>
  );
};

export default Comments;
