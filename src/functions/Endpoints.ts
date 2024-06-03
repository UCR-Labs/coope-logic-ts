import axios from 'axios';
import { Directions } from 'CoopeTypes';

const parseRequest = (request: any): Directions => {
    return request.query;
  };
// Necesita el request como se enviaba anterioremente + la key de google API
export function DirectionsAPI(request: any, key : String): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = parseRequest(request);
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${data.origin}&destination=${data.destination}&mode=${data.mode}&units=${data.units}&key=${key}&language=es`;
            const responseObj = await axios.get(url);
            resolve(responseObj);
        } catch (error) {
            reject(error);
        }
    });
  };