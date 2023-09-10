import './App.css';
import {React} from 'react';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from "@mui/icons-material/Home";
import LogIn from './components/static/login/LogIn';
import UserDashboard from './components/static/user/UserDashboard';
import AdminDashboard from './components/static/admin/AdminDashboard';

function App() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className='tool-bar'>
        <Toolbar>
          <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Management System
          </Typography>
          <Link to="/">
            <HomeIcon className="home-icon" style={{color:"black"}} />
            </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path="/login" element={<LogIn />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </>
  );
}

export default App;
