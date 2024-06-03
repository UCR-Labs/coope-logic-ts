import * as admin from 'firebase-admin';
import { FirestoreCollections, ConfigItem } from 'rideTypes';

const db = admin.firestore();

export const getKilometerPrice = async (): Promise<number> => 
{
  const configQuerySnapshot = await db
    .collection(FirestoreCollections.configItems)
    .limit(1)
    .get();

  if (configQuerySnapshot.empty) {
    throw new Error('No config documents found.');
  }

  const configDoc = configQuerySnapshot.docs[0];
  const configData = configDoc.data() as ConfigItem;

  if (!configData || configData.kilometerPrice === undefined) {
    throw new Error('Kilometer price not found in config.');
  }

  return configData.kilometerPrice;
};


export async function calculateServiceCost(distance: number): Promise<number>
{
  const baseCost = 1300;
  const baseDistance = 2000;
  let extraCost = 0;
  const kilometerPrice = await getKilometerPrice();

  if (distance > baseDistance) 
  {
    const distanceInKM = (distance - baseDistance) / 1000;
    extraCost = Math.ceil(distanceInKM) * kilometerPrice;
  }

  return baseCost + extraCost;
};