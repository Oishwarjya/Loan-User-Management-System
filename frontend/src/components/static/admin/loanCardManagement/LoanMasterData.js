import React, { useState, useEffect } from "react";
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

    const getAllLoans = () => {
        API.get("/api/loans").then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setTableData([...res.data.data]);
            } else {
                window.alert("Unable to fetch loans " + res.data.message);
            }
        }).catch((err) => {
            window.alert(err);
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

    const onDelete = (e, row) => {
        API.del("/api/loan/"+row.loanID).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                window.alert("Deleted loan successfully");
                getAllLoans();
            } else {
                window.alert("Unable to delete loan " + res.data.message);
            }
        }).catch((err) => {
            window.alert(err);
        });
    }

    const onUpdate = (data) => {
        API.put("/api/loan", {...data}).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                window.alert("Updated loan successfully");
                getAllLoans();
            } else {
                window.alert("Unable to update loan " + res.data.message);
            }
       }).catch((err) => {
            window.alert(err);
        });
        handleDialogClose();
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
                                                    onClick={(e) => {onDelete(e, row)}}>Delete</Button>
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

        </>
    );
}