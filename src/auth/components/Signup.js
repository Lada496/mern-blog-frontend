import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";

const Signup = ({ setIsLogin }) => {
  const [passwordInput, setPasswordInput] = useState(null);
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
    const subscription = watch((value) => setPasswordInput(value.password1));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="p-4 m-auto mt-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign Up
        </h3>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            // type="email"
            // name="email"
            // id="email"
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
            // name="password"
            // id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("password1", { required: true, minLength: 6 })}
          />
          {errors.password1 && (
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
            {...register("password2", {
              required: true,
              validate: (value) => value === passwordInput,
            })}
          />
        </div>
        {errors.password2 && (
          <p className="p-1 text-red-400 text-sm">Passwords do not match</p>
        )}
        <Button isWidthFull={true}>Sign Up</Button>
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
