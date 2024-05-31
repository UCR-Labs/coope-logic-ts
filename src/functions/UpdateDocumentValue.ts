import { Firestore, DocumentData } from "firebase/firestore";

export function updateDocumentValue(
  firestore: Firestore,
  doc: (firestore: Firestore, collection: string, docId: string) => any,
  getDoc: (docRef: any) => Promise<any>,
  setDoc: (docRef: any, data: Partial<DocumentData>, options: { merge: boolean }) => Promise<void>,
  docId: string,
  data: Partial<DocumentData>,
  collection: string
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const orderSettingDoc = doc(firestore, collection, docId);
      const orderSettingsSnapshot = await getDoc(orderSettingDoc);
  
      if (orderSettingsSnapshot.exists()) {
        await setDoc(orderSettingDoc, data, { merge: true });
        resolve();
      } else {
        reject(new Error('Document does not exist.'));
      }
    } catch (error) {
      reject(error);
    }
  });
}