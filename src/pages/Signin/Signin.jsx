import React, { useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Copyright from "../../components/Copyright/Copyright";
import Swal from "sweetalert2";
import { Context } from "provider/Provider";
import styles from './Singin.module.css';
import divider from '../../assets/Divider.svg';
import facebookIcon from '../../assets/loginImages/facebook-icon.jpg';
import googleIcon from '../../assets/loginImages/google-icon.svg';
import appleIcon from '../../assets/loginImages/apple-icon.svg';


export const Signin = () => {
    // const { fetchToken } = useContext(Context);
    // const navigate = useNavigate();
    // const [loading, setIsLoading] = useState(false)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     setIsLoading(true)

    //     try {
    //         const data = new FormData(event.currentTarget);
    //         const username = data.get('username')
    //         const password = data.get('password')

    //         const loginUser = await fetchToken(username, password)

    //         loginUser == 200
    //             ?
    //             navigate("/")
    //             :
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 html: '<p>User with provided details does not exist</p>',
    //                 showConfirmButton: false,
    //                 timer: 3000
    //             })
    //     }
    //     catch (error) {
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'error',
    //             html: `<p>${error}</p>`,
    //             showConfirmButton: false,
    //             timer: 3000
    //         })
    //         console.log(error)
    //     }
    //     finally {
    //         setIsLoading(false)
    //     }
    // };

    // return (
    //     <div>
    //         <Container component="main" maxWidth="xs">
    //             <CssBaseline />
    //             <Box
    //                 sx={{
    //                     marginTop: 8,
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     alignItems: 'center',
    //                 }}
    //             >
    //                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //                     <LockOutlinedIcon />
    //                 </Avatar>
    //                 <Typography component="h1" variant="h4">
    //                     Sign in
    //                 </Typography>
    //                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
    //                     <TextField
    //                         autoComplete="username"
    //                         name="username"
    //                         required
    //                         fullWidth
    //                         id="username"
    //                         label="Username"
    //                         autoFocus
    //                     />
    //                     <TextField
    //                         margin="normal"
    //                         required
    //                         fullWidth
    //                         name="password"
    //                         label="Password"
    //                         type="password"
    //                         id="password"
    //                         autoComplete="current-password"
    //                     />
    //                     <FormControlLabel
    //                         control={<Checkbox value="remember" color="primary" />}
    //                         label="Remember me"
    //                     />
    //                     <Button
    //                         type="submit"
    //                         fullWidth
    //                         variant="contained"
    //                         sx={{ mt: 3, mb: 2 }}
    //                         disabled={loading}
    //                     >
    //                         Sign In
    //                     </Button>
    //                     <Grid container>
    //                         <Grid item xs>
    //                             <Link to={""} variant="body2">
    //                                 Forgot password?
    //                             </Link>
    //                         </Grid>
    //                         <Grid item>
    //                             <Link component={ReactRouterLink} to="/signup" variant="body2">
    //                                 {"Don't have an account? Sign Up"}
    //                             </Link>
    //                         </Grid>
    //                     </Grid>
    //                 </Box>
    //             </Box>
    //             <Copyright sx={{ mt: 8, mb: 4 }} />
    //         </Container>
    //     </div>
    // )
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
            // Обработка ошибки
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
                <h1 className={styles.title}>Log in or sign up</h1>

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
                            disabled={loading}
                        >
                            Continue
                        </button>
                    </form>
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

                <div className={styles.singupContainer}>
                    <button className={styles.singupButton}>
                        <img src={facebookIcon} alt="facebook" className={styles.singupImg} />
                        <p className={styles.singupText}>Continue with Facebook</p>
                    </button>

                    <button className={styles.singupButton}>
                        <img src={googleIcon} alt="google" className={styles.singupImg} />
                        <p className={styles.singupText}>Continue with Google</p>
                    </button>

                    <button className={styles.singupButton}>
                        <img src={appleIcon} alt="apple" className={styles.singupImg} />
                        <p className={styles.singupText}>Continue with Apple</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signin;