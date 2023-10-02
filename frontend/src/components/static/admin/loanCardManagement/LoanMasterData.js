import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';
import LoanCardForm from './LoanCardForm';
import * as API from '../../../services/ApiRequestService';
import dayjs from 'dayjs';

export default function LoanData() {
    const resourceName = "loans";
    const {userID} = useParams();
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName));
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [tableData, setTableData] = useState([]);
    var [headerFields, setHeaderFields] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const loanToDelete = useRef(-1);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });

    const getAllLoans = () => {
        API.get("/api/loans").then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setTableData([...res.data.data]);
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch loans: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);            }
        }).catch((err) => {
            popupProps.current = {
                "title": "Error!",
                "message": "Unable to fetch loans",
                "handleAlertClose": () => { setOpenErrorPopup(false);}
            };   
            setOpenErrorPopup(true);
         });
    };

    useEffect(() => {
        var tempObj= {};
        var tempArr= [];
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => {
                tempObj[field.Name] = {...field};
                tempArr.push(
                    {
                        DisplayName: field.DisplayName,
                        Name: field.Name
                    });
            });
            setResourceObject({"resource": {...tempObj}});
            setHeaderFields([...tempArr]);
            getAllLoans();
        }
    }, []);

    const onEdit = (e, row) => {
        e.preventDefault();
        setFormData({...row});
        setOpen(true);
    }

    const handleDialogClose = () => { setOpen(false); };

    const confirmDelete = (e,row) => {
        e.preventDefault();
        loanToDelete.current = row.loanID;
        setOpenDeleteConfirmDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setOpenDeleteConfirmDialog(false);
    }

    const onDelete = () => {
        API.del("/api/loan/"+loanToDelete.current).then((res) => {
            handleDeleteDialogClose();
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Success!",
                    "message": "Loan successfully deleted",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); }
                };
                setOpenSuccessPopup(true);
                getAllLoans();
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to delete loan: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
        }
        }).catch(err => { 
            handleDeleteDialogClose();
            popupProps.current = {
            "title": "Error!",
            "message": "Unable to delete loan",
            "handleAlertClose": () => { setOpenErrorPopup(false);}
            };   
            setOpenErrorPopup(true); 
        });
    }

    const onUpdate = (data) => {
        API.put("/api/loan", {...data}).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Update Successful!",
                    "message": "Loan successfully updated",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); }
                };
                setOpenSuccessPopup(true);
                handleDialogClose();
                getAllLoans();
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to update loan: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
            }
            }).catch(err => { 
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to update loan",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);
            });
    }
    return (
        <>
                <Box>
                    <Paper>
                        <CommonUtils.TableToolbar tableName="Loans"/>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    {
                                        headerFields.map((field, ind) => (
                                            <TableCell align="right" key={ind}><span className='tCellData'>{field.DisplayName}</span>
                                            </TableCell>
                                            
                                            ))
                                    }
                                    <TableCell align="right"><span className='tCellData'>Actions</span>
                                        </TableCell>
                                    
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                    {
                                    tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <CommonUtils.TableCellsFromList row={row} tableHeader={headerFields} />
                                            <TableCell>
                                                <div className='tCellData'>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {onEdit(e, row)}}>Edit</Button>
                                                    <Button 
                                                    variant="text"
                                                    onClick={(e) => {confirmDelete(e, row)}}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Dialog open={open} onClose={handleDialogClose}>
                        <DialogTitle>
                            Edit Loan
                        </DialogTitle> 
                        <DialogContent>
                            <LoanCardForm resourceName={resourceName} defaultFormData={formData} updateData={onUpdate}/>
                        </DialogContent>
                    </Dialog>
                </Box>
                <Dialog open={openDeleteConfirmDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete loan {loanToDelete.current}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>No</Button>
                    <Button onClick={onDelete}>Yes</Button>
                </DialogActions>
                </Dialog>
            {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
            {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}

        </>
    );
}