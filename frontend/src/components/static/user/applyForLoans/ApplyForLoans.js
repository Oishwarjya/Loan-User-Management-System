import {useEffect, useState, React, useReducer} from "react";
import { useParams, useNavigate } from "react-router-dom";
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from "../../../common/CommonUtils";
import * as API from '../../../services/ApiRequestService';
import './ApplyForLoans.css';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, TextField, MenuItem, Select } from '@mui/material';


export default function ApplyForLoans() {
    let navigate = useNavigate();
    const resourceName = "applyLoans";
    const {userID} = useParams();
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName, {"userID": userID, "itemCategory": "Furniture", "itemMake": "Wooden", "itemDescription": "Chair"}));
    const [options, setOptions] = useState({"itemCategory": [], "itemMake": [], "itemDescription": []});
    const [resourceObject, setResourceObject] = useState({"resource": {}});

    useEffect(() => {
        var temp= {}
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => temp[field.Name] = {...field});
            temp["itemCategory"].Options = ["Furniture", "Stationary"];
            temp["itemMake"].Options = ["Wooden", "Steel", "Cotton"];
            temp["itemDescription"].Options = ["Chair","Table"];
            setOptions({
                "itemCategory": ["Furniture", "Stationary"],
                "itemMake": ["Wooden", "Steel", "Cotton"],
                "itemDescription": ["Chair","Table"]
            })
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

    const handleSelectChange = async (e) => {
        const {name, value} = e.target;
        var changes = { [name]: value};
        var tempOptions = [];
        if(name=="itemCategory") tempOptions = value=="Furniture"?["Wooden", "Steel", "Cotton"]:["Reynolds", "Faber Castle"];
        if(name=="itemMake") tempOptions = value=="Wooden"?["Chair", "Table"]: value=="Steel"?["Bed","Curtain Rod"]:value=="Reynolds"?["Pen","Pencil"]:["Crayons", "Pencil"];
        var tempName = name=="itemCategory"?"itemMake":name=="itemMake"?"itemDescription":"";
        if(tempName!==""){
           changes[tempName] = tempOptions[0];
           setOptions((prev) => {
            return({
            ...prev,
            [tempName]:tempOptions})
            }); 
            setFormData((prev) => {return({...prev, ...changes})});
            await handleSelectChange({"target": {"name": tempName, "value": tempOptions[0]}});
        } else setFormData((prev) => {return({...prev, ...changes})});
        

    }

    const handleSubmit = () => {
        console.log(formData);
        API.post("/api/loan", formData).then((res) => {
            console.log(res);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                window.alert("Loan worth "+res.data.itemValue + " has been applied for");
                navigate('/user/'+userID);
            } else {
                window.alert("Unable to process application " + res.data.message);
            }
        }).catch(err => window.alert(err));
    }

    return (
    <>
        <div className='apply-for-loans-card-div'>
        <Card className='apply-for-loans-card' sx={{ minWidth: 275 }}>
          <CardHeader className="apply-for-loans-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title="Select Product and Apply for Loan" />
          <CardContent>
            <div>
                {/* <p> {Object.values(resourceObject.resource).length} </p> */}
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
                    } else if(field.Type=="list") {
                        return (
                            <FormControl key={index} sx={{ m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor={field.Name}>{field.DisplayName}</InputLabel>
                            <Select
                            label={field.DisplayName}
                            value={formData[field.Name]}
                            name={field.Name}
                            disabled={!field.Mutable}
                            onChange={handleSelectChange}
                            // onError={handleError}
                            >
                                {options[field.Name].map((option, index) => {
                                    return (<MenuItem value={option} key={index}>{option}</MenuItem>);

                                })}
                            </Select>
                        </FormControl>
                        );
                    }
                })
            }
          </div>
          </CardContent>
          <CardActions style={{   
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
          <Button onClick={(e) => { e.preventDefault(); handleSubmit() }} variant="contained" className="apply-for-loans-button">Apply</Button>
          </CardActions>
        </Card>
        </div>        
    </>
    );
}