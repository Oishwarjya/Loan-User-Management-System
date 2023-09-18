import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';

export default function ViewLoans() {
    const resourceName = "loans";
    const {userID} = useParams();
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [tableData, setTableData] = useState([]);
    var [headerFields, setHeaderFields] = useState([]);
    useEffect(() => {
        var tempObj= {};
        var tempArr= [];
        if(Object.keys(resourceObject.resource).length == 0 ) {
            resources[resourceName].fields.forEach(field => {
                tempObj[field.Name] = {...field};
                tempArr.push(field.DisplayName);
            });
            setResourceObject({"resource": {...tempObj}});
            tempArr = tempArr.filter(field => field!=="Employee ID");
            setHeaderFields([...tempArr]);
            var data = [{
                loanID: "1234",
                loanType: "ABC",
                loanDuration: "5",
                loanStatus: "Pending",
                issueDate: "2023-09-09"
            }, {
                loanID: "1234",
                loanType: "ABC",
                loanDuration: "5",
                loanStatus: "Pending",
                issueDate: "2023-09-09"
            }];
            setTableData([...data]);
        }
    }, []);

    return (
        <>
                <Box>
                    <Paper>
                        <CommonUtils.TableToolbar tableName="ActiveLoans" other={{
                            "Employee ID": userID.toString(),
                            "Designation": "Manager",
                            "Department": "Technology"
                        }}/>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    {
                                        headerFields.map((field, ind) => (
                                            <TableCell align="right" key={ind}><span className='tCellData'>{field}</span></TableCell>
                                            ))
                                    }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <CommonUtils.TableCellsFromList list={row} />
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