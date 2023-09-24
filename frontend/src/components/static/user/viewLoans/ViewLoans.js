import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';
import * as API from '../../../services/ApiRequestService';

export default function ViewLoans() {
    const resourceName = "loans";
    const {userID} = useParams();
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [tableData, setTableData] = useState([]);
    const [empData, setEmpData] = useState(CommonUtils.initializeOrResetForm("employees", {"userID": userID}));
    var [headerFields, setHeaderFields] = useState([]);
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
            tempArr = tempArr.filter(field => field!=="Employee ID");
            setHeaderFields([...tempArr]);

            API.get("/api/employee/"+userID).then(res => {
                console.log(res);
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    setEmpData({...res.data.data});
                }
            }).catch((err) => { window.alert(err)});

            API.get("/api/loans/"+userID).then((res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    var data = []
                    data = res.data.data.map((field) => {
                        delete field.userID;
                        return field;
                    });
                    setTableData([...data]);
                } else {
                    window.alert("Unable to fetch loans " + res.data.message);
                }
            }).catch((err) => {
                window.alert(err);
            });
        }
    }, []);

    return (
        <>
                <Box>
                    <Paper>
                        <CommonUtils.TableToolbar tableName="Active Loans" other={{
                            "Employee ID": empData.userID,
                            "Designation": empData.designation,
                            "Department": empData.department
                        }}/>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    {
                                        headerFields.map((field, ind) => (
                                            <TableCell align="right" key={ind}><span className='tCellData'>{field.DisplayName}</span></TableCell>
                                            ))
                                    }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <CommonUtils.TableCellsFromList row={row} tableHeader={headerFields}  />
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