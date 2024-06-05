import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import { FirestoreCollections } from "CoopeTypes";

interface ProductPhotoAndTags {
  tagNames: string[];
  productPhoto: string;
}

export function getProducts(db: Firestore): Promise<ProductPhotoAndTags[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const storedProducts = localStorage.getItem("products");

      // Comprobar si hay productos en localstorage
      if (storedProducts) {
        const products: ProductPhotoAndTags[] = JSON.parse(storedProducts);

        resolve(products);
      } else {
        // Si no hay datos en localStorage, obtenerlos de Firebase
        const productsFromFirebase = await fetchProductsFromFirebase(db);
        // Guardar los datos obtenidos de Firebase en localStorage
        localStorage.setItem("products", JSON.stringify(productsFromFirebase));
        // Resolver la promesa con los datos obtenidos de Firebase
        resolve(productsFromFirebase);
      }
    } catch (error) {
      reject("Error al obtener los productos: " + error);
    }
  });
}

// Función auxiliar para obtener los datos desde Firebase
export function fetchProductsFromFirebase(
  db: Firestore
): Promise<ProductPhotoAndTags[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // Aquí se asume que ya has inicializado Firebase en tu proyecto
      const querySnapshot = await getDocs(
        collection(db, FirestoreCollections.products)
      );

      // Transformar los datos obtenidos desde Firebase a la estructura deseada
      const products: ProductPhotoAndTags[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          tagNames: data.tagNames,
          productPhoto: data.productPhoto,
        };
      });
      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
}
