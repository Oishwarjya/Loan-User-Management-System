import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { React, useEffect, useState, useRef } from 'react';
import CustomerData from './CustomerDataManagement';
import * as API from '../../../services/ApiRequestService';
import * as CommonUtils from '../../../common/CommonUtils';
import dayjs from 'dayjs';
import { subscribe } from '../../../services/EventService';

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
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });
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

    const callErrPopup = (title, message) => {
        popupProps.current = {
            "title": title,
            "message": message,
            "handleAlertClose": () => { setOpenErrorPopup(false);}
        };   
        setOpenErrorPopup(true); 
    }

    const callSuccessPopup = (title, message) => {
        popupProps.current = {
            "title": title,
            "message": message,
            "handleAlertClose": () => { setOpenSuccessPopup(false); }
        };
        setOpenSuccessPopup(true);
    }

    const getOnboardedEmployees = () => {
        let endpoint_for_onboarded_employees = "/api/employees";
        API.get(endpoint_for_onboarded_employees)
            .then((res) => {
                if(res.status>=200 && res.status < 300) {
                    setOnBoardedData(res.data.data);
                } else{
                    callErrPopup("Error!", res.data.message);
                }
            })
            .catch((err) => {
                callErrPopup("Error!", "Unable to get Employees");
            });
    }

    const getNonOnboardedEmployees = () => {
        let endpoint_for_non_onboarded_employees = "/api/employees/onboard";
        API.get(endpoint_for_non_onboarded_employees)
            .then((res) => {
                if(res.status>=200 && res.status < 300) {
                    setNewEmployeeData(getArrayOfValuesFromObj(res.data.data));
                } else{
                    callErrPopup("Error!", res.data.message);
                }
            })
            .catch((err) => {
                callErrPopup("Error!", "Unable to get Users");
            });
    }

    const deleteEmployee = async (userID) => {
        let endpoint_for_deleting_employee = "/api/employee/"+userID;
        API.del(endpoint_for_deleting_employee)
            .then((res) => {
                if(res.status>=200 && res.status<300) {
                    callSuccessPopup("Success!", "Employee Deleted Successfully");
                } 
                else {
                    callErrPopup("Error!", res.data.message);
                }
            })
            .catch((err) => {
                callErrPopup("Error!", "Unable to Delete Employee");
            });
    }

    const deleteUser = async (userID) => {
        let endpoint_for_deleting_employee = "/api/user/"+userID;
        API.del(endpoint_for_deleting_employee)
            .then((res) => {
                if(res.status>=200 && res.status<300) {
                    callSuccessPopup("Success!", "User Deleted Successfully");
                } 
                else {
                    callErrPopup("Error!", res.data.message);
                }
            })
            .catch((err) => {
                callErrPopup("Error!", "Unable to Delete Employee");
            });
    }

    const onEmpCompleteForm = (e) => {
        setOpen(false);
        callSuccessPopup(e.detail.title, e.detail.message);
    }

    const onErrorEmpForm = (e) => {
        setOpen(false);
        callErrPopup(e.detail.title, e.detail.message);
    }

    useEffect(() => {
        subscribe("closeEmpForm", onEmpCompleteForm);
        subscribe("error", onErrorEmpForm);
        getOnboardedEmployees();
        getNonOnboardedEmployees();
    }, [open, openDeleteDialog, openSuccessPopup, openErrorPopup]);

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
        setProps(propObj);
        setOpen(true);
    }
    const onDelete = (e, row) => {
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
        if(focusedData.name){
            await deleteEmployee(focusedData.userID);
            handleDeleteDialogClose();
        }
        else {
            await deleteUser(focusedData.userID);
            handleDeleteDialogClose();
        }
        resetPage();
    }
    const resetPage = () => {
        setFocusedData();
        setOpen(false);
        setOpenDeleteDialog(false);
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
            {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
            {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}
        </>
    );
}