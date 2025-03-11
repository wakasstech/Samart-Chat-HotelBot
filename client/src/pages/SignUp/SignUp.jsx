import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  styled,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const theme = createTheme();

const CssTextField = styled(TextField)({
  //   "& label.Mui-focused": {
  //     color: "white"
  //   },
  "& label.Mui-focused": {
    color: "#4A403A", // Change this color to your desired color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#999B9F",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#999B9F",
    },
  },
  //   "& .MuiInputLabel-root": {
  //     color: "white"
  //   },
  //   "& .MuiInputBase-input": {
  //     color: "white"
  //   }
});

const SignUp = () => {
  const [loading, setLoading] = React.useState(false);

  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const address = useRef(); // Added address field
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password?.current?.value !== confirmPassword?.current?.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is not matching... Please write carefully",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else {
      const user = {
        username: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      setLoading(true); // Start loading

      try {
        const response = await axios.post(
          "https://hoteldemo.ranaafaqali.com/api/user/create",
          user
        );

        if (response.status === 201) {
          navigate("/login"); // Use React Router for navigation if applicable
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (err) {
        console.error("Error during login:", err);
        alert("Login failed. Please check your credentials.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          backgroundColor: "#f9f9f9", // Optional background color
        }}
      >
        <CircularProgress sx={{ color: "#1B2F4A" }} />
      </Box>
    );
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" style={{ display: "flex", height: "90vh" }}>
          <CssBaseline />
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: mediaLessthanmd ? "#f5f5f5" : "transparent",
                padding: mediaLessthanmd ? "20px" : "40px",
              }}
            >
              <form
                style={{ width: "100%", maxWidth: "400px" }}
                onSubmit={handleSubmit}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    fontFalimy: "Frank Ruhl Libre",
                    fontWeight: 900,
                    color: "#1B2F4A",
                  }}
                >
                  SIGN UP
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      required
                      inputRef={userName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      inputRef={email}
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                      inputRef={password}
                      type="password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CssTextField
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      required
                      inputRef={confirmPassword}
                      type="password"
                    />
                  </Grid>

                  {/* Added address field */}
                  <Grid item xs={12}>
                    <CssTextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      required
                      inputRef={address}
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12} justifyContent="center">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background: "#4A403A",
                        "&:hover": { background: "#4A403A" },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2" color="#4A403A">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  style={{ marginTop: 3 }}
                >
                  <Grid item>
                    <Link
                      href="/"
                      variant="body2"
                      color="#1B2F4A"
                      fontWeight={"bold"}
                    >
                      Go Back To Home
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SignUp;
