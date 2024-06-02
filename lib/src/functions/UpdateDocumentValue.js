"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocumentValue = void 0;
const firestore_1 = require("@angular/fire/firestore");
const CoopeTypes_1 = require("CoopeTypes");
function updateDocumentValue(firestore, docId, data, collection) {
    return new Promise(async (resolve, reject) => {
        try {
            const documentRef = (0, firestore_1.doc)(firestore, CoopeTypes_1.FirestoreCollections[collection], docId);
            const documentSnapshot = await (0, firestore_1.getDoc)(documentRef);
            if (documentSnapshot.exists()) {
                await (0, firestore_1.setDoc)(documentRef, data, { merge: true });
                resolve();
            }
            else {
                reject(new Error('Document does not exist.'));
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.updateDocumentValue = updateDocumentValue;
;
//# sourceMappingURL=UpdateDocumentValue.js.map