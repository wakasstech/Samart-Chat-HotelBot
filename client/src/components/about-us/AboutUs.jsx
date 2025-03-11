import React from "react";

import { Box, Container, Typography } from "@mui/material";

import SecondaryButton from "../secondary-button/SecondaryButton";
import aboutUsImg from "../../assets/main/about-us-img.svg";

const AboutUs = () => {
  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{
        px: {
          xs: 2,
          sm: 5,
          md: 3.5,
        },
        my: 15,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "32px",
              lineHeight: "48px",
              color: "#161414",
              textAlign: {
                xs: "center",
                md: "left",
              },
            }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "32px",
              color: "#5B5B5B",
              my: 4,
            }}
          >
            We are a team of passionate travel enthusiasts who are dedicated to providing our clients with unforgettable travel experiences. Our agency was founded with the belief that travel should be accessible to everyone, and we strive to make that a reality by offering a wide range of affordable travel packages to destinations all around the world.
          </Typography>
          <SecondaryButton text="Read more" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <img
            src={aboutUsImg}
            alt=""
            style={{
              borderRadius: "24px",
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;