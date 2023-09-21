import {React, useState, useEffect} from 'react';
import * as CommonUtils from '../../../common/CommonUtils';
import * as API from '../../../services/ApiRequestService';
import resources from '../../../../resourcemap.config.json';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, TextField, MenuItem, Select } from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function LoanCardForm(props) {
    const { defaultFormData, resourceName } = props;
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName, {...defaultFormData}));
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [options, setOptions] = useState({
        "loanStatus": defaultFormData.loanStatus==="PENDING"?["PENDING","ACTIVE","TERMINATED"]: defaultFormData.loanStatus==="ACTIVE"?["ACTIVE", "CLOSED", "TERMINATED"]: [defaultFormData.loanStatus]
    });

    useEffect(() => {
        var temp= {}
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => temp[field.Name] = {...field});
            setResourceObject({"resource": {...temp}});
            console.log(defaultFormData);
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
        console.log(e);
        console.log(name);
        setFormData({
            ...formData,
            [name]: getDate(e)
        });
    }

    const handleSubmit = () => {
        if(formData.loanStatus === "ACTIVE") {
            
        }
        console.log(formData);
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
                                // error={errors.userID!=""} 
                                // helperText={errors.userID}
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
                            // onError={handleError}
                            >
                                {options[field.Name].map((option, index) => {
                                    return (<MenuItem value={option} key={index}>{option}</MenuItem>);

                                })}
                            </Select>
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
                                    // helperText={errorData.dob}
                                    // error={errorData.dob!=''}
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
                                // error={errors.userID!=""} 
                                // helperText={errors.userID}
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
          <Button onClick={handleSubmit} variant="contained" className="signUpButton">Update Loan</Button>
          </div>
        </>
    );
}