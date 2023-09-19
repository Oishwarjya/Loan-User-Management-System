import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { React, useEffect, useState } from 'react';
import CustomerData from './CustomerDataManagement';
import * as API from '../../../services/ApiRequestService';
import dayjs from 'dayjs';

// function createData(userID, name, designation, department, gender, dob, doj) {
//     return {userID, name, designation, department, gender, dob, doj};
// }

// let onBoardedData = [
//     createData("k123457", "John Doe", "Manager", "Finance", "Male", "1995-08-14", "2020-01-12")
// ]

// let newEmployeeData = [
//     createData("k123459", "", "", "", "", "", "")
// ]

const headerFields = [
    "Employee Id",
    "Employee Name",
    "Designation",
    "Department",
    "Gender",
    "Date of Birth",
    "Date of Joining",
    "Actions"
];

const headerFieldsFoNewEmployees = [
    "Employee Id",
    "Actions"
]

function TableToolbar(props) {
    const { tableName } = props;
    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }}
            variant='h6'
            id="tableTitle"
            component="div">
                {tableName}
            </Typography>
        </Toolbar>
    )
}

function TableCellsFromList(props) {
    const { list } = props;
    let items=[];
    if(typeof list=="object") {
        for(let key in list){
            if(list[key].indexOf('+')>-1) {
                items.push(dayjs(list[key]).format("YYYY-MM-DD"))
            } else {
                items.push(list[key]);
            }
        }
    } else {
        for(let item in list) {
            if(item.indexOf('+')>-1) {
                items.push(dayjs(item).format("YYYY-MM-DD"))
            } else {
                items.push(item);
            }
        }
    }
    return (
        <>
            {
                items.map((item, ind) => (
                    <TableCell key={ind}><span className='tCellData'>{item}</span></TableCell>
                ))
            }
        </>
    )
}

