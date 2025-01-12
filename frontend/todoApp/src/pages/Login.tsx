import { useState } from "react";
import { userLogin } from "../static/ts/main";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const loginResult: boolean = await userLogin(username, password);
    setLoginSuccess(loginResult);
    setIsLoading(false);

    // Reset and start countdown
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 3 seconds
    setTimeout(() => {
      clearInterval(interval);
      if (loginResult) window.location.href = '/todo';
      setLoginSuccess(null);
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loginSuccess !== null && (
        <div
          className={`relative flex flex-col px-4 py-3 rounded shadow-md text-white w-80 mb-4 ${loginSuccess ? "bg-green-500" : "bg-red-500"
            }`}
        >
          <div>
            <p className="font-semibold mb-2">
              {loginSuccess
                ? "Login Successful! Redirecting..."
                : "Login Failed! Please check your credentials."}
            </p>
          </div>
          {/* Progress Bar */}
          {loginSuccess && (
            <div className="relative w-full h-2 bg-green-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-green-600 rounded transition-all duration-1000"
                style={{ width: `${(countdown / 3) * 100}%` }}
              ></div>
            </div>
          )}
          <button
            onClick={() => setLoginSuccess(null)}
            className="absolute top-2 right-2 text-white bg-transparent hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Username:</label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password:</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
          <div className="todo-spiner">
            {isLoading && <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
