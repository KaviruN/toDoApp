import { useState } from 'react';
import { userLogin } from "./static/ts/main";

const Login: React.FC = () => {
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // Clear all input fields with the class 'form-input'
    const formInputs = document.querySelectorAll('.form-input') as NodeListOf<HTMLInputElement>;
    formInputs.forEach(input => input.value = '');
  }

  return (
    <div className="login-container">
      {loginSuccess !== null && (
        <div className={`message ${loginSuccess ? 'success' : 'error'}`}>
          <div className="message__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" height={24} fill="none">
              <path fill="#393a37" d={loginSuccess ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" : "m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"} />
            </svg>
          </div>
          <div className="message__title">
            {loginSuccess ? 'Login Successful' : 'Login Failed, Please check username and password'}
          </div>
          <div className="message__close" onClick={() => setLoginSuccess(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 20 20" height={20}>
              <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" />
            </svg>
          </div>
        </div>
      )}
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="login-button"
              
            >
              Login
            </button>
            <a href="/register">Register</a>
            {isLoading && <img src="./public/loading.gif" alt="Loading" />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;