import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

export const Copyright = (...props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" marginTop="2rem" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://emicalculator.com/">
                EMI Calculator
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;