const admin = require('firebase-admin');

const serviceAccount = require("../../media-server-a63df-firebase-adminsdk-33afb-58d3af03f2.json");

const bucketName = 'media-server-a63df.appspot.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://media-server-a63df.firebaseio.com/',
    storageBucket: bucketName //TODO: usar variable de enotnrno
});

var bucket = admin.storage().bucket(bucketName);

module.exports = bucket;