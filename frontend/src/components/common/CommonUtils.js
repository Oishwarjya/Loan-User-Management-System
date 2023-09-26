import resources from '../../resourcemap.config.json';
import { TableCell, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * Initializes or resets a form
 * @param {String} resourceName Takes the resource name as per resourcemap.config
 * @param {Object} init Takes the initial configs as parameter 
 * @returns The initialized formData object that you can put as a parameter in the setFormData method
 */
export const initializeOrResetForm = (resourceName, init, options = null) => {
    let temp = {};
    if(options != null && options.hasOwnProperty('onlyString') && options.onlyString) {
        resources[resourceName].fields.forEach(field=>{
            temp = { ...temp, 
                    [field.Name]: ""
                };
        });    
    } else { 
        resources[resourceName].fields.forEach(field=>{
        temp = { ...temp, 
                [field.Name]: field.Format.includes("string")?"": field.Format == "number"? 0 :[]
            };
        });
    }
    temp = {...temp, ...init};
    return { ...temp};
};

/**
 * Displays a row of the table
 * @param {Object} props Has a key called list that contains key value pairs for the columns of the table in that order
 * @returns HTML TableCell
 */
export function TableCellsFromList(props) {
    const { row, tableHeader } = props;
    let items=[];
    if(typeof row=="object") {
        tableHeader.forEach((column) => {
            items.push(row[column.Name]);
        })
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

/**
 * Renders the Table Toolbar
 * @param {Object} props Has one property called tableName that takes the table name as a string other property has any other information you want to display in the table toolbar
 * @returns HTML of the Table Toolbar
 */
export function TableToolbar(props) {
    const { tableName, other } = props;
    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }}
            variant='h6'
            component="div">
                {tableName}
            </Typography>
            {
                other && Object.keys(other).map((prop, index) => {
                    return (
                        <Typography key={index} sx={{ flex: '1 1 100%' }}
                        variant='h6'
                        component="div">
                            {prop}: {other[prop]}
                        </Typography>
                    );
                })
            }
        </Toolbar>
    )
}


export function SuccessAlert(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.handleAlertClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
            style: {
                backgroundImage: "linear-gradient(to right, rgb(102, 209, 155, 0.5) 0%, rgb(255,255,255,0.5) 130%)"
            }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ErrorAlert(props) {
    const [open, setOpen] = React.useState(true);
  
    const handleClose = () => {
      setOpen(false);
      props.handleAlertClose();
    };
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
              style: {
                  backgroundImage: "linear-gradient(to right, rgb(241, 137, 137, 0.5) 0%, rgb(255,255,255,0.5) 130%)"
              }
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }