import { React, useState } from 'react';
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
import * as API from '../../services/ApiRequestService';
import './styles.css';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        uID: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        uID: "",
        password: ""
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
        const UID_REGEX = new RegExp(/"[a-z]\d{6}"/);
        var retVal=true;
        if(!formData.uID) {
            setErrors({
                ...errors,
                uID: "User ID is required"
            });
            retVal=false;
        }
        if(formData.password.length<8) {
            setErrors({
                ...errors,
                password: "Minimum password length is 8"
            });
            retVal=false;
        }
        if(!formData.password) {
            setErrors({
                ...errors,
                password: "password is required"
            });
            retVal=false;
        }
        return retVal;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(isFormDataValid()) {
            console.log("All gg");
            setErrors({
                uID: "",
                password: ""
            });
        } else {

        };
    }

  return (
    <div className='card-div'>
    <Card className='signInCard' sx={{ minWidth: 275 }}>
      <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title="Sign In" />
      <CardContent>
        <div>
        <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
            <TextField 
                variant="outlined"
                label="User ID"
                name="uID"
                value={formData.uID}
                onChange={handleInputChange}
                error={errors.uID!=""} 
                helperText={errors.uID}
            />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="signInPassword"
            name="password"
            value={formData.password}
            onChange={handleInputChange}     
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
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
    </div>
  );
}
