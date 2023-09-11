import * as resources from '../../resourcemap.config.json';
import * as API from './ApiRequestService';
/**
 * 
 * @param {*} resourceName Name of the resource as per resourcemap.config
 * @param {*} data An ARRAY of all the data objects as key value pairs
 * @returns The datastore object or an object with property ERROR if there is an error
 */
export function toResourceMap(resourceName, data) {
    if(!Object.keys(resources).includes(resourceName)) {
        return ({
            "ERROR": "Resource does not exist"
        });
    } else if(!(data instanceof Array)) {
        return ({
            "ERROR": "Param data must be an array"
        });
    } else {
        var dataObj = {...resources[resourceName]};
        dataObj.values = [...data];
        return {...dataObj};
    }
}
/**
 * 
 * @param {*} url URL to get data
 * @param {*} resourceName Name of the resource as per resourcemap.config
 * @returns The datastore object or an object with property ERROR if there is an error
 */
export async function loadDataStore(url, resourceName) {
    await API.get(url).then((res) => {
        if(res.data instanceof Array) {
            return toResourceMap(resourceName, res.data);
        } else {
            return toResourceMap(resourceName,[{...res.data}]);
        }
    }).catch((err) => { return ({ "ERROR": "Unable to load resource"});});
}