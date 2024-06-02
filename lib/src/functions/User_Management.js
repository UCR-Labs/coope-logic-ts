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
exports.increaseUserStatistics = void 0;
const admin = __importStar(require("firebase-admin"));
const models_1 = require("../models");
const increaseUserStatistics = async (valueCreated) => {
    const db = admin.firestore();
    let statisticsObjId = '';
    if (valueCreated.role === 'Admin') {
        statisticsObjId = models_1.Statistics.adminUsers;
    }
    else if (valueCreated.role === 'Biker') {
        statisticsObjId = models_1.Statistics.bikerUsers;
    }
    else if (valueCreated.role === 'User') {
        statisticsObjId = models_1.Statistics.regularUsers;
    }
    // * Busco en la coleccion de aggregatedStatistics
    // * el documento con las estadisticas que necesito
    const statisticsObj = await db
        .collection(models_1.FirestoreCollections.aggregatedStatistics)
        .doc(statisticsObjId)
        .get();
    let updatedStatistics;
    if (!!statisticsObj && !!statisticsObj.data()) {
        updatedStatistics = statisticsObj.data();
        updatedStatistics.value += 1;
        updatedStatistics.modified = new Date().getTime();
        await db
            .collection(models_1.FirestoreCollections.aggregatedStatistics)
            .doc(statisticsObjId)
            .update(updatedStatistics);
    }
    else {
        updatedStatistics = {
            label: statisticsObjId,
            modified: new Date().getTime(),
            value: 1,
        };
        await db
            .collection(models_1.FirestoreCollections.aggregatedStatistics)
            .doc(statisticsObjId)
            .set(updatedStatistics);
    }
    return 0;
};
exports.increaseUserStatistics = increaseUserStatistics;
//# sourceMappingURL=User_Management.js.map