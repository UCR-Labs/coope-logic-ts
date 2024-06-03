"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFCMToken = exports.handleUserFcmTokenUpdate = void 0;
const firestore_1 = require("@angular/fire/firestore");
function handleUserFcmTokenUpdate(userId, fcmToken, collectionName, db) {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            await updateFCMToken({ uid: userId, fcmToken, collectionName }, db);
            response.status(200).send({
                message: "El FCMtoken actualizado exitosamente",
            });
            resolve(response);
        }
        catch (error) {
            console.error("Error al actualizar el FCMtoken", error);
            response.status(500).send({
                error: "No se pudo actualizar el FCMtoken correctamente",
            });
            reject(response);
        }
    });
}
exports.handleUserFcmTokenUpdate = handleUserFcmTokenUpdate;
function updateFCMToken({ uid, fcmToken, collectionName, }, db) {
    return new Promise(async (resolve, reject) => {
        try {
            const userCollection = (0, firestore_1.collection)(db, collectionName);
            const userDocRef = (0, firestore_1.doc)(userCollection, uid);
            (0, firestore_1.updateDoc)(userDocRef, { fcmToken: fcmToken });
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.updateFCMToken = updateFCMToken;
//# sourceMappingURL=Fcm_management.js.map