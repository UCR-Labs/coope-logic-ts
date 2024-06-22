# Análisis de Funciones para la Versión 2.0.0

Este documento enumera todas las funciones disponibles en el proyecto, junto con su estado de revisión para la inclusión o eliminación en la versión 2.0.0 de la librería.

## Funciones

### src/functions/

- **Average.ts**
  - **Descripción:** Calcula el valor promedio de un conjunto de datos.
  - **Estado de Revisión:** Pendiente

- **Businesses.ts**
  - **Descripción:** Gestiona la lógica relacionada con los negocios.
  - **Estado de Revisión:** Pendiente

- **Encryption.ts**
  - **Descripción:** Proporciona funciones de cifrado y descifrado de datos.
  - **Estado de Revisión:** Pendiente

- **Endpoints.ts**
  - **Descripción:** Define los endpoints de la API.
  - **Estado de Revisión:** Pendiente

- **Fcm_management.ts**
  - **Descripción:** Gestiona la mensajería de Firebase Cloud Messaging (FCM).
  - **Estado de Revisión:** Pendiente

- **GoogleMaps.ts**
  - **Descripción:** Interactúa con la API de Google Maps.
  - **Estado de Revisión:** Pendiente

- **Orders_management.ts**
  - **Descripción:** Gestiona la lógica relacionada con los pedidos.
  - **Estado de Revisión:** Pendiente

- **Products.ts**
  - **Descripción:** Gestiona la lógica relacionada con los productos.
  - **Estado de Revisión:** Pendiente

- **UpdateDocumentValue.ts**
  - **Descripción:** Actualiza el valor de un documento en la base de datos.
  - **Estado de Revisión:** Pendiente

### src/orders/

- **serviceCost.ts**
  - **Descripción:** Calcula el costo del servicio.
  - **Estado de Revisión:** Pendiente

### src/ratings/

- **average_rating_management.ts**
  - **Descripción:** Gestiona el cálculo de la calificación promedio.
  - **Estado de Revisión:** Pendiente

- **ratings_management.ts**
  - **Descripción:** Gestiona las calificaciones de los usuarios.
  - **Estado de Revisión:** Pendiente

### src/storage/

- **Cache.ts**
  - **Descripción:** Gestiona la caché en memoria.
  - **Estado de Revisión:** Pendiente

- **LocalStorage.ts**
  - **Descripción:** Gestiona el almacenamiento local del navegador.
  - **Estado de Revisión:** Pendiente

## Detalles Adicionales del README.md

### Funciones de Caché

- **cacheSetKeyValue(key: string, value: any): Promise<void>**
  - **Descripción:** Establece un par clave-valor en la caché en memoria.
  - **Estado de Revisión:** Pendiente

- **cacheGetKeyValue(key: string): Promise<any>**
  - **Descripción:** Recupera el valor asociado con la clave especificada desde la caché en memoria.
  - **Estado de Revisión:** Pendiente

- **cacheKeyExists(key: string): Promise<boolean>**
  - **Descripción:** Verifica si la clave especificada existe en la caché en memoria.
  - **Estado de Revisión:** Pendiente

### Funciones de LocalStorage

- **localStorageSetKeyValue(key: string, value: any): Promise<void>**
  - **Descripción:** Establece un par clave-valor en el almacenamiento local del navegador.
  - **Estado de Revisión:** Pendiente

- **localStorageGetKeyValue(key: string): Promise<any>**
  - **Descripción:** Recupera el valor asociado con la clave especificada desde el almacenamiento local del navegador.
  - **Estado de Revisión:** Pendiente

- **localStorageKeyExists(key: string): Promise<boolean>**
  - **Descripción:** Verifica si la clave especificada existe en el almacenamiento local del navegador.
  - **Estado de Revisión:** Pendiente

### Funciones de Calificación

- **calculateAverageRatingForUser(userId: string, userType: UserType, newRating: number, db: Firestore): Promise<AverageRating>**
  - **Descripción:** Calcula la calificación promedio para un usuario basado en la nueva calificación proporcionada.
  - **Estado de Revisión:** Pendiente

- **getAverageRatings(userId: string, db: Firestore): Promise<any[]>**
  - **Descripción:** Recupera las calificaciones promedio para un usuario.
  - **Estado de Revisión:** Pendiente

### Funciones de Negocios

- **fetchBusinessesFromLocalStorage(): Promise<Business[]>**
  - **Descripción:** Recupera todos los negocios desde el almacenamiento local.
  - **Estado de Revisión:** Pendiente

- **fetchBusinessesFromFirebase(db: Firestore): Promise<Business[]>**
  - **Descripción:** Recupera todos los negocios desde Firebase.
  - **Estado de Revisión:** Pendiente

- **getBusinessById(db: Firestore, id: string): Promise<Business | null>**
  - **Descripción:** Recupera un negocio por ID desde el almacenamiento local.
  - **Estado de Revisión:** Pendiente

- **fetchBusinessFromFirebase(db: Firestore, id: string): Promise<Business | null>**
  - **Descripción:** Recupera un negocio por ID desde Firebase.
  - **Estado de Revisión:** Pendiente

