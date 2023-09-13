import { React } from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ApplyForLoans from './applyForLoans/ApplyForLoans';
import ItemsPurchased from './itemsPurchased/ItemsPurchased';
import ViewLoans from './viewLoans/ViewLoans'
import UserDashboard from './UserDashboard';
import './userStyles.css';

export default function Admin() {
    const {userID} = useParams();
    return (
        <>
        <AppBar position="fixed" className='tool-bar'>
            <Toolbar>
                <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    User Dashboard: Welcome {userID}
                </Typography>
                <Link to={"/user/" + userID}>
                    <HomeIcon className="home-icon" style={{color:"black", padding:5+'px'}} />
                </Link>
                <Link to="/">
                    <LogoutIcon className="logout-icon" style={{color:"black", padding:5+'px'}} />
                </Link>

            </Toolbar>
        </AppBar>
        <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/apply" element={<ApplyForLoans />} />
            <Route path="/loans" element={<ViewLoans />} />
            <Route path="/items" element={<ItemsPurchased />} />
        </Routes>
        </>
    );
}