function getArrayOfValuesFromObj(obj) {
    let arr = [];
    for(let key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

export default function CustomerMasterData() {
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [onBoardedData, setOnBoardedData] = useState([]);
    const [newEmployeeData, setNewEmployeeData] = useState([]);
    const [focusedData, setFocusedData] = useState();
    const [props, setProps] = useState({
        userID: "",
        name: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        gender: "",
        isUpdate: false
    });

    const getOnboardedEmployees = async () => {
        console.log("Getting all the onboarded employees!!");
        let endpoint_for_onboarded_employees = "/api/employees";
        API.get(endpoint_for_onboarded_employees)
            .then((res) => {
                // console.log("Onboarded employees: ",res);
                if(res.hasOwnProperty('status')) {
                    if(res.status>=200 && res.status < 300) {
                        console.log("Onboarded Data: ",res.data.data);
                        // onBoardedData = res.data;
                        setOnBoardedData(res.data.data);
                        // console.log(onBoardedData);
                    } else window.alert("Error " + res.data.message);
                } else {
                  window.alert("Unable to get the onboarded employees");
                  console.log(res.data);
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

    const getNonOnboardedEmployees = () => {
        console.log("Getting all the non onboarded employees!!");
        let endpoint_for_non_onboarded_employees = "/api/employees/onboard";
        API.get(endpoint_for_non_onboarded_employees)
            .then((res) => {
                // console.log("Onboarded employees: ",res);
                if(res.hasOwnProperty('status')) {
                    if(res.status>=200 && res.status < 300) {
                        console.log("Non onboarded Data: ",res.data);
                        // newEmployeeData = res.data
                        console.log(getArrayOfValuesFromObj(res.data.data));
                        setNewEmployeeData(getArrayOfValuesFromObj(res.data.data));
                    } else window.alert("Error " + res.data.message);
                } else {
                  window.alert("Unable to get the non onboarded employees");
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

    const deleteEmployee = async (userID) => {
        let endpoint_for_deleting_employee = "/api/employee/"+userID;
        API.del(endpoint_for_deleting_employee)
            .then((res) => {
                console.log("For deleting employees: ",res);
                if(res.hasOwnProperty('status')) {
                    if(res.status>=200 && res.status<300) {
                        handleDeleteDialogClose();
                    } 
                    else {
                        window.alert("Error " + res.data.message);
                    }
                } else {
                    window.alert("Unable to delete the user");
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

    const deleteUser = async (userID) => {
        let endpoint_for_deleting_employee = "/api/user/"+userID;
        API.del(endpoint_for_deleting_employee)
            .then((res) => {
                console.log("For deleting employees: ",res);
                if(res.hasOwnProperty('status')) {
                    if(res.status>=200 && res.status<300) {
                        handleDeleteDialogClose();
                    } 
                    else {
                        window.alert("Error " + res.data.message);
                    }
                } else {
                    window.alert("Unable to delete the user");
                }
            })
            .catch((err) => {
                window.alert(err);
            });
    }

    useEffect(() => {
        getOnboardedEmployees();
        getNonOnboardedEmployees();
    }, [open, openDeleteDialog]);

    const startOnboarding = (e, row) => {
        let propObj = {
            userID: row.userID,
            name: row.name,
            designation: row.designation,
            department: row.department,
            dob: (row.dob)?dayjs(row.dob).format("YYYY-MM-DD"):"",
            doj: (row.doj)?dayjs(row.doj).format("YYYY-MM-DD"):"",
            gender: row.gender,
            isUpdate: false
        }
        setProps(propObj);
        setOpen(true);
    }
    const onEdit = (e, row) => {
        let propObj = {
            userID: row.userID,
            name: row.name,
            designation: row.designation,
            department: row.department,
            dob: dayjs(row.dob).format("YYYY-MM-DD"),
            doj: dayjs(row.doj).format("YYYY-MM-DD"),
            gender: row.gender,
            isUpdate: true
        }
        console.log("Props object: ",propObj);
        setProps(propObj);
        setOpen(true);
    }
    const onDelete = (e, row) => {
        setFocusedData(row);
        setOpenDeleteDialog(true);
    }
    const onDeleteUser = (e, row) => {
        setFocusedData(row);
        setOpenDeleteDialog(true);
    }
    const handleDialogClose = () => {
        setOpen(false);
    }
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    }
    const onDeleteConfirmation = async () => {
        console.log("Delete the User confirmed");
        if(focusedData.name){
            await deleteEmployee(focusedData.userID);
        }
        else {
            await deleteUser(focusedData.userID);
        }
        handleDeleteDialogClose();
    }
    return (
        <>
            <div className='table-container'>
                <Box>
                    <Paper>
                        <TableToolbar tableName="Employees" />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCellsFromList list={headerFields} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(onBoardedData && onBoardedData.length)?
                                    onBoardedData.map((row) => (
                                        <TableRow key={row.userID}>
                                            <TableCellsFromList list={row} />
                                            <TableCell>
                                                <div className='tCellData'>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {onEdit(e, row)}}>Edit</Button>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {onDelete(e, row)}}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )):(<></>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                <Box>
                    <Paper>
                        <TableToolbar tableName="To be Onboarded Employees" />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCellsFromList list={headerFieldsFoNewEmployees} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(newEmployeeData && newEmployeeData.length)?
                                    newEmployeeData.map((row) => (
                                        <TableRow key={row.userID}>
                                            <TableCellsFromList list={row} />
                                            <TableCell>
                                                <div className='tCellData'>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {startOnboarding(e, row)}}>Onboard</Button>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {onDeleteUser(e, row)}}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )):(<></>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogContent>
                    <CustomerData userID_prop={props.userID} name_prop={props.name} designation_prop={props.designation} department_prop={props.department} dob_prop={props.dob} doj_prop={props.doj} gender_prop={props.gender} for_update_prop={props.isUpdate}/>
                </DialogContent>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>No</Button>
                    <Button onClick={onDeleteConfirmation}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}