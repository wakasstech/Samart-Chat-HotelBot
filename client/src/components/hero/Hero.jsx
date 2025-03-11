import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Navbar from "../navbar";
import bgImage from "../../assets/main/bg-image.jpg";
import MainButton from "../main-button/MainButton";
import SearchNav from "../search-nav/SearchNav";
import btnGlobalIcon from "../../assets/main/btn-global-icon.svg";

const Hero = () => {
  return <Container maxWidth='false' disableGutters sx={{
    p: {
      xs: 2,
      sm: 5,
      md: 2,
    },
    background: `url(${bgImage}) center center/cover`,
    minHeight: '800px',
    borderRadius: {
      xs: '0px 0px 27px 27px',
      md: '0px 0px 54px 54px',
    },
  }}>

    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <Navbar />

      <Typography sx={{
        color: '#fff',
        marginTop: '196px',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: {
          xs: '38px',
          md: '48px',
        },
        lineHeight: '62px',
        mb: 4,
      }}>
        Exploring the Most Captivating Locations <br/> from All Around the World
      </Typography>
      <MainButton text='Discover Now' iconImg={btnGlobalIcon} />
      <SearchNav />
    </Box>

  </Container>
};

export default Hero;
