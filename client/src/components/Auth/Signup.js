import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiClient from "../../apis/api-client";
import urls from "../../apis/urls";
import { useNavigate } from "react-router-dom";
import wallpaper from "../../images/wallpaper.jpg";
import bcrypt from "bcryptjs";

const theme = createTheme();

export default function SignUp() {
  const navigate = new useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saltRounds = 5;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        // Handle error if password hashing fails
        return;
      }
      let signup = await apiClient.post(urls.auth.signup, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        city: city,
        pincode: pincode,
        state: state,
        country: country,
      });
      if (signup.status === 201) {
        console.log(signup.data);
        navigate("/login");
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: "30px",
          paddingBottom: "30px",
          backgroundImage: `url(${wallpaper})`,
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure the background covers the entire viewport height
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              width: "600px",
              mx: -12,
              display: "flex",
              flexDirection: "column",
              padding: "50px",
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle visibility based on showPassword state
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }} // Toggle show/hide password
                          size="small"
                          color="primary"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="address"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="city"
                    id="city"
                    autoComplete="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="pincode"
                    label="Pincode"
                    type="pincode"
                    id="pincode"
                    autoComplete="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="state"
                    label="State"
                    type="state"
                    id="state"
                    autoComplete="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="country"
                    label="Country"
                    type="country"
                    id="country"
                    autoComplete="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to={{
                      pathname: `/login`,
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
