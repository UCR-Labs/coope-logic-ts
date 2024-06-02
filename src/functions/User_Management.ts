import * as admin from 'firebase-admin';
import {
  User,
  FirestoreCollections,
  Statistics,
  AggregatedStatistic,
} from '../models';

export const increaseUserStatistics = async (valueCreated: User) => {
    const db = admin.firestore();

    let statisticsObjId = '';

    if (valueCreated.role === 'Admin') {
      statisticsObjId = Statistics.adminUsers;
    } else if (valueCreated.role === 'Biker') {
      statisticsObjId = Statistics.bikerUsers;
    } else if (valueCreated.role === 'User') {
      statisticsObjId = Statistics.regularUsers;
    }

    // * Busco en la coleccion de aggregatedStatistics
    // * el documento con las estadisticas que necesito
    const statisticsObj = await db
      .collection(FirestoreCollections.aggregatedStatistics)
      .doc(statisticsObjId)
      .get();

    let updatedStatistics: AggregatedStatistic;
    if (!!statisticsObj && !!statisticsObj.data()) {
      updatedStatistics = statisticsObj.data() as AggregatedStatistic;
      updatedStatistics.value += 1;
      updatedStatistics.modified = new Date().getTime();
      await db
        .collection(FirestoreCollections.aggregatedStatistics)
        .doc(statisticsObjId)
        .update(updatedStatistics as any);
    } else {
      updatedStatistics = {
        label: statisticsObjId,
        modified: new Date().getTime(),
        value: 1,
      };
      await db
        .collection(FirestoreCollections.aggregatedStatistics)
        .doc(statisticsObjId)
        .set(updatedStatistics);
    }

    return 0;
  };