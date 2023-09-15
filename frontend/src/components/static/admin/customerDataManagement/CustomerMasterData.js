import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { React, useEffect, useState } from 'react';
import CustomerData from './CustomerDataManagement';
import * as API from '../../../services/ApiRequestService';

function createData(userId, name, designation, department, gender, dob, doj) {
    return {userId, name, designation, department, gender, dob, doj};
}

const onBoardedData = [
    createData("k123456", "John Doe", "Manager", "Finance", "Male", "1995-08-14", "2020-01-12")
]

const newEmployeeData = [
    createData("k123478", "", "", "", "", "", "")
]

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
            items.push(list[key]);
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

export default function CustomerMasterData() {
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [props, setProps] = useState({
        userId: "",
        name: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        gender: ""
    });

    const getOnboardedEmployees = () => {
        console.log("Getting all the onboarded employees!!");
    }

    const getNonOnboardedEmployees = () => {
        console.log("Getting all the non onboarded employees!!");
    }

    useEffect(() => {
        getOnboardedEmployees();
        getNonOnboardedEmployees();
    }, [open, openDeleteDialog]);

    const startOnboarding = (e, row) => {
        let propObj = {
            userId: row.userId,
            name: row.name,
            designation: row.designation,
            department: row.department,
            dob: row.dob,
            doj: row.doj,
            gender: row.gender
        }
        setProps(propObj);
        setOpen(true);
    }
    const onEdit = (e, row) => {
        let propObj = {
            userId: row.userId,
            name: row.name,
            designation: row.designation,
            department: row.department,
            dob: row.dob,
            doj: row.doj,
            gender: row.gender
        }
        setProps(propObj);
        setOpen(true);
    }
    const onDelete = () => {
        setOpenDeleteDialog(true);
    }
    const handleDialogClose = () => {
        setOpen(false);
    }
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    }
    const onDeleteConfirmation = () => {
        console.log("Delete the User confirmed");
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
                                    {
                                    onBoardedData.map((row) => (
                                        <TableRow key={row.userId}>
                                            <TableCellsFromList list={row} />
                                            <TableCell>
                                                <div className='tCellData'>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {onEdit(e, row)}}>Edit</Button>
                                                    <Button 
                                                    variant="text"
                                                    onClick={onDelete}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
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
                                        <TableCellsFromList list={headerFields} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    newEmployeeData.map((row) => (
                                        <TableRow key={row.userId}>
                                            <TableCellsFromList list={row} />
                                            <TableCell>
                                                <div className='tCellData'>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {startOnboarding(e, row)}}>Onboard</Button>
                                                    <Button 
                                                    variant="text"
                                                    onClick={onDelete}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogContent>
                    <CustomerData userId_prop={props.userId} name_prop={props.name} designation_prop={props.designation} department_prop={props.department} dob_prop={props.dob} doj_prop={props.doj} gender_prop={props.gender} />
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