import { useState } from 'react';
import validation from './LoginValidation';

const initialData = { email: '', password: '' };

const LoginForm = () => {
   const [logInData, setLogInData] = useState(initialData);
   const [responseErrors, setResponseErrors] = useState([]);
   const [errors, setErrors] = useState({});

   const onInputChange = (ev) => {
      const name = ev.target.name;
      const value = ev.target.value;
      setLogInData({
         ...logInData,
         [name]: value,
      });
   };

   const onLogInClick = (ev) => {
      ev.preventDefault();

      const [errors] = validation(logInData);
      setErrors(errors);

      if (Object.keys(errors).length === 0) {
      }
   };

   return (
      <div>
         <form>
            {/* <!-- Email input --> */}
            <div className='form-outline mb-4 mt-4'>
               <label className='form-label' htmlFor='email'></label>
               <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='E-mail'
                  required
                  value={logInData.userName}
                  onChange={onInputChange}
               />
               {errors.email && (
                  <div className='text-danger'>{errors.email}</div>
               )}
            </div>

            {/* <!-- Password input --> */}
            <div className='form-outline mb-4'>
               <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  name='password'
                  required
                  value={logInData.password}
                  onChange={onInputChange}
               />
               {errors.password && (
                  <div className='text-danger'>{errors.password}</div>
               )}
            </div>

            {/* <!-- 2 column grid layout for inline styling --> */}
            <div className='row mb-4'>
               <div className='col d-flex'>
                  {/* <!-- Checkbox --> */}
                  <div className='form-check'>
                     <input
                        className='form-check-input'
                        type='checkbox'
                        value=''
                        id='remember-me'
                     />
                     Remember me
                  </div>
               </div>

               <div className='col d-flex justify-content-end'>
                  {/* <!-- Simple link --> */}
                  <a href='#!'>Forgot password?</a>
               </div>
            </div>

            {/* <!-- Submit button --> */}
            <button
               type='button'
               className='btn btn-primary btn-block mb-4 w-100'
               onClick={onLogInClick}
            >
               LogIn
            </button>
         </form>
      </div>
   );
};

export default LoginForm;
