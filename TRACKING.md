### Estado de Uso de Funciones en Proyectos

Este documento contiene una tabla que muestra el estado de uso de cada función en cuatro proyectos diferentes. Cada celda indicará si la función está siendo utilizada (`Sí`) o no (`No`) en el proyecto correspondiente.

| Función                        | Descripción                                 | Coope-Client | Proyecto 2 | Proyecto 3 | Proyecto 4 |
|--------------------------------|---------------------------------------------|--------------|------------|------------|------------|
| **src/functions/**             |                                             |              |            |            |            |
| Average.ts                     | Calcula el valor promedio de un conjunto de datos |              |            |            |            |
| Businesses.ts                  | Gestiona la lógica relacionada con los negocios |              |            |            |            |
| Encryption.ts                  | Proporciona funciones de cifrado y descifrado de datos |              |            |            |            |
| Endpoints.ts                   | Define los endpoints de la API              |              |            |            |            |
| Fcm_management.ts              | Gestiona la mensajería de Firebase Cloud Messaging (FCM) |              |            |            |            |
| GoogleMaps.ts                  | Interactúa con la API de Google Maps        |              |            |            |            |
| Orders_management.ts           | Gestiona la lógica relacionada con los pedidos |              |            |            |            |
| Products.ts                    | Gestiona la lógica relacionada con los productos |              |            |            |            |
| UpdateDocumentValue.ts         | Actualiza el valor de un documento en la base de datos |              |            |            |            |
| **src/orders/**                |                                             |              |            |            |            |
| serviceCost.ts                 | Calcula el costo del servicio               |              |            |            |            |
| **src/ratings/**               |                                             |              |            |            |            |
| average_rating_management.ts   | Gestiona el cálculo de la calificación promedio |              |            |            |            |
| ratings_management.ts          | Gestiona las calificaciones de los usuarios |              |            |            |            |
| **src/storage/**               |                                             |              |            |            |            |
| Cache.ts                       | Gestiona la caché en memoria                |              |            |            |            |
| LocalStorage.ts                | Gestiona el almacenamiento local del navegador |    Sí        |            |            |            |

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
