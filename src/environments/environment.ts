// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: require('../../package.json').version,
  production: false,
  firebase: {
    apiKey: "AIzaSyC6tiDTPCzdGifUeTXgVUVNws2MP69hGSc",
    authDomain: "joshwckd.firebaseapp.com",
    projectId: "joshwckd",
    storageBucket: "joshwckd.appspot.com",
    messagingSenderId: "453554777874",
    appId: "1:453554777874:web:df693ba51ec6bb870a8dcb",
    measurementId: "G-4N39DTQ4K0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
