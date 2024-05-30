import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FirestoreCollections, Order, OrderStatus } from "rideTypes";

export const updateOrder = functions.firestore
  .document(FirestoreCollections.orders + "/{docId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const newOrder: Order = change.after.data() as Order;
    const newOrderStatus: OrderStatus = newOrder.status;
    const orderId = context.params.docId;

    let fcmToken = "";
    await getUserFCMToken(db, newOrder.customerId).then(
      (token) => (fcmToken = token)
    );

    let bikerName = "";
    await getBikerName(db, newOrder.bikerId).then((name) => (bikerName = name));

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
    db.collection(FirestoreCollections.orders).doc(orderId).update(newOrder);
    return 0;
  });

const getUserFCMToken = async (
  db: FirebaseFirestore.Firestore,
  userId: string
): Promise<string> => {
  const userSnapshot = await db
    .collection(FirestoreCollections.customers)
    .where("firebaseUserId", "==", userId)
    .get();

  if (!userSnapshot.empty && userSnapshot.docs[0].data().fcmToken) {
    return userSnapshot.docs[0].data().fcmToken;
  } else {
    return "";
  }
};

const getBikerName = async (
  db: FirebaseFirestore.Firestore,
  bikerId: string
): Promise<string> => {
  const userSnapshot = await db
    .collection(FirestoreCollections.bikers)
    .where("firebaseUserId", "==", bikerId)
    .get();

  if (!userSnapshot.empty) {
    // eslint-disable-next-line max-len
    return (
      userSnapshot.docs[0].data().firstName +
      " " +
      userSnapshot.docs[0].data().lastName
    );
  } else {
    return "";
  }
};

const sendMessagePending = async (orderId: string, fcmToken: string) => {
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
  admin.messaging().send(message);
};

const sendMessageAcceptedBiker = async (
  orderId: string,
  fcmToken: string,
  bikerName: string
) => {
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
  admin.messaging().send(message);
};

const sendMessageArriving = async (
  orderId: string,
  fcmToken: string,
  bikerName: string
) => {
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
  admin.messaging().send(message);
};

const sendMessageRating = async (orderId: string, fcmToken: string) => {
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
  admin.messaging().send(message);
};
