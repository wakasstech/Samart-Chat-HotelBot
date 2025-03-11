import React from "react";

import { Button } from "@mui/material";

const MainButton = ({ iconImg, text }) => {
  return (
    <Button variant='contained' sx={{
      width: {
        xs: '100%',
        md: 'auto',
      },
      backgroundColor: '#249EA0',
      p: {
        xs: 1,
        md: 2,
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      borderRadius: '12px',
      fontFamily: 'inherit',
      fontWeight: '600',
      fontSize: '18px',
      color: '#fff',
      marginRight: '10px',
      '&.MuiButtonBase-roo:hover': {
        backgroundColor: '#7B61FF'
      }
    }}>
      <img src={iconImg} alt="" />
      {text}
    </Button>
  );
};

export default MainButton;
