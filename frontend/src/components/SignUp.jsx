import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';  

const theme = createTheme();

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); 

        const userData = {
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            password
        };

        try {
            const response = await fetch("http://localhost:3002/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User registered successfully", data);
                alert("Signup Successful! Redirecting to login page...");
                window.location.href = "/login"; 
            } else {
                console.error("Signup failed", data);
                setError(data.message || "Signup failed! Please try again."); 
            }
        } catch (error) {
            console.error("Error during signup", error);
            setError("An error occurred! Please check your connection.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    
                    {error && <Alert severity="error">{error}</Alert>} {}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(event) => setFirstName(event.target.value)}
                            value={firstName}
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => setLastName(event.target.value)}
                            value={lastName}
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                        />
                        <TextField
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                        />
                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            value={phoneNumber}
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                label="Role"
                                name="role"
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
