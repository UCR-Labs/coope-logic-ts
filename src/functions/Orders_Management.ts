import { Change, EventContext } from "firebase-functions";
import * as admin from "firebase-admin";
import {
  Biker,
  Customer,
  FirestoreCollections,
  Order,
  OrderStatus,
} from "CoopeTypes";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "@angular/fire/firestore";

export function updateOrder(
  db: Firestore,
  change: Change<admin.firestore.DocumentSnapshot>,
  context: EventContext
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const newOrder: Order = change.after.data() as Order;
      const newOrderStatus: OrderStatus = newOrder.status;
      const orderId = context.params.docId;

      let fcmToken = "";
      await getUserFCMToken(db, newOrder.customerId).then(
        (token) => (fcmToken = token)
      );

      let bikerName = "";
      await getBikerName(db, newOrder.bikerId).then(
        (name) => (bikerName = name)
      );

      if (fcmToken != "") {
        if (newOrderStatus == "Pending") {
          sendMessagePending(orderId, fcmToken);
        } else if (newOrderStatus == "Finished") {
          sendMessageRating(orderId, fcmToken);
        } else if (newOrderStatus == "AcceptedByBiker") {
          sendMessageAcceptedBiker(orderId, fcmToken, bikerName);
        } else if (newOrderStatus == "Arriving") {
          sendMessageArriving(orderId, fcmToken, bikerName);
        }
      }

      // Crear una copia del objeto pero que sea compatible
      const updatedOrder = {
        ...newOrder,
      };

      const orderDocRef = doc(db, `${FirestoreCollections.orders}/${orderId}`);
      await updateDoc(orderDocRef, updatedOrder);

      resolve(0);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserFCMToken(
  db: Firestore,
  userId: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const customerRef = collection(db, FirestoreCollections.customers);
      const q = query(customerRef, where("firebaseUserId", "==", userId));
      const userSnapshot = await getDocs(q);

      const customerData = userSnapshot.docs[0].data() as Customer;

      if (!userSnapshot.empty && customerData.fcmToken) {
        resolve(customerData.fcmToken);
      } else {
        resolve("");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getBikerName(db: Firestore, bikerId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const bikersRef = collection(db, FirestoreCollections.bikers);
      const q = query(bikersRef, where("firebaseUserId", "==", bikerId));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const bikerData = userSnapshot.docs[0].data() as Biker;
        resolve(bikerData.firstName + " " + bikerData.lastName);
      } else {
        resolve("");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function sendMessagePending(
  orderId: string,
  fcmToken: string
): Promise<void> {
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
    } catch (error) {
      reject(error);
    }
  });
}

export function sendMessageAcceptedBiker(
  orderId: string,
  fcmToken: string,
  bikerName: string
): Promise<void> {
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
    } catch (error) {
      reject(error);
    }
  });
}

export function sendMessageArriving(
  orderId: string,
  fcmToken: string,
  bikerName: string
): Promise<void> {
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
    } catch (error) {
      reject(error);
    }
  });
}

export function sendMessageRating(
  orderId: string,
  fcmToken: string
): Promise<void> {
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
    } catch (error) {
      reject(error);
    }
  });
}
