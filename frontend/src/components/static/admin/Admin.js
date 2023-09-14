import { React } from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home'
import AdminDashboard from './AdminDashboard';
import CustomerData from './customerDataManagement/CustomerDataManagement';
import LoanCardManagement from './loanCardManagement/LoanCardManagement';
import ItemsMasterDashboard from './itemsMasterData/ItemsMasterDashboard';
import AddItems from './itemsMasterData/AddItems';
import EditItems from './itemsMasterData/EditItems';

export default function Admin() {
    const {userID} = useParams();
    return (
        <>
        <AppBar position="fixed" className='tool-bar'>
            <Toolbar>
                <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Admin Dashboard: User {userID}
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
            <Route path="/customer" element={<CustomerData />} />
            <Route path="/loancard" element={<LoanCardManagement />} />
            <Route path="/items" element={<ItemsMasterDashboard />} />
            <Route path="/addItem" element={<AddItems />} />
            <Route path="/editItem" element={<EditItems />} />
        </Routes>
        </>
    );
}