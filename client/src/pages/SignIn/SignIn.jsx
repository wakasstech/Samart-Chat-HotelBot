import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  styled,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const theme = createTheme();

const CssTextField = styled(TextField)({
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
});

const SignIn = () => {
  const [loading, setLoading] = React.useState(false);
  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user = {
  //     email: email.current.value,
  //     password: password.current.value,
  //   };

  //   try {
  //     axios.post('https://hoteldemo.ranaafaqali.com/api/user/userlogin', user)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://hoteldemo.ranaafaqali.com/api/user/userlogin",
        user
      );

      if (response.status === 200) {
        const { data } = response.data;
        const { user, accessToken } = data;

        // Store user info and token in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Login successful", user);

        // Optional: Redirect to a dashboard or another page
        navigate("/"); // Use React Router for navigation if applicable
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading
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
        <Container
          component="main"
          style={{ display: "flex", height: "100vh", marginTop: 3 }}
        >
          <CssBaseline />
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                // alignItems: {md: 'center'},
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
                  SIGN IN
                </Typography>

                <Grid container spacing={2}>
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        background: "#4A403A",
                        "&:hover": {
                          background: "#4A403A",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  {/* <Grid item>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link href="/register" variant="body2" color="#4A403A">
                      {"Don't have an account? Sign Up"}
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

export default SignIn;
