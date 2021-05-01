// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://localhost:8000/',
  api: 'http://localhost:8000/api',
  mapbox: {
    apiKey: 'pk.eyJ1IjoicmljaDk3IiwiYSI6ImNrazhibTZkZjA1dW4yb29icmpvemV6MTYifQ.6Rl26zo_E9S3T2SYRe0I-w'
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
