"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBusinessFromFirebase = exports.getBusinessById = exports.fetchBusinessesFromFirebase = exports.getBusinesses = void 0;
const firestore_1 = require("@angular/fire/firestore");
const CoopeTypes_1 = require("CoopeTypes");
function getBusinesses(db) {
    return new Promise(async (resolve, reject) => {
        try {
            const storedBusinesses = localStorage.getItem("businesses");
            // Comprobar si hay negocios en localstorage
            if (storedBusinesses) {
                const businesses = JSON.parse(storedBusinesses);
                resolve(businesses);
            }
            else {
                // Si no hay datos en localStorage, obtenerlos de Firebase
                const businessesFromFirebase = await fetchBusinessesFromFirebase(db);
                // Guardar los datos obtenidos de Firebase en localStorage
                localStorage.setItem("businesses", JSON.stringify(businessesFromFirebase));
                // Resolver la promesa con los datos obtenidos de Firebase
                resolve(businessesFromFirebase);
            }
        }
        catch (error) {
            reject("Error al obtener los negocios: " + error);
        }
    });
}
exports.getBusinesses = getBusinesses;
// Función auxiliar para obtener los datos desde Firebase
function fetchBusinessesFromFirebase(db) {
    return new Promise(async (resolve, reject) => {
        try {
            // Aquí se asume que ya has inicializado Firebase en tu proyecto
            const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.businesses));
            // Transformar los datos obtenidos desde Firebase a la estructura deseada
            const businesses = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    firebaseUserId: data.firebaseUserId,
                    profilePhoto: data.profilePhoto,
                    name: data.name,
                    cellPhone: data.cellPhone,
                    provincia: data.provincia,
                    canton: data.canton,
                    distrito: data.distrito,
                    otherDirections: data.otherDirections,
                    currentLocation: data.currentLocation,
                    userStatus: data.userStatus,
                    contacts: data.contacts,
                    email: data.email,
                    description: data.description,
                    tagIds: data.tagIds,
                    created: data.created,
                    lastUpdate: data.lastUpdate,
                    fcmToken: data.fcmToken,
                };
            });
            resolve(businesses);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.fetchBusinessesFromFirebase = fetchBusinessesFromFirebase;
function getBusinessById(db, id) {
    return new Promise(async (resolve, reject) => {
        try {
            const storedBusinesses = localStorage.getItem("businesses");
            if (storedBusinesses) {
                const businesses = JSON.parse(storedBusinesses);
                const business = businesses.find((b) => b.firebaseUserId === id);
                resolve(business || null);
            }
            else {
                const businessFromFirebase = await fetchBusinessFromFirebase(db, id);
                if (businessFromFirebase) {
                    localStorage.setItem("businesses", JSON.stringify([businessFromFirebase]));
                    resolve(businessFromFirebase);
                }
                else {
                    resolve(null);
                }
            }
        }
        catch (error) {
            reject("Error al obtener el negocio: " + error);
        }
    });
}
exports.getBusinessById = getBusinessById;
function fetchBusinessFromFirebase(db, id) {
    return new Promise((resolve, reject) => {
        try {
            const docRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.businesses), id);
            (0, firestore_1.getDoc)(docRef)
                .then((docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    resolve(Object.assign({}, data));
                }
                else {
                    resolve(null);
                }
            })
                .catch((error) => {
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.fetchBusinessFromFirebase = fetchBusinessFromFirebase;
//# sourceMappingURL=Businesses.js.map