
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


export default function Navbar_login() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#85B6B0' }}>
        <Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

