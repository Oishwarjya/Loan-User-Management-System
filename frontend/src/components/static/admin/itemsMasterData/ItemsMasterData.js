import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Toolbar, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import resources from '../../../../resourcemap.config.json';
import * as CommonUtils from '../../../common/CommonUtils';
import ItemsForm from './ItemsForm';
import * as API from '../../../services/ApiRequestService';

export default function ItemsMasterData() {
    const resourceName = "items";
    const {userID} = useParams();
    const [formData, setFormData] = useState(CommonUtils.initializeOrResetForm(resourceName));
    const [resourceObject, setResourceObject] = useState({"resource": {}});
    const [tableData, setTableData] = useState([]);
    var [headerFields, setHeaderFields] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const popupProps = useRef({
        "title": "",
        "message": "",
        "handleAlertClose": null
    });
    
    const getAllItems = () => {
        API.get("/api/items").then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setTableData([...res.data.data]);
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to fetch items: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);            }
        }).catch((err) => {
            popupProps.current = {
                "title": "Error!",
                "message": "Unable to fetch items",
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
            getAllItems();
        }
    }, []);

    const onEdit = (e, row) => {
        e.preventDefault();
        setFormData({...row});
        setOpenEdit(true);
    }

    const handleEditDialogClose = () => { setOpenEdit(false); };
    const handleNewDialogClose = () => { setOpenNew(false); };

    const onDelete = (e, row) => {
        API.del("/api/item/"+row.itemID).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Success!",
                    "message": "Item successfully deleted",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); }
                };
                setOpenSuccessPopup(true);
                getAllItems();
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to delete item: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
        }
    }).catch(err => { 
        popupProps.current = {
            "title": "Error!",
            "message": "Unable to delete item",
            "handleAlertClose": () => { setOpenErrorPopup(false);}
        };   
        setOpenErrorPopup(true); 
    });
    }

    const onUpdate = (data) => {
        API.put("/api/item", {...data}).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Update Successful!",
                    "message": "Item successfully updated",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); }
                };
                setOpenSuccessPopup(true);
                handleEditDialogClose();
                getAllItems();
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to update item: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
            }
            }).catch(err => { 
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to update item",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);
            });
    }

    const onAdd = (data) => {
        data = {
            ...data,
            itemID: null
        }
        API.post("/api/item", {...data}).then((res) => {
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                popupProps.current = {
                    "title": "Add Successful!",
                    "message": "Item successfully added",
                    "handleAlertClose": () => { setOpenSuccessPopup(false); }
                };
                setOpenSuccessPopup(true);
                handleNewDialogClose();
                getAllItems();
            } else {
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to add item: " + res.data.message,
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true); 
            }
            }).catch(err => { 
                popupProps.current = {
                    "title": "Error!",
                    "message": "Unable to add item",
                    "handleAlertClose": () => { setOpenErrorPopup(false);}
                };   
                setOpenErrorPopup(true);
            });
    }

    const onNew = (e) => {
            e.preventDefault();
            setFormData(CommonUtils.initializeOrResetForm(resourceName, { "itemAvailability": "AVAILABLE" }));
            setOpenNew(true);        
    }

    return (
        <>
                <Box>
                    <Paper style={{   
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto'
                    }}>
                        <CommonUtils.TableToolbar tableName="Items"/>
                        <Button style={{marginBottom: "5px"}}  onClick={(e) => {onNew(e)}} variant="contained" className="signUpButton">Add New Item</Button>
                        <TableContainer style={{
                            border:"1px solid black"
                        }} component={Paper}>
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
                    <Dialog open={openEdit} onClose={handleEditDialogClose}>
                        <DialogTitle>
                            Edit Item
                        </DialogTitle> 
                        <DialogContent>
                            <ItemsForm resourceName={resourceName} defaultFormData={formData} onSubmit={onUpdate} btnLabel="Update Item"/>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={openNew} onClose={handleNewDialogClose}>
                        <DialogTitle>
                            Add Item
                        </DialogTitle> 
                        <DialogContent>
                            <ItemsForm resourceName={resourceName} defaultFormData={formData} onSubmit={onAdd} btnLabel="Add Item"/>
                        </DialogContent>
                    </Dialog>
                </Box>
            {openSuccessPopup && <CommonUtils.SuccessAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.SuccessAlert>}
            {openErrorPopup && <CommonUtils.ErrorAlert title={popupProps.current.title} message={popupProps.current.message} handleAlertClose={popupProps.current.handleAlertClose}></CommonUtils.ErrorAlert>}
        </>
    );
}