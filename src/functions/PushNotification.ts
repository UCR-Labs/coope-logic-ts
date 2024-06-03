import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Obtains a document with the notification to send and performs the necessary logic
 * to send that notification to the corresponding devices
 */
export async function adminPushNotifications(
  title: string,
  body: string,
  tokens: string[]
): Promise<void> {
  const filteredTokens = tokens.filter((token) => token.length > 0);
  const messages = filteredTokens.map((token) => ({
    token: token,
    data: {
      title: title,
      body: body,
    },
  }));

  if (messages.length > 0) {
    await admin.messaging().sendAll(messages);
  }
}