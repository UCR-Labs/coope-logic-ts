"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductsFromFirebase = exports.getProducts = void 0;
const firestore_1 = require("@angular/fire/firestore");
const CoopeTypes_1 = require("CoopeTypes");
function getProducts(db) {
    return new Promise(async (resolve, reject) => {
        try {
            const storedProducts = localStorage.getItem("products");
            // Comprobar si hay productos en localstorage
            if (storedProducts) {
                const products = JSON.parse(storedProducts);
                resolve(products);
            }
            else {
                // Si no hay datos en localStorage, obtenerlos de Firebase
                const productsFromFirebase = await fetchProductsFromFirebase(db);
                // Guardar los datos obtenidos de Firebase en localStorage
                localStorage.setItem("products", JSON.stringify(productsFromFirebase));
                // Resolver la promesa con los datos obtenidos de Firebase
                resolve(productsFromFirebase);
            }
        }
        catch (error) {
            reject("Error al obtener los productos: " + error);
        }
    });
}
exports.getProducts = getProducts;
// Función auxiliar para obtener los datos desde Firebase
function fetchProductsFromFirebase(db) {
    return new Promise(async (resolve, reject) => {
        try {
            // Aquí se asume que ya has inicializado Firebase en tu proyecto
            const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(db, CoopeTypes_1.FirestoreCollections.products));
            // Transformar los datos obtenidos desde Firebase a la estructura deseada
            const products = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    tagNames: data.tagNames,
                    productPhoto: data.productPhoto,
                };
            });
            resolve(products);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.fetchProductsFromFirebase = fetchProductsFromFirebase;
//# sourceMappingURL=Products.js.map