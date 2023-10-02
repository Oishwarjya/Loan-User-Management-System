import {React, useState, useEffect} from 'react';
import * as CommonUtils from '../../../common/CommonUtils';
import resources from '../../../../resourcemap.config.json';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, TextField, MenuItem, Select, FormHelperText } from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function LoanCardForm(props) {
    const { defaultFormData, resourceName } = props;
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName, {...defaultFormData}));
    const [errors, setErrors] = useState(CommonUtils.initializeOrResetForm(resourceName, {}, {'onlyString': true}));
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [options, setOptions] = useState({
        "loanStatus": defaultFormData.loanStatus==="PENDING"?["PENDING","ACTIVE","TERMINATED"]: defaultFormData.loanStatus==="ACTIVE"?["ACTIVE", "CLOSED", "TERMINATED"]: [defaultFormData.loanStatus]
    });

    useEffect(() => {
        var temp= {}
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => temp[field.Name] = {...field});
            if(defaultFormData.loanStatus != "PENDING") {
                temp.issueDate.Mutable = false;
            }
            if(defaultFormData.loanStatus === "TERMINATED") {
                Object.keys(temp).forEach((key) => {
                    temp[key].Mutable = false;
                });
                setBtnDisabled(true);
            }
            setResourceObject({"resource": {...temp}});
        }
    }, []);

    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    const getDate = (e) => {
        if(!e) {
            return "";
        }
        let yyyy = e.$y.toString();
        let mm = (e.$M+1).toString().length==1?("0"+(e.$M+1).toString()):(e.$M+1).toString();
        let dd = (e.$D).toString().length==1?("0"+(e.$D).toString()):(e.$D).toString();
        return yyyy+"-"+mm+"-"+dd;
    }

    const handleDateChange = (e, name) => {
        setFormData({
            ...formData,
            [name]: getDate(e)
        });
    }

    const isFormDataValid = (loanStatus) => {
        const userID_REGEX = new RegExp(/^[a-z]\d{6}$/i);
        var retVal=true;
        var errObj = CommonUtils.initializeOrResetForm(resourceName, {}, { 'onlyString': true});
        Object.keys(formData).forEach((key) => {
          if(key=="userID") {
            if(!formData.userID) {
              errObj.userID = "User ID is required";
              retVal=false;
            } else if(!userID_REGEX.test(formData.userID)) {
              errObj.userID = "User ID must be an alphabet followed by 6 digits";
              retVal = false;
            } else errObj.userID="";
          } else if(loanStatus === "ACTIVE" || loanStatus === "COMPLETED" || (key != "loanDuration" && key != "issueDate")) {
            
            if(key === "loanDuration" && formData.loanDuration < 1) {
                errObj.loanDuration = "Loan Duration must be more than 0";
                retVal = false;
            } else if(!formData[key]) {
              errObj[key] = resourceObject.resource[key].DisplayName + " is required"; 
              retVal=false;
            } else errObj[key]="";
          }
        });
        setErrors({...errObj});
        return retVal;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormDataValid(formData.loanStatus)) {
            setErrors(CommonUtils.initializeOrResetForm(resourceName, {}, { 'onlyString': true}));
            props.updateData(formData);
        } else {
            
        }
    };

    return(
        <>
            <div style={{   
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
            {
                Object.values(resourceObject.resource).map((field, index) => {
                    if(field.Type=="text") {
                        return(
                            <FormControl key={index} sx={{ m: 1, width: '25ch'}} variant="outlined">
                            <TextField 
                                variant="outlined"
                                label={field.DisplayName}
                                name={field.Name}
                                value={formData[field.Name]}
                                onChange={handleInputChange}
                                disabled={!field.Mutable}
                                error={errors[field.Name]!=""} 
                                helperText={errors[field.Name]}
                                />
                            </FormControl>
                        );
                    } else if(field.Type=="list" || field.Type=="staticlist") {
                        return (
                            <FormControl key={index} sx={{ m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor={field.Name}>{field.DisplayName}</InputLabel>
                            <Select
                            label={field.DisplayName}
                            value={formData[field.Name]}
                            name={field.Name}
                            disabled={!field.Mutable}
                            onChange={handleInputChange}
                            error={errors[field.Name]!=""} 
                        >
                                {options[field.Name].map((option, index) => {
                                    return (<MenuItem value={option} key={index}>{option}</MenuItem>);

                                })}
                            </Select>
                            <FormHelperText>
                                {errors[field.Name]}
                            </FormHelperText>
                        </FormControl>
                        );
                    } else if(field.Type == "date") {
                        return (
                            <FormControl key={index} sx={{ m: 1, width: '25ch'}} variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DateField
                                    label={field.DisplayName}
                                    onChange={(e) => {handleDateChange(e, field.Name)}}
                                    error={errors[field.Name]!=""} 
                                    helperText={errors[field.Name]}
                                    name={field.Name}
                                    disabled={!field.Mutable}        
                                    value={dayjs(formData[field.Name])}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
    
                        );
                    } else if(field.Type == "number") {
                        return (
                            <FormControl key={index} sx={{ m: 1, width: '25ch'}} variant="outlined">
                            <TextField 
                                variant="outlined"
                                label={field.DisplayName}
                                name={field.Name}
                                type="number"
                                value={formData[field.Name]}
                                onChange={handleInputChange}
                                disabled={!field.Mutable}
                                error={errors[field.Name]!=""} 
                                helperText={errors[field.Name]}
                                />
                            </FormControl>

                        );
                    }
                })
            }
          </div>
          <div style={{   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
          <Button disabled={btnDisabled} onClick={handleSubmit} variant="contained" className="signUpButton">Update Loan</Button>
          </div>
        </>
    );
}