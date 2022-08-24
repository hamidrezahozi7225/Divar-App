import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postUsers } from "../api/productApi";
import { userProvider } from "../context/UsersContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const SignUp = () => {
  const [user, setUser] = useState({ Name: "", Email: "", Passwords: "" });
  const [error, setError] = useState("");
  const { errors, setErrors } = useContext(userProvider);
  const { users: Allusers } = useContext(userProvider);
  const { username, setUserName } = useContext(userProvider);
  console.log(Allusers);
  const navigate = useNavigate();

  function isValidEmail(emails) {
    return /\S+@\S+\.\S+/.test(emails);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const pass = data.get("password");
    if (!email && !pass) {
      setError("email & passord is required");
    } else if (!isValidEmail(email)) {
      setError("your Email is not valid");
    } else if (Allusers.find((item) => item.Email === email)) {
      setError("Email is already used");
    } else {
      setUser({
        Name: name,
        Email: email,
        Passwords: pass,
      });
      setError("");
      navigate(-2);
      setUserName(name);
    }
  };

  useEffect(() => {
    if (user.Email && user.Passwords) {
      setErrors(true);
      postUsers(user);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // onChange={handleChange}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <div>{error && error}</div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {!errors ? "Sign Up" : <Link to="/">Sign Up</Link>}
            </Button>

            <Grid container>
              <Grid item xs>
                {/* <Link href="#" ">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/login">{"برای ورود کلیک کنید"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
