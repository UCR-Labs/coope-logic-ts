// * Fechas se pueden manejar con number1
// * otra opcion => https://firebase.google.com/docs/reference/js/firestore_.timestamp

// ? Types que son tecnicamente string, pero solo pueden tener estos 3 valores
export type UserRole = 'Admin' | 'User' | 'Biker';
export type UserStatus = 'Pending' | 'Approved' | 'Rejected';

// https://www.typescriptlang.org/docs/handbook/enums.html
// ? Enum con las colecciones de Firestore que usaremos
// ? Puede crecer conforme agreguemos mas colecciones
export enum FirestoreCollections {
  users = 'users',
  usersToReview = 'usersToReview',
  userNotes = 'userNotes',
  orders = 'orders',
  aggregatedStatistics = 'aggregatedStatistics',
}

// ? Representa un Usuario (puede ser Biker, Admin o Cliente)
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

// ? Usuario que debe ser aprobado por el administrador
export interface UserToReview {
  userId: string;
  firebaseUserId: string;
  created: number;
}

// ? Nota creada por el admin al aprobar o rechazar un usuario
export interface UserNote {
  userId: string;
  firebaseUserId: string;
  content: string;
  created: number;
}

// ? Una orden basica
export interface Order {
  title: string;
  content: string;
  created: number;
  modified: number;
}

// ? IDs de las estadisticas
export enum Statistics {
  adminUsers = 'ADMIN_USERS',
  bikerUsers = 'BIKER_USERS',
  regularUsers = 'REGULAR_USERS',
  usersToReview = 'USERS_TO_REVIEW',
}

// ? Representa una estadistica agregada de los datos que tenemos en firestore
export interface AggregatedStatistic {
  label: string;
  value: number;
  modified: number;
}
