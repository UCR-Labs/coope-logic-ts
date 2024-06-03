"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateServiceCost = exports.getKilometerPrice = void 0;
const admin = __importStar(require("firebase-admin"));
const rideTypes_1 = require("rideTypes");
const db = admin.firestore();
const getKilometerPrice = async () => {
    const configQuerySnapshot = await db
        .collection(rideTypes_1.FirestoreCollections.configItems)
        .limit(1)
        .get();
    if (configQuerySnapshot.empty) {
        throw new Error('No config documents found.');
    }
    const configDoc = configQuerySnapshot.docs[0];
    const configData = configDoc.data();
    if (!configData || configData.kilometerPrice === undefined) {
        throw new Error('Kilometer price not found in config.');
    }
    return configData.kilometerPrice;
};
exports.getKilometerPrice = getKilometerPrice;
async function calculateServiceCost(distance) {
    const baseCost = 1300;
    const baseDistance = 2000;
    let extraCost = 0;
    const kilometerPrice = await (0, exports.getKilometerPrice)();
    if (distance > baseDistance) {
        const distanceInKM = (distance - baseDistance) / 1000;
        extraCost = Math.ceil(distanceInKM) * kilometerPrice;
    }
    return baseCost + extraCost;
}
exports.calculateServiceCost = calculateServiceCost;
;
//# sourceMappingURL=serviceCost.js.map