// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Your web app's Firebase configuration
  // firebase: {
  //   apiKey: "AIzaSyBpJwA3uYi_kjJh6UlBaCE2yDnvaLo9_5Q",
  //   authDomain: "sanminacomunications.firebaseapp.com",
  //   databaseURL: "https://sanminacomunications.firebaseio.com",
  //   projectId: "sanminacomunications",
  //   storageBucket: "sanminacomunications.appspot.com",
  //   messagingSenderId: "800152663182",
  //   appId: "1:800152663182:web:e1edbbefbb4a4bbbf705df",
  //   measurementId: "G-VQX74DLE0T"
  // },
  fcmKey: 'key=AAAAkYtejHk:APA91bEjqyrVYjgLiJ-omeOtXNwslB6OQRwDfIbvZh7ESDBSAax_RwkOHaCj-JyA1ai6LROhuSi085GUhnP9xMRyLq4Dw5rJeQRbQpu6vgkIdoKCyQoGrKRDCy-U4bfU5VbUvOCiCFOF'
};





/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export interface Topic{
  nombre:string;
  check:boolean;
  topic:string;
}