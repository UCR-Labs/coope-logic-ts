import axios from 'axios';

interface Directions {
    origin: string;
    destination: string;
    mode: TravelMode;
    units: UnitSystem;
}
// ? enum tomado de la libreria de google.maps,
// ? ya que no permite cargar durante tiempo de ejecución
export enum TravelMode {
    BICYCLING = 'BICYCLING',
    DRIVING = 'DRIVING',
    TRANSIT = 'TRANSIT',
    WALKING = 'WALKING',
}
  
// ? enum tomado de la libreria de google.maps,
// ? ya que no permite cargar durante tiempo de ejecución
export enum UnitSystem {
IMPERIAL = 0.0,
METRIC = 1.0,
}
  
const parseRequest = (request: any): Directions => {
    return request.query;
  };

export function Directions(request: any, key : String): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const data = parseRequest(request);
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${data.origin}&destination=${data.destination}&mode=${data.mode}&units=${data.units}&key=${key}&language=es`;
            const responseObj = await axios.get(url);
            console.log(responseObj.data);
            resolve(responseObj);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
  };