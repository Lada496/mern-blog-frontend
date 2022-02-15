import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHttp } from "../../shared/hooks/use-http";
import Button from "../../shared/UIElements/Button";

const Signup = ({ setIsLogin }) => {
  const [passwordInput, setPasswordInput] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const goToLoginHandler = () => {
    setIsLogin(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  useEffect(() => {
    const subscription = watch((value) => setPasswordInput(value.password));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data, e) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_ENDPOINT}api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            username: data.email,
            password: data.password,
          }),
        }
      );
      console.log(responseData);
    } catch (err) {}
    // e.target.reset();
  };

  return (
    <div className="p-4 m-auto mt-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign Up
        </h3>
        {error && <p className="p-1 text-red-400 text-sm">Failed to sign up</p>}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <p className="p-1 text-red-400 text-sm">This is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <p className="p-1 text-red-400 text-sm">
              Please enter a valid email
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="p-1 text-red-400 text-sm">
              Password should be at least 6 words
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === passwordInput,
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="p-1 text-red-400 text-sm">Passwords do not match</p>
        )}
        <Button
          isWidthFull={true}
          disabled={
            errors.name ||
            errors.password ||
            errors.confirmPassword ||
            errors.email ||
            isLoading
          }
        >
          {isLoading ? (
            <>
              <svg
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <span
            onClick={goToLoginHandler}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
