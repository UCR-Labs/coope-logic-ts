/**
 * Obtains a document with the notification to send and performs the necessary logic
 * to send that notification to the corresponding devices
 */
export declare function adminPushNotifications(title: string, body: string, tokens: string[]): Promise<void>;
