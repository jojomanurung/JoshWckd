import * as functions from 'firebase-functions';
import { join } from 'path';

const universal = require(join(process.cwd(), "/dist/server/main"));

export const ssr = functions.https.onRequest(universal.app());

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
