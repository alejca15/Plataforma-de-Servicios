import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';  
import logo from '../assets/logo.png';  
import '../../styles/Navbar.css';  

export default function Navbar_cliente() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#85B6B0' }}>
        <Toolbar>
          <Box component="img" src={logo} alt="Logo" className="logo" /> 
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


