import { React, useState, useEffect, useRef } from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ApplyForLoans from './applyForLoans/ApplyForLoans';
import ItemsPurchased from './itemsPurchased/ItemsPurchased';
import ViewLoans from './viewLoans/ViewLoans'
import UserDashboard from './UserDashboard';
import * as API from '../../services/ApiRequestService';
import * as CommonUtils from '../../common/CommonUtils';
import './userStyles.css';

export default function Admin() {
    const {userID} = useParams();
    const [name, setName] = useState("");
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });

    useEffect(() => {
        API.get("/api/employee/"+userID).then(res => {
            console.log(res);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
               setName(res.data.data.name);
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch employee details " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);            }
        }).catch((err) => {
            popupProps.current = {
                "title": "Error!",
                "message": "Unable to fetch employee details",
                "handleAlertClose": () => { setOpenErrorPopup(false);}
            };   
            setOpenErrorPopup(true);
         });

    }, []);

    return (
        <>
        <AppBar position="fixed" className='tool-bar'>
            <Toolbar>
                <Typography style={{color:'black'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Loan Management Application: Welcome {name?name:"User"}
                </Typography>
                <Link to={"/user/" + userID}>
                    <HomeIcon className="home-icon" style={{color:"black", padding:5+'px'}} />
                </Link>
                <Link to="/">
                    <LogoutIcon className="logout-icon" style={{color:"black", padding:5+'px'}} />
                </Link>

            </Toolbar>
        </AppBar>
        {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
        {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}

        <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/apply" element={<ApplyForLoans />} />
            <Route path="/loans" element={<ViewLoans />} />
            <Route path="/items" element={<ItemsPurchased />} />
        </Routes>
        </>
    );
}