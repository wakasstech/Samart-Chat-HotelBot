import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box, Button, Drawer, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/main/hotelLogo.png";
import userAvatar from "../../assets/main/user-avatar.svg";
import { navItems } from "../../data.js";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const [tokenn , setTokenn] = useState(null);
  const [userr , setUser] = useState(null)
  console.log(userr); // Using bracket notation
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")

    if (token) {
      setTokenn(token);
      const parsedUser = JSON.parse(user);
    setUser(parsedUser);
     
    }
  }, []);


  const handleRegister = () => {
    navigate("/register")
  }
  const handleLogin = () => {
    navigate("/login")
    
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
    
  }
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container
        maxWidth="xl"
        sx={{
          px: 3,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        disableGutters
      >
        {/* <img src={logo} alt="logo" style={{ cursor: "pointer", width: '6rem' }} /> */}
        <span style={{fontWeight:'bold', color: 'white', fontSize:30}}>LOGO</span>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "54px",
          }}
        >
          {navItems.map((navItem) => (
            <Link
              href="#"
              key={navItem.id}
              underline="none"
             
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                color: 'white',
                opacity: 0.7,
                transition: 'ease-in-out',
                transitionDuration: '.2s',
                opacity: 1,
                "&:hover": {
                  opacity: 1,
                },
                "&:first-of-type": {
                  opacity: 1,
                },
              }}
            >
              {navItem.name}
            </Link>
          ))}
        </Box>


        {

tokenn &&

          (
<Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "13px",
          }}
        >
            <Button

onClick={handleLogout}
  variant="contained"
  sx={{
    backgroundColor: "#1B2F4A",
    color: "#fff",
    fontWeight: 'bold',
    fontSize:10,
    
    border: '1px solid #fff',
    '&:hover': { backgroundColor: "#1B2F4A" },
  }}
>
  Logout
</Button>
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Hello,
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                textTransform: 'capitalize'
              }}
            >
              {userr?.username}
            </Typography>
          </Box>
          {/* <img src={userAvatar} alt="avatar" style={{ cursor: "pointer" }} /> */}
          <AccountCircle style={{color: 'white'}}/>
          
        </Box>
          )
        }
        
{
  !tokenn && (
<Box
          sx={{
            display: "flex",
            gap: "10px",
           
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Button

          onClick={handleLogin}
            variant="contained"
            sx={{
              backgroundColor: "#249EA0",
              color: "#fff",
              fontWeight: 'bold',
              fontSize:14,
              '&:hover': { backgroundColor: "#249EA0" },
            }}
          >
            Login
          </Button>
          <Button
           onClick={handleRegister}
            variant="contained"
            sx={{
              backgroundColor: "#249EA0",
              color: "#fff",
              fontWeight: 'bold',
              fontSize:14,
              '&:hover': { backgroundColor: "#249EA0" },
            }}
          >
            Register
          </Button>
        </Box>
  )
}
        
        

        {/* Menu Icon ========================= */}
        <MenuIcon
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={() => setOpenMobileMenu(true)}
        />

        {/* Mobile Menu ========================= */}
        <Drawer
          anchor="right"
          open={openMobileMenu}
          onClose={() => setOpenMobileMenu(false)}
        >
          <Box
            sx={{
              position: "relative",
              width: 250,
              backgroundColor: "#5243C2",
              height: "100%",
              py: 3,
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
            role="presentation"
            onClick={() => setOpenMobileMenu(false)}
            onKeyDown={() => setOpenMobileMenu(false)}
          >

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >

{
  !tokenn && (
<Box
          sx={{
            display: "flex",
            gap: "10px",
           
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Button

          onClick={handleLogin}
            variant="contained"
            sx={{
              backgroundColor: "#249EA0",
              color: "#fff",
              fontWeight: 'bold',
              fontSize:14,
              '&:hover': { backgroundColor: "#249EA0" },
            }}
          >
            Login
          </Button>
          <Button
           onClick={handleRegister}
            variant="contained"
            sx={{
              backgroundColor: "#249EA0",
              color: "#fff",
              fontWeight: 'bold',
              fontSize:14,
              '&:hover': { backgroundColor: "#249EA0" },
            }}
          >
            Register
          </Button>
        </Box>
  )
}
{

tokenn &&

          (
<Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "13px",
          }}
        >
            <Button

onClick={handleLogout}
  variant="contained"
  sx={{
    backgroundColor: "#1B2F4A",
    color: "#fff",
    fontWeight: 'bold',
    fontSize:10,
    
    border: '1px solid #fff',
    '&:hover': { backgroundColor: "#1B2F4A" },
  }}
>
  Logout
</Button>
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Hello,
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
                textTransform: 'capitalize'
              }}
            >
              {userr?.username}
            </Typography>
          </Box>
          {/* <img src={userAvatar} alt="avatar" style={{ cursor: "pointer" }} /> */}
          <AccountCircle style={{color: 'white'}}/>
          
        </Box>
          )
        }

            </Box>

            {/* Mobile menu nav links =============== */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: 'ease-in-out',
                transitionDuration: '.2s',
                gap: 3,
              }}
            >
              {navItems.map((navItem) => (
                <Link
                  href="#"
                  key={navItem.id}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontWeight: "300",
                    fontSize: "14px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                    "&:first-of-type": {
                      opacity: 1,
                    },
                  }}
                >
                  {navItem.name}
                </Link>
              ))}
            </Box>

            {/* Mobile menu bottom logo ======================== */}
            {/* <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
                position: "absolute",
                bottom: "14px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              &#169; 2rism
            </Typography> */}

          </Box>
         
        </Drawer>
      </Container>
    </AppBar>
  );
};
export default Navbar;