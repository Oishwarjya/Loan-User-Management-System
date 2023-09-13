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
        <div className='card-container'>
            <div className='card-div'>
                <Card className='left-card' sx={{ minWidth: 275 }}>
                    <CardHeader className="admin-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Customer Data Management"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to add, edit and delete user biodata from the application...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="left-button" onClick={() => handleSubmit('/customer')}>Customer Data Management</Button>
                    </CardActions>
                </Card>
            </div>
            <div className='card-div'>
                <Card className='middle-card' sx={{ minWidth: 275 }}>
                    <CardHeader className="admin-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Loan Card Data Management"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to add, edit and delete loan cards from the application...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="middle-button" onClick={() => handleSubmit('/loancard')}>Loan Card Management</Button>
                    </CardActions>
                </Card>
            </div>
            <div className='card-div'>
                <Card className='right-card' sx={{ minWidth: 275 }}>
                    <CardHeader className="admin-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Items Master Data Management"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to add, edit and delete items data from the application...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="right-button" onClick={() => handleSubmit('/items')}>Items Master Data Management</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
        </>
    );
}