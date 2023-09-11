import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function CustomerData() {
    const [formData, setFormData] = useState({
        empId: "",
        empName: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        gender: ""
    });
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };
    const handleError = (err) => {
        window.alert(err);
        console.log(err);
    };
    const getDesignations = () => {
        return (<MenuItem value={'Manager'}>{'Manager'}</MenuItem>);
    };
    const getDepartments = () => {
        return (<MenuItem value={'Technology'}>{'Technology'}</MenuItem>);
    };
    const getGenders = () => {
        return (<MenuItem value={'M'}>{'Male'}</MenuItem>);
    };
    return (
    <div className='card-div'>
        <Card className='customerData'>
            <CardHeader style={{fontFamily:'Montserrat', textAlign:'center'}} title="Add Customer Data" />
            <CardContent>
                <div>
                    <FormControl>
                        <TextField
                        variant="outlined"
                        label="Employee Id"
                        name="empId"
                        value={formData.empId}
                        onChange={handleInputChange}
                        onError={handleError}/>
                    </FormControl>
                    <FormControl>
                        <TextField
                        variant="outlined"
                        label="Employee Name"
                        name="empName"
                        value={formData.empName}
                        onChange={handleInputChange}
                        onError={handleError}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="designation">Designation</InputLabel>
                        <Select
                        label="Designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {getDesignations}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="department">Department</InputLabel>
                        <Select
                        label="Department"
                        value={formData.department}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {getDepartments}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                        label="Gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        onError={handleError}>
                            {getGenders}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="dob">Date of Birth</InputLabel>
                        
                    </FormControl>
                </div>
            </CardContent>
        </Card>
    </div>);
}