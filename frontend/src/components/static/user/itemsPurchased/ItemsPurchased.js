import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';
import * as API from '../../../services/ApiRequestService';

export default function ItemsPurchased() {
    const resourceName = "purchaseHistory";
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
                tempArr.push(field.DisplayName);
            });
            setResourceObject({"resource": {...tempObj}});
            setHeaderFields([...tempArr]);

            API.get("/api/employee/"+userID).then(res => {
                console.log(res);
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    setEmpData({...res.data.data});
                }
            }).catch((err) => { window.alert(err)});

            API.get("/api/purchaseHistory/"+userID).then((res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    setTableData([...res.data.data]);
                } else {
                    window.alert("Unable to fetch items " + res.data.message);
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
                        <CommonUtils.TableToolbar tableName="Items Purchased" other={{
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