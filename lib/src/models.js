"use strict";
// * Fechas se pueden manejar con number1
// * otra opcion => https://firebase.google.com/docs/reference/js/firestore_.timestamp
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistics = exports.FirestoreCollections = void 0;
// https://www.typescriptlang.org/docs/handbook/enums.html
// ? Enum con las colecciones de Firestore que usaremos
// ? Puede crecer conforme agreguemos mas colecciones
var FirestoreCollections;
(function (FirestoreCollections) {
    FirestoreCollections["users"] = "users";
    FirestoreCollections["usersToReview"] = "usersToReview";
    FirestoreCollections["userNotes"] = "userNotes";
    FirestoreCollections["orders"] = "orders";
    FirestoreCollections["aggregatedStatistics"] = "aggregatedStatistics";
})(FirestoreCollections || (exports.FirestoreCollections = FirestoreCollections = {}));
// ? IDs de las estadisticas
var Statistics;
(function (Statistics) {
    Statistics["adminUsers"] = "ADMIN_USERS";
    Statistics["bikerUsers"] = "BIKER_USERS";
    Statistics["regularUsers"] = "REGULAR_USERS";
    Statistics["usersToReview"] = "USERS_TO_REVIEW";
})(Statistics || (exports.Statistics = Statistics = {}));
//# sourceMappingURL=models.js.map