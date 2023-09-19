import { React, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './styles.css';
import data from '../../../../resourcemap.config.json';
import * as API from '../../../services/ApiRequestService';
import dayjs from 'dayjs';

export default function CustomerData(props) {
    const { userID_prop, name_prop, designation_prop, department_prop, dob_prop, doj_prop, gender_prop, for_update_prop } = props;
    const { userID } = useParams();
    var navigate = useNavigate();

    const [formData, setFormData] = useState({
        userID: (userID_prop)?userID_prop:"",
        name: (name_prop)?name_prop:"",
        designation: (designation_prop)?designation_prop:data.employees.fields[2].Options[0],
        department: (department_prop)?department_prop:data.employees.fields[3].Options[0],
        dob: (dob_prop)?dob_prop:"",
        doj: (doj_prop)?doj_prop:"",
        gender: (gender_prop)?gender_prop:data.employees.fields[4].Options[0]
    });
    const [errorData, setErrorData] = useState({
        userID: "",
        name: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        gender: ""
    });
    let errCommonObj = {
        userID: "",
        name: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        gender: ""
    };
    const emptyErrorMsg = "Field can't be empty";
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };
    const getDate = (e) => {
        if(!e) {
            return "";
        }
        let yyyy = e.$y.toString();
        let mm = (e.$M+1).toString().length==1?("0"+(e.$M+1).toString()):(e.$M+1).toString();
        let dd = (e.$D).toString().length==1?("0"+(e.$D).toString()):(e.$D).toString();
        return yyyy+"-"+mm+"-"+dd;
    }
    const handleDobChange = (e) => {
        setFormData({
            ...formData,
            ["dob"]: getDate(e)
        });
    }
    const handleDojChange = (e) => {
        setFormData({
            ...formData,
            ["doj"]: getDate(e)
        });
    }

    const handleError = (err) => {
        window.alert(err);
    };
    const isuserIDValid = (emp) => {
        const UID_REGEX = new RegExp(/^[a-z]\d{6}$/i);
        if(!emp){
            return emptyErrorMsg;
        }
        else if(!UID_REGEX.test(emp)) {
            return "User ID must be an alphabet followed by 6 digits";
        }
        return "valid";
    }
    const isnameValid = (name) => {
        if(!name){
            return emptyErrorMsg;
        }
        else if(name.length<5) {
            return "Employee Name should be greater than 5 characters";
        }
        else {
            return "valid";
        }
    }
    const isDesignationValid = (designation) => {
        if(!designation) {
            return emptyErrorMsg;
        }
        else if(data.employees.fields[2].Options.includes(designation)) {
            return "valid";
        }
        return designation + " is not in the database"
    }
    const isDepartmentValid = (dept) => {
        if(!dept) {
            return emptyErrorMsg;
        }
        else if(data.employees.fields[3].Options.includes(dept)) {
            return "valid";
        }
        return dept + " is not in the database";
    }
    const isGenderValid = (gender) => {
        if(!gender) {
            return emptyErrorMsg;
        }
        else if(data.employees.fields[4].Options.includes(gender)) {
            return "valid";
        }
        return gender + " is not in the database";
    }
    const changeErrorData = (name, value) => {
        // let errObj = errorData;
        // errObj[name] = value;
        errCommonObj[name] = value;
        // setErrorData({errObj});
    }
    const areDatesValid = (dob, doj) => {
        let isValid = true;
        //for dob
        let birthYear = Number(dob.slice(0,4));
        let birthMonth = Number(dob.slice(5,7));
        let birthDate = Number(dob.slice(8, 10));
        //Age should be greater than 18 and less than 100
        let today = new Date();
        let nowYear = today.getFullYear();
        let nowMonth = today.getMonth()+1;
        let nowDate = today.getDate();

        let age = nowYear-birthYear;
        let age_month = nowMonth-birthMonth;
        let age_days = nowDate-birthDate;
        if(age_month<0 || (age_month==0 && age_days<0)) {
            age-=1;
        }
        if(age>100) {
            changeErrorData("dob", "Age cannot be greater than 100.");
            isValid = false;
        }else if(dob && ((age==18 && age_month<=0 && age_days<=0) || age<18)) {
            changeErrorData("dob", "Age should be more than 18 years.");
            isValid = false;
        } else {
            changeErrorData("dob", "");
        }
        //for doj

        let joinYear = Number(doj.slice(0,4));
        let joinMonth = Number(doj.slice(5,7));
        let joinDate = Number(doj.slice(8,10));
        if(joinYear>nowYear || (joinYear==nowYear && joinMonth>nowMonth) || (joinYear==nowYear && joinMonth==nowMonth && joinDate>nowDate)) {
            changeErrorData("doj", "Future Date cannot be added");
            isValid = false;
        }
        else if(doj && (joinYear-birthYear<18 || (joinYear-birthYear==18 && birthMonth>joinMonth) || (joinYear-birthYear==18 && birthMonth==joinMonth && birthDate>joinDate))){
            changeErrorData("doj", "There should be at least 18 years of gap between Date of Birth and Date of Joining.")
            isValid = false;
        } else {
            changeErrorData("doj", "");
        }
        if(!dob) {
            changeErrorData('dob', emptyErrorMsg);
            isValid=false;
        }
        if(!doj) {
            changeErrorData('doj', emptyErrorMsg);
            isValid=false;
        }
        return isValid;
    }
    const areAllFieldsValid = () => {
        let isValid = true;
        let validationText = isuserIDValid(formData.userID);
        if(validationText!="valid") {
            changeErrorData("userID", validationText);
            isValid = false;
        } else {
            changeErrorData("userID", "");
        }
        validationText = isnameValid(formData.name);
        if(validationText!="valid") {
            changeErrorData("name", validationText);
            isValid = false;
        } else {
            changeErrorData("name", "");
        }
        validationText = isDesignationValid(formData.designation);
        if(validationText!="valid") {
            changeErrorData("designation", validationText);
            isValid = false;
        } else {
            changeErrorData("designation", "");
        }
        validationText = isDepartmentValid(formData.department);
        if(validationText!="valid") {
            changeErrorData("department", validationText);
            isValid = false;
        } else {
            changeErrorData("department", "");
        }
        validationText = isGenderValid(formData.gender);
        if( validationText!="valid") {
            changeErrorData("gender", validationText);
            isValid = false;
        } else {
            changeErrorData("gender", "");
        }
        if(!areDatesValid(formData.dob, formData.doj)) {
            isValid = false;
        }
        setErrorData({...errCommonObj});
        return isValid;
    }
    const handleSubmit = (e) => {
        if(areAllFieldsValid()) {
            API.post("/api/employee",{...formData})
              .then((res) => {
                if(res.data.hasOwnProperty('statusCode')) {
                    if(res.data.statusCode>=200 && res.data.statusCode < 300) {
                        window.alert("Employee Added");
                        // navigate('/admin/'+userID);
                    } else window.alert("Error " + res.data.message);
                } else {
                  window.alert("Employee addition failed" );
                }
              })
              .catch(err => { window.alert(err)});
        }
        else {
            console.log(formData);
        }
    }
    const handleUpdate = (e) => {
        if(areAllFieldsValid()) {
            API.put("/api/employees/"+userID_prop, {...formData})
                .then((res) => {
                    if(res.data.hasOwnProperty('statusCode')) {
                        if(res.data.statusCode>=200 && res.data.statusCode<300) {
                            window.alert("Employee Data Updated");
                        } else {
                            window.alert("Error: "+ res.data.message);
                        }
                    } else {
                        window.alert("Employee addition failed");
                    }
                })
                .catch(err => { window.alert(err)});
        }
        else {
            console.log(formData);
        }
    }
    // const getDesignations = () => {
    //     data.employees.fields[2].Options.map((designation, ind)=>{
    //         return (<MenuItem value={designation}>{designation}</MenuItem>);
    //     });
    //     return (<MenuItem value={"designation"}>{"designation"}</MenuItem>);
    // };
    // const getDepartments = () => {
    //     data.employees.fields[3].Options.map((dept, ind)=>{
    //         return (<MenuItem value={dept}>{dept}</MenuItem>);
    //     });
        
    //     return (<MenuItem value={"designation"}>{"designation"}</MenuItem>);
    // };
    // const getGenders = () => {
    //     data.employees.fields[4].Options.map((gender, ind)=>{
    //         return (<MenuItem value={gender}>{gender}</MenuItem>);
    //     });
    //         return (<MenuItem value={"designation"}>{"designation"}</MenuItem>);
    // };

    return (
    <div className='card-div'>
        <Card className='customerData'>
            <CardHeader className="customer-form-card-header" style={{fontFamily:'Montserrat', textAlign:'center'}} title="Add Customer Data" />
            <CardContent className='card-content-container'>
                <div className='field-outer-container'>
                    <FormControl className='field-container'>
                        <TextField
                        variant="outlined"
                        label="Employee Id"
                        name="userID"
                        value={formData.userID}
                        onChange={handleInputChange}
                        error={errorData.userID!=''}
                        helperText={errorData.userID}/>
                    </FormControl>
                    <FormControl>
                        <TextField
                        variant="outlined"
                        label="Employee Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={errorData.name!=''}
                        helperText={errorData.name} />
                    </FormControl>
                </div>
                <div className='field-outer-container'>
                    <FormControl className='field-container'>
                        <InputLabel htmlFor="designation">Designation</InputLabel>
                        <Select
                        label="Designation"
                        defaultValue={formData.designation}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {data.employees.fields[2].Options.map((designation, ind)=>{
                                return (<MenuItem value={designation} key={ind}>{designation}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className='field-container'>
                        <InputLabel htmlFor="department">Department</InputLabel>
                        <Select
                        label="Department"
                        defaultValue={formData.department}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {data.employees.fields[3].Options.map((dept, ind)=>{
                                return (<MenuItem value={dept} key={ind}>{dept}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className='field-container'>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                        label="Gender"
                        defaultValue={formData.gender}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {data.employees.fields[4].Options.map((gender, ind)=>{
                                return (<MenuItem value={gender} key={ind}>{gender}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className='field-outer-container'>
                    <FormControl>
                        {/* <InputLabel htmlFor="dob">Date of Birth</InputLabel> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField
                                label="Date of Birth"
                                onChange={handleDobChange}
                                helperText={errorData.dob}
                                error={errorData.dob!=''}
                                defaultValue={dayjs(formData.dob)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl>
                        {/* <InputLabel htmlFor="doj">Date of Joining</InputLabel> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField
                                label="Date of Joining"
                                onChange={handleDojChange}
                                helperText={errorData.doj}
                                error={errorData.doj!=''}
                                defaultValue={dayjs(formData.doj)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>
            </CardContent>
            <CardActions className="submit-btn-container">
                {(for_update_prop)?
                    (<Button
                    variant="contained"
                    onClick={handleUpdate}>
                        Update Customer Data                        
                    </Button>):
                    (<Button
                        variant="contained"
                        onClick={handleSubmit}>
                            Add Customer Data
                        </Button>)
                }
            </CardActions>
        </Card>
    </div>);
}