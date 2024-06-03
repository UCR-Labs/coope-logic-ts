import {
  Firestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "@angular/fire/firestore";
import { Business, FirestoreCollections } from "CoopeTypes";

export function getBusinesses(db: Firestore): Promise<Business[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const storedBusinesses = localStorage.getItem("businesses");

      // Comprobar si hay negocios en localstorage
      if (storedBusinesses) {
        const businesses: Business[] = JSON.parse(storedBusinesses);

        resolve(businesses);
      } else {
        // Si no hay datos en localStorage, obtenerlos de Firebase
        const businessesFromFirebase = await fetchBusinessesFromFirebase(db);
        // Guardar los datos obtenidos de Firebase en localStorage
        localStorage.setItem(
          "businesses",
          JSON.stringify(businessesFromFirebase)
        );
        // Resolver la promesa con los datos obtenidos de Firebase
        resolve(businessesFromFirebase);
      }
    } catch (error) {
      reject("Error al obtener los negocios: " + error);
    }
  });
}

// Función auxiliar para obtener los datos desde Firebase
export function fetchBusinessesFromFirebase(
  db: Firestore
): Promise<Business[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // Aquí se asume que ya has inicializado Firebase en tu proyecto
      const querySnapshot = await getDocs(
        collection(db, FirestoreCollections.businesses)
      );

      // Transformar los datos obtenidos desde Firebase a la estructura deseada
      const businesses: Business[] = querySnapshot.docs.map((doc) => {
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
    } catch (error) {
      reject(error);
    }
  });
}

export function getBusinessById(
  db: Firestore,
  id: string
): Promise<Business | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const storedBusinesses = localStorage.getItem("businesses");

      if (storedBusinesses) {
        const businesses: Business[] = JSON.parse(storedBusinesses);
        const business = businesses.find((b) => b.firebaseUserId === id);
        resolve(business || null);
      } else {
        const businessFromFirebase = await fetchBusinessFromFirebase(db, id);
        if (businessFromFirebase) {
          localStorage.setItem(
            "businesses",
            JSON.stringify([businessFromFirebase])
          );
          resolve(businessFromFirebase);
        } else {
          resolve(null);
        }
      }
    } catch (error) {
      reject("Error al obtener el negocio: " + error);
    }
  });
}

export function fetchBusinessFromFirebase(
  db: Firestore,
  id: string
): Promise<Business | null> {
  return new Promise((resolve, reject) => {
    try {
      const docRef = doc(collection(db, FirestoreCollections.businesses), id);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Business;
            resolve({
              ...data,
            });
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}
