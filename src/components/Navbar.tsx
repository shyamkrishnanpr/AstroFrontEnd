import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#d3d3d3" }}>
        {/* Change the background color of the AppBar */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            ADMIN PANEL
          </Typography>
          <Box>
            <Button
              color="info"
              variant="outlined"
              component={Link}
              to="/"
              sx={{ backgroundColor: "white", marginLeft: 2 }}
            >
              HOME
            </Button>
            <Button
              variant="outlined"
              color="info"
              component={Link}
              to="/register"
              sx={{ backgroundColor: "white", marginLeft: 2 }}
            >
              REGISTER
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
