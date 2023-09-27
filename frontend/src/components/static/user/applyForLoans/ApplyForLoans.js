import {useEffect, useState, React, useRef} from "react";
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
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName, {"userID": userID}));
    const options = useRef({"itemCategory": [], "itemMake": [], "itemDescription": []});
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [itemCategoryOptions, setItemCategoryOptions] = useState([]);
    const [itemMakeOptions, setItemMakeOptions] = useState([]);
    const [itemDescOptions, setItemDescOptions] = useState([]);
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });

    useEffect(() => {
        var temp= {}
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => temp[field.Name] = {...field});
            setResourceObject({"resource": {...temp}});
            API.get("/api/itemCategories").then(async (res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    options.current = {
                        ...options.current,
                        itemCategory: res.data.data
                    };
                    await handleSelectChange({
                        "target": {
                            "name": "itemCategory", 
                            "value": res.data.data[0],
                            "itemCategory": res.data.data[0]
                        }
                    });
                } else {
                    popupProps.current = {
                        "title": "Error!",
                        "message": "Unable to fetch item categories",
                        "handleAlertClose": () => { setOpenErrorPopup(false);}
                    };   
                    setOpenErrorPopup(true); 

                }
            }).catch((err) => { 
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch item categories",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
        });
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
        if(name=="itemCategory") { 
            API.get("/api/itemMakes/"+value.replace(" ", "%20")).then(async (res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    options.current = {
                        ...options.current,
                        itemMake: res.data.data
                    };
                    await handleSelectChange({
                        "target": {
                            "name": "itemMake", 
                            "value": res.data.data[0],
                            "itemCategory": e.target.hasOwnProperty('itemCategory')?e.target.itemCategory:value,
                            "itemMake": res.data.data[0]
                        }
                    });
                }
            });
        } else if(name == "itemMake") {
            var category = e.target.hasOwnProperty("itemCategory")?e.target.itemCategory:formData.itemCategory;
            API.get("/api/itemDescriptions/"+category.replace(" ", "%20")+"/"+value.replace(" ","%20")).then(async (res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    options.current = {
                        ...options.current,
                        itemDescription: res.data.data
                    };
                    await handleSelectChange({
                        "target": {
                            "name": "itemDescription", 
                            "value": res.data.data[0],
                            "itemCategory": e.target.hasOwnProperty('itemCategory')?e.target.itemCategory:formData.itemCategory,
                            "itemMake": e.target.hasOwnProperty('itemMake')?e.target.itemMake:value,
                            "itemDescription": res.data.data[0]
                        }
                    });
                }
            });
        } else if(name == "itemDescription") {
            var category = e.target.hasOwnProperty("itemCategory")?e.target.itemCategory:formData.itemCategory;
            var make = e.target.hasOwnProperty("itemMake")?e.target.itemMake:formData.itemMake;
            setItemCategoryOptions([...options.current.itemCategory]);
            setItemMakeOptions([...options.current.itemMake]);
            setItemDescOptions([...options.current.itemDescription]);
            setFormData((prev) => {
                return ({
                    ...prev,
                    itemCategory: category,
                    itemMake: make,
                    itemDescription: value
                })
            });
        }

    }

    const handleSubmit = () => {
        API.post("/api/loan", formData).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Application Successful!",
                    "message": "Loan worth INR "+res.data.itemValue + " has been applied for",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); navigate('/user/'+userID); }
                };
                setOpenSuccessPopup(true);
                
            } else {
                    popupProps.current = {
                        "title": "Application Failed!",
                        "message": "Unable to process application " + res.data.message,
                        "handleAlertClose": () => { setOpenErrorPopup(false);}
                    };   
                    setOpenErrorPopup(true); 
            }
        }).catch(err => { 
            popupProps.current = {
                "title": "Application Failed!",
                "message": "Unable to process application ",
                "handleAlertClose": () => { setOpenErrorPopup(false);}
            };   
            setOpenErrorPopup(true); 
        });
    }

    const getOptions = (arr) => {
        return arr.map((option, index) => {
            return (<MenuItem value={option} key={index}>{option}</MenuItem>);
        });
    }
    return (
    <>
        <div className='apply-for-loans-card-div'>
        <Card className='apply-for-loans-card' sx={{ minWidth: 275 }}>
          <CardHeader className="apply-for-loans-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title="Select Product and Apply for Loan" />
          <CardContent>
            <div>
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
                            >
                                {
                                    field.Name==="itemCategory"?getOptions(itemCategoryOptions):(field.Name==="itemMake")?getOptions(itemMakeOptions):getOptions(itemDescOptions)
                                }
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
            {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
            {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}
        </div>        
    </>
    );
}