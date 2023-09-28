import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axiosClient from "components/Axios/Axios";
import Swal from "sweetalert2";
import divider from "../../assets/loginImages/Divider.svg";
import facebookIcon from "../../assets/loginImages/facebook-icon.jpg";
import googleIcon from "../../assets/loginImages/google-icon.svg";
import appleIcon from "../../assets/loginImages/apple-icon.svg";
import styles from "./Signup.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "utils/Constants";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isUnderDevelopment = true;

  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm();

  const handleSignup = async (data) => {
    setLoading(true);

    await axiosClient
      .post(
        "users/api/users",
        JSON.stringify({
          username: data.get("username"),
          email: data.get("email"),
          password: data.get("password"),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        res?.status === 201
          ? navigate("/signin")
          : Swal.fire({
              position: "top-end",
              icon: "error",
              html: `<p>${res?.data}</p>`,
              showConfirmButton: false,
              timer: 3000,
            });
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setErrors((curr) => [...curr, "Server Error!!! Try again later"]);
        } else {
          for (const key in error?.response?.data) {
            setErrors((curr) => [
              ...curr,
              `${key}: ${error?.response?.data[key]}`,
            ]);
          }
        }
      });

    setLoading(false);
  };

  return (
    <div className={styles.authentication}>
      <div className={styles.logo}>
        <div className={styles.logoCircle}></div>
        <p className={styles.logoText}>finuncle</p>
      </div>

      <div className={styles.authenticationContainer}>
        <h1 className={styles.title}>Sign up</h1>
        <div className="my-3">
          {errors.length > 0
            ? errors.map((e, i) => {
                return (
                  <p key={i} className={styles.error}>
                    {e}
                  </p>
                );
              })
            : null}
        </div>

        <div className={styles.loginContainer}>
          <form
            onSubmit={handleSubmit(handleSignup)}
            className={styles.loginForm}
          >
            <label htmlFor="username" className={styles.loginLabel}>
              Username
            </label>
            <input
              type="text"
              className={styles.loginInput}
              autoComplete="username"
              autoFocus
              {...register("username", {
                required: "Username is required!",
                minLength: {
                  value: 6,
                  message: "Enter at least 6 characters",
                },
              })}
            />
            <p className="errorMessage">{clientErrors?.username?.message}</p>

            <label htmlFor="email" className={styles.loginLabel}>
              Email Address
            </label>
            <input
              type="email"
              className={styles.loginInput}
              autoComplete="email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email!",
                },
              })}
            />
            <p className="errorMessage">{clientErrors?.email?.message}</p>

            <label htmlFor="password" className={styles.loginLabel}>
              Password
            </label>
            <div className={styles.passwordInputBox}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Please enter at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Please enter at most 20 characters",
                  },
                })}
              />
              <div
                className={styles.visibilityButton}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
            <p className="errorMessage">{clientErrors?.password?.message}</p>

            <FormControlLabel
              className={styles.CheckBox}
              control={
                <Checkbox
                  color="success"
                  {...register("termsAndConditions", {
                    required: "Please accept terms and conditions!",
                  })}
                />
              }
              label={
                <div>
                  I have read, understood and agreed to{" "}
                  <Link to="/terms-and-conditions">
                    Finuncle's Terms and Conditions
                  </Link>
                </div>
              }
            />
            <p className="errorMessage">
              {clientErrors?.termsAndConditions?.message}
            </p>

            <FormControlLabel
              className={styles.CheckBox}
              control={
                <Checkbox
                  color="success"
                  {...register("privacyPolicy", {
                    required: "Please agree to the privacy policies!",
                  })}
                />
              }
              label={
                <div>
                  I have read, understood and agreed to{" "}
                  <Link to="/privacy-policies">Finuncle's Privacy Policy</Link>
                </div>
              }
            />
            <p className="errorMessage">
              {clientErrors?.privacyPolicy?.message}
            </p>

            <button
              type="submit"
              className={styles.loginButton}
              style={{
                backgroundColor: loading ? "#BEBEBE" : "#1976D2",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              Continue
            </button>
          </form>
          <ReactRouterLink
            component={ReactRouterLink}
            to="/signin"
            variant="body2"
            className={styles.link}
          >
            {"Already have an account? Sign in"}
          </ReactRouterLink>
        </div>

        {isUnderDevelopment ? (
          <></>
        ) : (
          <>
            <div className={styles.orBlock}>
              <img className={styles.orImage} src={divider} alt="" />
              <p className={styles.orText}>OR</p>
              <img className={styles.orImage} src={divider} alt="" />
            </div>

            <div className={styles.authenticationButtons}>
              <button className={styles.authButton}>
                <img
                  src={facebookIcon}
                  alt="facebook"
                  className={styles.authIcon}
                />
                <p className={styles.authText}>Continue with Facebook</p>
              </button>

              <button className={styles.authButton}>
                <img
                  src={googleIcon}
                  alt="google"
                  className={styles.authIcon}
                />
                <p className={styles.authText}>Continue with Google</p>
              </button>

              <button className={styles.authButton}>
                <img src={appleIcon} alt="apple" className={styles.authIcon} />
                <p className={styles.authText}>Continue with Apple</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
