import { Firestore } from "@google-cloud/firestore";

export function handleUserFcmTokenUpdate(
  userId: string,
  fcmToken: string,
  collectionName: string,
  db: Firestore
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let response: any;
    try {
      await updateFCMToken({ uid: userId, fcmToken, collectionName }, db);

      response.status(200).send({
        message: "El FCMtoken actualizado exitosamente",
      });

      resolve(response);
    } catch (error) {
      console.error("Error al actualizar el FCMtoken", error);

      response.status(500).send({
        error: "No se pudo actualizar el FCMtoken correctamente",
      });
      reject(response);
    }
  });
}

export function updateFCMToken(
  {
    uid,
    fcmToken,
    collectionName,
  }: {
    uid: string;
    fcmToken: string;
    collectionName: string;
  },
  db: Firestore
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const userCollection = db.collection(collectionName);
      const userDocRef = userCollection.doc(uid);
      userDocRef.update({ fcmToken: fcmToken });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
