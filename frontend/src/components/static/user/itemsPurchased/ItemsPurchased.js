import React, { useState, useEffect, useRef } from "react";
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
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });

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

            API.get("/api/employee/"+userID).then(res => {
                console.log(res);
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    setEmpData({...res.data.data});
                } else {
                    popupProps.current = {
                        "title": "Error!",
                        "message": "Unable to fetch employee details: " + res.data.message,
                        "handleAlertClose": () => { setOpenErrorPopup(false);}
                    };   
                    setOpenErrorPopup(true);            }
            }).catch((err) => {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch employee details",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);
             });
    

            API.get("/api/purchaseHistory/"+userID).then((res) => {
                if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                    setTableData([...res.data.data]);
                } else {
                    popupProps.current = {
                        "title": "Error!",
                        "message": "Unable to fetch purchased items: " + res.data.message,
                        "handleAlertClose": () => { setOpenErrorPopup(false);}
                    };   
                    setOpenErrorPopup(true);            }
            }).catch((err) => {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch purchased items",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);
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
            {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
            {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}

        </>
    );
}