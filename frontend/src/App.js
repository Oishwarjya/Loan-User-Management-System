import './App.css';
import {React} from 'react';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogIn from './components/static/login/LogIn';
import User from './components/static/user/User';
import Admin from './components/static/admin/Admin';

function App() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className='tool-bar'>
        <Toolbar>
          <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path="/login" element={<LogIn />} />
      <Route path="/user/:userID/*" element={<User />} />
      <Route path="/admin/:userID/*" element={<Admin />} />
    </Routes>
    </>
  );
}

export default App;
