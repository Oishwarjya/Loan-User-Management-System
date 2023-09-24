import {React, useState, useEffect} from 'react';
import * as CommonUtils from '../../../common/CommonUtils';
import * as API from '../../../services/ApiRequestService';
import resources from '../../../../resourcemap.config.json';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, TextField, MenuItem, Select, FormHelperText } from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function ItemsForm(props) {
    const { defaultFormData, resourceName } = props;
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName, {...defaultFormData}));
    const [errors, setErrors] = useState(CommonUtils.initializeOrResetForm(resourceName, {}, {'onlyString': true}));
    const [resourceObject, setResourceObject] = useState({"resource": {}});

    useEffect(() => {
        var temp= {}
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => temp[field.Name] = {...field});
            if(defaultFormData.itemAvailability === "UNAVAILABLE") {
                Object.keys(temp).forEach((key) => {
                    temp[key].Mutable = false;
                });
            }
            if(props.btnLabel === "Add Item"){
                temp.itemAvailability.Mutable = false;
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

    const isFormDataValid = () => {
        var retVal=true;
        var errObj = CommonUtils.initializeOrResetForm(resourceName, {}, { 'onlyString': true});
        Object.keys(formData).forEach((key) => {
            if(key=="itemID") { }
            else if(key=="itemAvailability") {
                if(formData.itemAvailability !== "AVAILABLE" &&
                formData.itemAvailability !== "UNAVAILABLE" &&
                (!formData.itemAvailability.includes("RESERVED FOR"))) {
                 errObj.itemAvailability = "Item status can only be AVAILABLE or UNAVAILABLE or RESERVED FOR <loanID>"
                 retVal = false;
                 } else errObj.itemAvailability = ""; 
            } else if(!formData[key]) {
              errObj[key] = resourceObject.resource[key].DisplayName + " is required"; 
              retVal=false;
            } else errObj[key]="";
        });
        setErrors({...errObj});
        return retVal;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
       if(isFormDataValid()) {
            setErrors(CommonUtils.initializeOrResetForm(resourceName, {}, { 'onlyString': true}));
            props.onSubmit(formData);
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
          <Button onClick={handleSubmit} variant="contained" className="signUpButton">{props.btnLabel}</Button>
          </div>
        </>
    );
}