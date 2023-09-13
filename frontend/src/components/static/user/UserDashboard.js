import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import './userStyles.css';

export default function UserDashboard() {
    let navigate = useNavigate();
    const routeParams = useParams();

    const handleSubmit = (path) => {
        navigate('/user/'+routeParams.userID+path);
    }

    return (
        <>
        <div className='card-container'>
            <div className='card-div'>
                <Card className='left-user-card' sx={{ minWidth: 275 }}>
                    <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title={"View Loans"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to view all active loans...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="left-button" onClick={() => handleSubmit('/loans')}>View Loans</Button>
                    </CardActions>
                </Card>
            </div>
            <div className='card-div'>
                <Card className='middle-user-card' sx={{ minWidth: 275 }}>
                    <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Apply For Loan"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to fill an application for a loan...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="middle-button" onClick={() => handleSubmit('/apply')}>Apply For Loan</Button>
                    </CardActions>
                </Card>
            </div>
            <div className='card-div'>
                <Card className='right-user-card' sx={{ minWidth: 275 }}>
                    <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title={"View Items Purchased"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to view history of purchased items...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="right-button" onClick={() => handleSubmit('/items')}>View Items Purchased</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
        </>
    );
}