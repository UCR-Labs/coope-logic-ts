### Estado de Uso de Funciones en Proyectos

Este documento contiene una tabla que muestra el estado de uso de cada función en cuatro proyectos diferentes. Cada celda indicará si la función está siendo utilizada (`Sí`) o no (`No`) en el proyecto correspondiente.

| Función                        | Descripción                                 | Coope-Client | Coope-Web  | Coope-Business | Proyecto 4 |
|--------------------------------|---------------------------------------------|--------------|------------|----------------|------------|
| **src/functions/**             |                                             |              |            |                |            |
| Average.ts                     | Calcula el valor promedio de un conjunto de datos |    No        |    No      |    No          |            |
| Businesses.ts                  | Gestiona la lógica relacionada con los negocios |    No        |    No      |    No          |            |
| Encryption.ts                  | Proporciona funciones de cifrado y descifrado de datos |    No        |    No      |    No          |            |
| Endpoints.ts                   | Define los endpoints de la API              |    No        |    No      |    No          |            |
| Fcm_management.ts              | Gestiona la mensajería de Firebase Cloud Messaging (FCM) |    No        |    No      |    No          |            |
| GoogleMaps.ts                  | Interactúa con la API de Google Maps        |    No        |    No      |    No          |            |
| Orders_management.ts           | Gestiona la lógica relacionada con los pedidos |    No        |    No      |    No          |            |
| Products.ts                    | Gestiona la lógica relacionada con los productos |    No        |    No      |    No          |            |
| UpdateDocumentValue.ts         | Actualiza el valor de un documento en la base de datos |    No        |    No      |    No          |            |
| **src/orders/**                |                                             |              |            |                |            |
| serviceCost.ts                 | Calcula el costo del servicio               |    No        |    No      |    No          |            |
| **src/ratings/**               |                                             |              |            |                |            |
| average_rating_management.ts   | Gestiona el cálculo de la calificación promedio |    No        |    No      |    No          |            |
| ratings_management.ts          | Gestiona las calificaciones de los usuarios |    No        |    No      |    No          |            |
| **src/storage/**               |                                             |              |            |                |            |
| Cache.ts                       | Gestiona la caché en memoria                |    No        |    No      |    No          |            |
| LocalStorage.ts                | Gestiona el almacenamiento local del navegador |    Sí        |    Sí      |    Sí          |            |

## Leyenda

- **Sí**: La función está siendo utilizada en el proyecto.
- **No**: La función no está siendo utilizada en el proyecto.

### Coope-Client: Uso de Funciones

En el archivo `orders-history.page.ts` del proyecto Coope-Client se están utilizando las siguientes funciones de la librería "logica":

- **localStorageSetKeyValue**: Se utiliza en la función `fetchOrdersFromFirebase` para guardar los datos de las órdenes en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `ngOnInit` para obtener los datos de las órdenes desde `localStorage`.
- **localStorageKeyExists**: Se utiliza en la función `ngOnInit` para verificar si los datos de las órdenes existen en `localStorage`.

En el archivo `product-details.page.ts` del proyecto Coope-Client se están utilizando las siguientes funciones de la librería "logica":

- **localStorageSetKeyValue**: Se utiliza en la función `ngOnInit` para guardar los datos del producto en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `ngOnInit` para obtener los datos del producto desde `localStorage`.
- **localStorageKeyExists**: Se utiliza en la función `ngOnInit` para verificar si los datos del producto existen en `localStorage`.

### Coope-Web: Uso de Funciones

En el archivo `config.service.ts` del proyecto Coope-Web se están utilizando las siguientes funciones de la librería "logica":

- **localStorageSetKeyValue**: Se utiliza en las funciones `setSinpeInLocalStorage`, `updateSinpeInLocalStorage` para guardar los datos en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `updateSinpeInLocalStorage` para obtener los datos desde `localStorage`.

En el archivo `tag.service.ts` del proyecto Coope-Web se están utilizando las siguientes funciones de la librería "logica":

- **localStorageSetKeyValue**: Se utiliza en las funciones `updateLocalStorage`, `updateLocalStorage` para guardar los datos en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `readTags` para obtener los datos desde `localStorage`.

En el archivo `theme.service.ts` del proyecto Coope-Web se están utilizando las siguientes funciones de la librería "logica":

- **localStorageSetKeyValue**: Se utiliza en las funciones `updateColorInLocalStorage`, `setColorInLocalStorage` para guardar los datos en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `updateColorInLocalStorage` para obtener los datos desde `localStorage`.

### Coope-Business: Uso de Funciones

En el archivo `view-product-list-page.ts` del proyecto Coope-Business se están utilizando las siguientes funciones de la librería "logica":
- **localStorageSetKeyValue**: Se utiliza en las funciones `getProductList` y `refreshTags` para guardar los datos en `localStorage`.
- **localStorageGetKeyValue**: Se utiliza en la función `ngOnInit` para obtener los datos desde `localStorage`.
- **localStorageKeyExists**: Se utiliza en la función `ngOnInit` para verificar si los datos existen en `localStorage`.
