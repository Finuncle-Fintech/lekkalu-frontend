import React, { useContext, useState } from 'react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Context } from 'provider/Provider'
import { Checkbox, FormControlLabel } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import styles from './Signin.module.css'
import divider from '../../assets/loginImages/Divider.svg'
import facebookIcon from '../../assets/loginImages/facebook-icon.jpg'
import googleIcon from '../../assets/loginImages/google-icon.svg'
import appleIcon from '../../assets/loginImages/apple-icon.svg'

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { fetchToken } = useContext(Context)
  const navigate = useNavigate()

  const isUnderDevelopment = true

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSignin = async (values) => {
    setLoading(true)

    try {
      const loginUser = await fetchToken(values.username, values.password)

      loginUser === 200
        ? navigate('/')
        : Swal.fire({
            position: 'top-end',
            icon: 'error',
            html: '<p>User with provided details does not exist</p>',
            showConfirmButton: false,
            timer: 3000,
          })
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        html: `<p>${error}</p>`,
        showConfirmButton: false,
        timer: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authentication}>
      <div className={styles.logo}>
        <div className={styles.logoCircle} />
        <p className={styles.logoText}>finuncle</p>
      </div>

      <div className={styles.authenticationContainer}>
        <h1 className={styles.title}>Log in</h1>

        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit(handleSignin)} className={styles.loginForm}>
            <label htmlFor='username' className={styles.loginLabel}>
              Username
            </label>
            <input
              id='username'
              {...register('username', {
                required: 'Username is required!',
                minLength: {
                  value: 6,
                  message: 'Please enter at least 6 characters',
                },
              })}
              className={styles.loginInput}
              autoComplete='username'
              autoFocus
            />
            <p className='errorMessage'>{errors?.username?.message}</p>

            <label htmlFor='password' className={styles.loginLabel}>
              Password
            </label>
            <div className={styles.passwordInputBox}>
              <input
                id='password'
                {...register('password', {
                  required: 'Password is required!',
                })}
                type={showPassword ? 'text' : 'password'}
                className={styles.passwordInput}
                autoComplete='current-password'
              />
              <div
                className={styles.visibilityButton}
                onClick={() => {
                  setShowPassword((prev) => !prev)
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
            <p className='errorMessage'>{errors?.password?.message}</p>

            <FormControlLabel
              className={styles.CheckBox}
              control={<Checkbox {...register('rememberMe')} color='success' />}
              label='Remember me'
            />

            <button
              type='submit'
              className={styles.loginButton}
              style={{ backgroundColor: loading ? '#BEBEBE' : '#1976D2' }}
              disabled={loading}
            >
              Continue
            </button>
          </form>
          <ReactRouterLink component={ReactRouterLink} to='/signup' variant='body2' className={styles.link}>
            {"Don't have an account? Sign Up"}
          </ReactRouterLink>
        </div>

        {isUnderDevelopment ? (
          <></>
        ) : (
          <>
            <div className={styles.orBlock}>
              <img className={styles.orImage} src={divider} alt='' />
              <p className={styles.orText}>OR</p>
              <img className={styles.orImage} src={divider} alt='' />
            </div>

            <div className={styles.authenticationButtons}>
              <button className={styles.authButton}>
                <img src={facebookIcon} alt='facebook' className={styles.authIcon} />
                <p className={styles.authText}>Continue with Facebook</p>
              </button>

              <button className={styles.authButton}>
                <img src={googleIcon} alt='google' className={styles.authIcon} />
                <p className={styles.authText}>Continue with Google</p>
              </button>

              <button className={styles.authButton}>
                <img src={appleIcon} alt='apple' className={styles.authIcon} />
                <p className={styles.authText}>Continue with Apple</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Signin
