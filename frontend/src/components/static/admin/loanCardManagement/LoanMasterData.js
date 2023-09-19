import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';
import dayjs from 'dayjs';

export default function LoanData() {
    const resourceName = "loans";
    const {userID} = useParams();
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [tableData, setTableData] = useState([]);
    var [headerFields, setHeaderFields] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        var tempObj= {};
        var tempArr= [];
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => {
                tempObj[field.Name] = {...field};
                tempArr.push(field.DisplayName);
            });
            setResourceObject({"resource": {...tempObj}});
            setHeaderFields([...tempArr]);
            var data = [{
                userID:"K345678",
                loanID: "1234",
                loanType: "ABC",
                loanDuration: "5",
                loanStatus: "Pending",
                issueDate: "2023-09-09"
            }, {
                userID:"K567890",
                loanID: "1234",
                loanType: "ABC",
                loanDuration: "5",
                loanStatus: "Pending",
                issueDate: "2023-09-09"
            }];
            setTableData([...data]);
        }
    }, []);

    const onEdit = (e, row) => {
        e.preventDefault();
        let propObj = {
            userID: row.userID,
            loanID: row.loanID,
            loanDuration: row.loanDuration,
            loanType: row.loanType,
            issueDate: dayjs(row.issueDate).format("YYYY-MM-DD"),
            loanStatus : row.loanStatus
           
        }
        console.log("Props object: ",propObj);
        setResourceObject(propObj);
        setOpen(true);
    }
    const onDelete = (e, row) => {
        
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
                                            <TableCell align="right" key={ind}><span className='tCellData'>{field}</span>
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
                                            <CommonUtils.TableCellsFromList list={row} />
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
                </Box>

        </>
    );
}