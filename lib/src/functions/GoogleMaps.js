"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = void 0;
const axios_1 = __importDefault(require("axios"));
async function geocode(location, apiKey) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${apiKey}&language=es`;
    try {
        const result = await axios_1.default.get(url);
        return result.data;
    }
    catch (error) {
        const errorMessage = error.message;
        throw new Error("Error while fetching geocode data: " + errorMessage);
    }
}
exports.geocode = geocode;
//# sourceMappingURL=GoogleMaps.js.map