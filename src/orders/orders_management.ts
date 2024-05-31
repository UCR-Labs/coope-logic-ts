import { Change, EventContext } from "firebase-functions";
import * as admin from "firebase-admin";
import { FirestoreCollections, Order, OrderStatus } from "rideTypes";

export function updateOrder(
  change: Change<admin.firestore.DocumentSnapshot>,
  context: EventContext
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = admin.firestore();
      const newOrder: Order = change.after.data() as Order;
      const newOrderStatus: OrderStatus = newOrder.status;
      const orderId = context.params.docId;

      let fcmToken = await getUserFCMToken(db, newOrder.customerId);

      let bikerName = await getBikerName(db, newOrder.bikerId);

      if (fcmToken != "") {
        if (newOrderStatus == "Pending") {
          await sendMessagePending(orderId, fcmToken);
        } else if (newOrderStatus == "Finished") {
          await sendMessageRating(orderId, fcmToken);
        } else if (newOrderStatus == "AcceptedByBiker") {
          await sendMessageAcceptedBiker(orderId, fcmToken, bikerName);
        } else if (newOrderStatus == "Arriving") {
          await sendMessageArriving(orderId, fcmToken, bikerName);
        }
      }
      await db
        .collection(FirestoreCollections.orders)
        .doc(orderId)
        .update(newOrder);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserFCMToken(
  db: FirebaseFirestore.Firestore,
  userId: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const userSnapshot = await db
        .collection(FirestoreCollections.customers)
        .where("firebaseUserId", "==", userId)
        .get();

      if (!userSnapshot.empty && userSnapshot.docs[0].data().fcmToken) {
        resolve(userSnapshot.docs[0].data().fcmToken);
      } else {
        resolve("");
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getBikerName(
  db: FirebaseFirestore.Firestore,
  bikerId: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const userSnapshot = await db
        .collection(FirestoreCollections.bikers)
        .where("firebaseUserId", "==", bikerId)
        .get();

      if (!userSnapshot.empty) {
        // eslint-disable-next-line max-len
        resolve(
          userSnapshot.docs[0].data().firstName +
            " " +
            userSnapshot.docs[0].data().lastName
        );
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
          // eslint-disable-next-line max-len
          body: "Nuestros colaboradores de RIDE han procesado tu orden. ¿Te gustaría continuar con el pedido?",
        },
        data: {
          orderId: orderId,
        },
      };
      await admin.messaging().send(message);
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
          // eslint-disable-next-line max-len
          body: `El ciclista ${bikerName} ya va en camino.`,
        },
        data: {
          orderId: orderId,
        },
      };
      await admin.messaging().send(message);
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
          // eslint-disable-next-line max-len
          body: `${bikerName} esta llegando.`,
        },
        data: {
          orderId: orderId,
        },
      };
      await admin.messaging().send(message);
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
          // eslint-disable-next-line max-len
          body: "En RIDE valoramos tu opinión. Califica como fue tu experiencia",
        },
        data: {
          orderId: orderId,
        },
      };
      await admin.messaging().send(message);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
