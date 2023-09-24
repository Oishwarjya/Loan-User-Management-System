import resources from '../../resourcemap.config.json';
import { TableCell, Toolbar, Typography } from '@mui/material';

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
        // for(let key in list){
        //     items.push(list[key]);
        // }
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
