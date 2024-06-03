import { Firestore, collection, getDocs } from "@angular/fire/firestore";
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
