import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRive, useStateMachineInput } from 'rive-react';
import Cookies from "js-cookie"; // ✅ Cookies import karein
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const STATE_MACHINE_NAME = "State Machine 1";

export default function SignIn({ checkLogin }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { rive, RiveComponent } = useRive({
        src: "520-990-teddy-login-screen.riv",
        autoplay: true,
        stateMachines: STATE_MACHINE_NAME
    });

    useEffect(() => {
        setLook();
    }, [user]);

    const stateSuccess = useStateMachineInput(rive, STATE_MACHINE_NAME, 'success');
    const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fail');
    const stateHandUp = useStateMachineInput(rive, STATE_MACHINE_NAME, 'hands_up');
    const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Check');
    const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Look');

    const triggerSuccess = () => stateSuccess?.fire();
    const triggerFail = () => stateFail?.fire();
    const setHangUp = (hangUp) => stateHandUp && (stateHandUp.value = hangUp);
    const setCheck = (check) => stateCheck && (stateCheck.value = check);

    const setLook = () => {
        if (!stateLook || !stateCheck || !setHangUp) return;

        setHangUp(false);
        setCheck(true);

        let nbChars = user ? user.length : 0;
        let ratio = nbChars / 41;
        let lookToSet = ratio * 100 - 25;

        stateLook.value = Math.round(lookToSet);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.trim() || !password.trim()) {
            alert("Email aur Password required hai!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user, password }),
            });

            const result = await response.json();
            console.log("Server Response:", result);

            if (response.ok && result.token) {
                alert("Login Successful!");
                Cookies.set("token", result.token, { expires: 7 }); // ✅ Store token in cookies for 7 days
                triggerSuccess();
                window.location.href = "/my-account"; // ✅ Redirect to My Account
            } else {
                alert("Login Failed: " + result.message);
                triggerFail();
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <RiveComponent style={{ width: '400px', height: '400px' }} />
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onFocus={() => setHangUp(false)}
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => {
                                setHangUp(true);
                                setPassword(event.target.value);
                            }}
                            value={password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            onMouseOver={() => setHangUp(false)}
                            onFocus={() => setHangUp(false)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
