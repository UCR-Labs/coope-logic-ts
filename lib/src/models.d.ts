export type UserRole = 'Admin' | 'User' | 'Biker';
export type UserStatus = 'Pending' | 'Approved' | 'Rejected';
export declare enum FirestoreCollections {
    users = "users",
    usersToReview = "usersToReview",
    userNotes = "userNotes",
    orders = "orders",
    aggregatedStatistics = "aggregatedStatistics"
}
export interface User {
    firebaseUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    created: number;
    modified: number;
}
export interface UserToReview {
    userId: string;
    firebaseUserId: string;
    created: number;
}
export interface UserNote {
    userId: string;
    firebaseUserId: string;
    content: string;
    created: number;
}
export interface Order {
    title: string;
    content: string;
    created: number;
    modified: number;
}
export declare enum Statistics {
    adminUsers = "ADMIN_USERS",
    bikerUsers = "BIKER_USERS",
    regularUsers = "REGULAR_USERS",
    usersToReview = "USERS_TO_REVIEW"
}
export interface AggregatedStatistic {
    label: string;
    value: number;
    modified: number;
}
