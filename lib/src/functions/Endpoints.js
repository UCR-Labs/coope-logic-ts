"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionsAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const parseRequest = (request) => {
    return request.query;
};
function DirectionsAPI(request, key) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = parseRequest(request);
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${data.origin}&destination=${data.destination}&mode=${data.mode}&units=${data.units}&key=${key}&language=es`;
            const responseObj = await axios_1.default.get(url);
            resolve(responseObj);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.DirectionsAPI = DirectionsAPI;
;
//# sourceMappingURL=Endpoints.js.map