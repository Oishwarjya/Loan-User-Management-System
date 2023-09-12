import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import './adminStyles.css';

export default function AdminDashboard() {
    let navigate = useNavigate();
    const routeParams = useParams();

    const handleSubmit = (path) => {
        navigate('/admin/'+routeParams.userID+path);
    }

    return (
        <>
            <div className='card-div'>
                <Card className='card' sx={{ minWidth: 275 }}>
                    <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Welcome Admin " + routeParams.userID + "!"} />
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Button variant="contained" className="left-button" onClick={() => handleSubmit('/customer')}>Customer Data Management</Button>
                        <Button variant="contained" className="middle-button" onClick={() => handleSubmit('/loancard')}>Loan Card Management</Button>
                        <Button variant="contained" className="right-button" onClick={() => handleSubmit('/items')}>Items Master Data</Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}