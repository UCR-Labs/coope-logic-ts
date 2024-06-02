import { Firestore } from "@google-cloud/firestore";
import { FirestoreCollections, Statistics, AggregatedStatistic } from './models';

export async function increaseUserToReviewStatistics(
    db: Firestore
): Promise<void> {
    try {
      const statisticsObj = await db
        .collection(FirestoreCollections.aggregatedStatistics)
        .doc(Statistics.usersToReview)
        .get();
  
      let updatedStatistics: AggregatedStatistic;
      if (statisticsObj.exists && statisticsObj.data()) {
        updatedStatistics = statisticsObj.data() as AggregatedStatistic;
        updatedStatistics.value += 1;
        updatedStatistics.modified = new Date().getTime();
        await db
          .collection(FirestoreCollections.aggregatedStatistics)
          .doc(Statistics.usersToReview)
          .set(updatedStatistics as any);
      } else {
        updatedStatistics = {
          label: FirestoreCollections.usersToReview,
          modified: new Date().getTime(),
          value: 1,
        };
        await db
          .collection(FirestoreCollections.aggregatedStatistics)
          .doc(Statistics.usersToReview)
          .set(updatedStatistics);
      }
    } catch (error) {
      console.error('Error increasing user to review statistics:', error);
      throw error;
    }
  }
  
  export async function decreaseUserToReviewStatistics(
        db: Firestore
  ): Promise<void> {
    try {
      const statisticsObj = await db
        .collection(FirestoreCollections.aggregatedStatistics)
        .doc(Statistics.usersToReview)
        .get();
      let updatedStatistics: AggregatedStatistic;
      if (!!statisticsObj && !!statisticsObj.data()) {
        updatedStatistics = statisticsObj.data() as AggregatedStatistic;
        if (updatedStatistics.value > 0) {
          updatedStatistics.value -= 1;
        } else {
          updatedStatistics.value = 0;
        }
        updatedStatistics.modified = new Date().getTime();
        await db
          .collection(FirestoreCollections.aggregatedStatistics)
          .doc(Statistics.usersToReview)
          .set(updatedStatistics as any);
      } else {
        updatedStatistics = {
          label: FirestoreCollections.usersToReview,
          modified: new Date().getTime(),
          value: 1,
        };
        await db
          .collection(FirestoreCollections.aggregatedStatistics)
          .doc(Statistics.usersToReview)
          .set(updatedStatistics);
      }
    } catch (error) {
      console.error('Error decreasing user to review statistics:', error);
      throw error;
    }
  }