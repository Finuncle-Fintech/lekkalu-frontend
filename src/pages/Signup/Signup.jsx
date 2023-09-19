import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as ReactRouterLink } from 'react-router-dom';
import Copyright from "../../components/Copyright/Copyright";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosClient from "components/Axios/Axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const Signup = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        setErrors([])
        setLoading(true)

        await axiosClient.post('users/api/users',
            JSON.stringify({
                "username": data.get('username'),
                "email": data.get('email'),
                "password": data.get('password')
            }),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                res?.status === 201
                    ?
                    navigate("/signin")
                    :
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        html: `<p>${res?.data}</p>`,
                        showConfirmButton: false,
                        timer: 3000
                    })
                console.log(res?.data)
            })
            .catch(error => {
                if (error.response.status === 500) {
                    setErrors(curr => [...curr, "Server Error!!! Try again later"])
                } else {
                    for (const key in error?.response?.data) {
                        setErrors(curr => [...curr, `${key}: ${error?.response?.data[key]}`])
                    }
                }
            });

        setLoading(false)
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Sign up
                    </Typography>
                    <div className="my-3">
                        {
                            errors.length > 0
                                ?
                                errors.map((e, i) => {
                                    return (
                                        <p key={i} className="my-2 fw-bold text-danger">{e}</p>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    type="text"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <FormControlLabel required name="termsAndConditions" control={<Checkbox required color="success" />}
                                    label={"I have read, understood and agreed to EMI Calculator's Terms and Conditions"} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel required name="privacyPolicy" control={<Checkbox required color="success" />}
                                    label={"I have read, understood and agreed to EMI Calculator's Privacy Policy"} />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link component={ReactRouterLink} to="/signin" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </div>
    )
}

export default Signup;