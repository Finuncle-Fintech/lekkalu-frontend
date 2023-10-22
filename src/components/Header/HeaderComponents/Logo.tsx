import { Box, Typography } from '@mui/material'
import * as React from 'react'

const Logo = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '25px',
                        height: '25px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        marginBottom: '5vh',
                        marginRight: '1.5vh',
                    }}
                />

                <Typography
                    variant='h4'
                    sx={{
                        fontWeight: 600,
                        lineHeight: '25px',
                        color: 'white',
                    }}
                >
                    {' '}
                    finuncle
                </Typography>
            </Box>
        </Box>
    )
}

export default Logo
