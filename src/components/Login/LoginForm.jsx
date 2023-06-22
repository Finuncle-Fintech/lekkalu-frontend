import { useState } from 'react';
import validation from './LoginValidation';

import { useLogin } from '../../utils/hooks/useLoginUser';

const initialData = { username: '', password: '' };

const LoginForm = (props) => {
  const [logInData, setLogInData] = useState(initialData);
  const [responseErrors, setResponseErrors] = useState([]);
  const [errors, setErrors] = useState({});

  const { handleSubmit } = useLogin();

  const onInputChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setLogInData({
      ...logInData,
      [name]: value,
    });
  };

  const onLogInClick = async (ev) => {
    ev.preventDefault();

    const [errors] = validation(logInData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const userData = {
        username: logInData.username.toLowerCase(),
        password: logInData.password,
      };
      handleSubmit(userData);
    }
  };

  return (
    <div>
      <form>
        <div>{responseErrors}</div>

        <div className="form-outline mb-4 mt-4">
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            required
            value={logInData.username}
            onChange={onInputChange}
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            required
            value={logInData.password}
            onChange={onInputChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="remember-me"
              />
              Remember me
            </div>
          </div>

          <div className="col d-flex justify-content-end">
            {/* <!-- Simple link --> */}
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <button
          type="button"
          className="btn btn-primary btn-block mb-4 w-100"
          onClick={onLogInClick}
        >
          LogIn
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
