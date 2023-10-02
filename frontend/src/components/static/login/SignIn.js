import { React, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as CommonUtils from '../../common/CommonUtils';
import * as API from '../../services/ApiRequestService';
import './loginStyles.css';

export default function SignIn() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userID: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        userID: "",
        password: ""
    });
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });

    const handleClickShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((show) => !show)
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const isFormDataValid = () => {
      const userID_REGEX = new RegExp(/^[a-z]\d{6}$/i);
      var retVal=true;
      var errObj = {
        userID: "",
        password: ""
      };
      Object.keys(formData).forEach((key) => {
        if(key=="userID") {
          if(!formData.userID) {
            errObj.userID = "User ID is required";
            retVal=false;
          } else if(!userID_REGEX.test(formData.userID)) {
            errObj.userID = "User ID must be an alphabet followed by 6 digits";
            retVal = false;
          } else errObj.userID="";
        }
        if(key=="password") {
          if(!formData.password) {
            errObj.password = "Password is required";
            retVal=false;
          } else if(formData.password.length<8) {
            errObj.password = "Minimum length of password must be 8";
            retVal=false;
          } else errObj.password="";
        }
      });
      setErrors({...errObj});
      return retVal;
  };

    const handleSubmit = e => {
        e.preventDefault();
        if(isFormDataValid()) {
            setErrors({
                userID: "",
                password: ""
            });
            API.post("/api/login",{
              "userID":formData.userID,
              "password": formData.password
            })
            .then((res) => {
              if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                if(res.data.role == "user") navigate("/user/"+formData.userID);
                else if(res.data.role == "admin") navigate("/admin/"+formData.userID);
            } else {
                popupProps.current = {
                  "title": "Error!",
                  "message": "Unable to login: " + res.data.message,
                  "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);  
              }
            })
            .catch(err => { 
              popupProps.current = {
                  "title": "Error!",
                  "message": "Unable to login",
                  "handleAlertClose": () => { setOpenErrorPopup(false);}
              };   
              setOpenErrorPopup(true); 
            });        
          } else {
        };
    }

  return (
    <div className='card-div'>
    <Card className='signInCard' sx={{ minWidth: 275 }}>
      <CardHeader className="signin-signup-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title="Sign In" />
      <CardContent>
        <div>
        <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
            <TextField 
                variant="outlined"
                label="User ID"
                name="userID"
                value={formData.userID}
                onChange={handleInputChange}
                error={errors.userID!=""} 
                helperText={errors.userID}
            />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="signInPassword"
            name="password"
            value={formData.password}
            onChange={handleInputChange}     
            type="password"
            // type={showPassword ? 'text' : 'password'}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleClickShowPassword}
            //       onMouseDown={handleMouseDownPassword}
            //       edge="end"
            //     >
            //       {showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            //   </InputAdornment>
            // }
            error={errors.password!=""}
            label="Password"
          />
            {errors.password!="" && (
                <FormHelperText error>
                {errors.password}
                </FormHelperText>
            )}

        </FormControl>
      </div>
      </CardContent>
      <CardActions style={{   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
      <Button variant="contained" className="signInButton" onClick={handleSubmit}>Sign In</Button>
      </CardActions>
    </Card>
    {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
    {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}

    </div>
  );
}
