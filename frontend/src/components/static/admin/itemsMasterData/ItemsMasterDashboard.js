import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import './adminStyles.css';

export default function ItemsMasterDashboard() {
    let navigate = useNavigate();
    const routeParams = useParams();

    const handleSubmit = (path) => {
        navigate('/admin/'+routeParams.userID+path);
    }
    return(
        <>
            <div className='card-container'>
            <div className='card-div'>
                <Card className='left-card' sx={{ minWidth: 265 }}>
                    <CardHeader className="admin-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Add Item to Inventory"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to add new Items to the Inventory of the application...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="left-button" onClick={() => handleSubmit('/addItem')}>Add Item to Inventory</Button>
                    </CardActions>
                </Card>
            </div>
            <div className='card-div'>
                <Card className='middle-card' sx={{ minWidth: 265 }}>
                    <CardHeader className="admin-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title={"Edit / Delete  Item details"} />
                    <CardContent>
                        <Typography style={{color:'white', textAlign:'center'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Screen to edit and delete Items from the application's Inventory...
                        </Typography>
                    </CardContent>
                    <CardActions style={{   
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <Button variant="contained" className="middle-button" onClick={() => handleSubmit('/editItem')}>Edit / Delete Items in Inventory</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
        </>
        
    );
}