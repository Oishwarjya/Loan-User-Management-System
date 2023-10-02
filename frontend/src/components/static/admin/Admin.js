import { React } from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home'
import AdminDashboard from './AdminDashboard';
import LoanData from './loanCardManagement/LoanMasterData';
import ItemsMasterData from './itemsMasterData/ItemsMasterData';
import CustomerMasterData from './customerDataManagement/CustomerMasterData';
 

export default function Admin() {
    const {userID} = useParams();
    return (
        <>
        <AppBar position="fixed" className='tool-bar'>
            <Toolbar>
                <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Loan Management Application - Admin
                </Typography>
                <Link to={"/admin/" + userID}>
                    <HomeIcon className="home-icon" style={{color:"black", padding:5+'px'}} />
                </Link>
                <Link to="/">
                    <LogoutIcon className="logout-icon" style={{color:"black", padding:5+'px'}} />
                </Link>

            </Toolbar>
        </AppBar>
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/customers" element={<CustomerMasterData />} />
            <Route path="/loancards" element={< LoanData/>} />
            <Route path="/items" element={<ItemsMasterData />} />
        </Routes>
        </>
    );
}