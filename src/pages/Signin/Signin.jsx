import React, { useContext, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Context } from "provider/Provider";
import styles from './Signin.module.css';
import divider from '../../assets/loginImages/Divider.svg';
import facebookIcon from '../../assets/loginImages/facebook-icon.jpg';
import googleIcon from '../../assets/loginImages/google-icon.svg';
import appleIcon from '../../assets/loginImages/apple-icon.svg';


export const Signin = () => {
    const { fetchToken } = useContext(Context);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data = new FormData(event.currentTarget);
            const username = data.get('username');
            const password = data.get('password');

            const loginUser = await fetchToken(username, password)

            loginUser == 200
                ?
                navigate("/")
                :
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    html: '<p>User with provided details does not exist</p>',
                    showConfirmButton: false,
                    timer: 3000
                })
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                html: `<p>${error}</p>`,
                showConfirmButton: false,
                timer: 3000
            })
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authentication}>
            <div className={styles.logo}>
                <div className={styles.logoCircle}></div>
                <p className={styles.logoText}>finuncle</p>
            </div>

            <div className={styles.authenticationContainer}>
                <h1 className={styles.title}>Log in</h1>

                <div className={styles.loginContainer}>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <label htmlFor="username" className={styles.loginLabel}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={styles.loginInput}
                            autoComplete="username"
                            required
                            autoFocus
                        />
                        <label htmlFor="password" className={styles.loginLabel}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={styles.loginInput}
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="submit"
                            className={styles.loginButton}
                            style={{ backgroundColor: loading ? '#BEBEBE' : '#1976D2' }}
                            disabled={loading}
                        >
                            Continue
                        </button>
                    </form>
                    <ReactRouterLink component={ReactRouterLink} to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </ReactRouterLink>
                </div>

                <div className={styles.orBlock}>
                    <img
                        className={styles.orImage}
                        src={divider}
                        alt=""
                    />
                    <p className={styles.orText}>OR</p>
                    <img
                        className={styles.orImage}
                        src={divider}
                        alt=""
                    />
                </div>

                <div className={styles.authenticationButtons}>
                    <button className={styles.authButton}>
                        <img src={facebookIcon} alt="facebook" className={styles.authIcon} />
                        <p className={styles.authText}>Continue with Facebook</p>
                    </button>

                    <button className={styles.authButton}>
                        <img src={googleIcon} alt="google" className={styles.authIcon} />
                        <p className={styles.authText}>Continue with Google</p>
                    </button>

                    <button className={styles.authButton}>
                        <img src={appleIcon} alt="apple" className={styles.authIcon} />
                        <p className={styles.authText}>Continue with Apple</p>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Signin;