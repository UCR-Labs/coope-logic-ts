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
exports.sendMessageRating = exports.sendMessageArriving = exports.sendMessageAcceptedBiker = exports.sendMessagePending = exports.getBikerName = exports.getUserFCMToken = exports.updateOrder = void 0;
const admin = __importStar(require("firebase-admin"));
const CoopeTypes_1 = require("CoopeTypes");
const firestore_1 = require("@angular/fire/firestore");
function updateOrder(db, order, docId) {
    return new Promise(async (resolve, reject) => {
        try {
            const newOrder = order;
            const newOrderStatus = newOrder.status;
            const orderId = docId;
            let fcmToken = "";
            await getUserFCMToken(db, newOrder.customerId).then((token) => (fcmToken = token));
            let bikerName = "";
            await getBikerName(db, newOrder.bikerId).then((name) => (bikerName = name));
            if (fcmToken != "") {
                if (newOrderStatus == "Pending") {
                    sendMessagePending(orderId, fcmToken);
                }
                else if (newOrderStatus == "Finished") {
                    sendMessageRating(orderId, fcmToken);
                }
                else if (newOrderStatus == "AcceptedByBiker") {
                    sendMessageAcceptedBiker(orderId, fcmToken, bikerName);
                }
                else if (newOrderStatus == "Arriving") {
                    sendMessageArriving(orderId, fcmToken, bikerName);
                }
            }
            // Crear una copia del objeto pero que sea compatible
            const updatedOrder = Object.assign({}, newOrder);
            const orderDocRef = (0, firestore_1.doc)(db, `${CoopeTypes_1.FirestoreCollections.orders}/${orderId}`);
            await (0, firestore_1.updateDoc)(orderDocRef, updatedOrder);
            resolve(0);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.updateOrder = updateOrder;
function getUserFCMToken(db, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const customerRef = (0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.customers);
            const q = (0, firestore_1.query)(customerRef, (0, firestore_1.where)("firebaseUserId", "==", userId));
            const userSnapshot = await (0, firestore_1.getDocs)(q);
            const customerData = userSnapshot.docs[0].data();
            if (!userSnapshot.empty && customerData.fcmToken) {
                resolve(customerData.fcmToken);
            }
            else {
                resolve("");
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getUserFCMToken = getUserFCMToken;
function getBikerName(db, bikerId) {
    return new Promise(async (resolve, reject) => {
        try {
            const bikersRef = (0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.bikers);
            const q = (0, firestore_1.query)(bikersRef, (0, firestore_1.where)("firebaseUserId", "==", bikerId));
            const userSnapshot = await (0, firestore_1.getDocs)(q);
            if (!userSnapshot.empty) {
                const bikerData = userSnapshot.docs[0].data();
                resolve(bikerData.firstName + " " + bikerData.lastName);
            }
            else {
                resolve("");
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getBikerName = getBikerName;
function sendMessagePending(orderId, fcmToken) {
    return new Promise(async (resolve, reject) => {
        try {
            const message = {
                token: fcmToken,
                notification: {
                    title: "RIDE Pedido",
                    body: "Nuestros colaboradores de RIDE han procesado tu orden. ¿Te gustaría continuar con el pedido?",
                },
                data: {
                    orderId: orderId,
                },
            };
            admin.messaging().send(message);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.sendMessagePending = sendMessagePending;
function sendMessageAcceptedBiker(orderId, fcmToken, bikerName) {
    return new Promise(async (resolve, reject) => {
        try {
            const message = {
                token: fcmToken,
                notification: {
                    title: "RIDE Pedido",
                    body: `El ciclista ${bikerName} ya va en camino.`,
                },
                data: {
                    orderId: orderId,
                },
            };
            admin.messaging().send(message);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.sendMessageAcceptedBiker = sendMessageAcceptedBiker;
function sendMessageArriving(orderId, fcmToken, bikerName) {
    return new Promise(async (resolve, reject) => {
        try {
            const message = {
                token: fcmToken,
                notification: {
                    title: "RIDE Pedido",
                    body: `${bikerName} esta llegando.`,
                },
                data: {
                    orderId: orderId,
                },
            };
            admin.messaging().send(message);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.sendMessageArriving = sendMessageArriving;
function sendMessageRating(orderId, fcmToken) {
    return new Promise(async (resolve, reject) => {
        try {
            const message = {
                token: fcmToken,
                notification: {
                    title: "RIDE Pedido",
                    body: "En RIDE valoramos tu opinión. Califica como fue tu experiencia",
                },
                data: {
                    orderId: orderId,
                },
            };
            admin.messaging().send(message);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.sendMessageRating = sendMessageRating;
//# sourceMappingURL=Orders_management.js.map