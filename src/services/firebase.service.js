const admin = require('firebase-admin');

const serviceAccount = require("../../service-account-file.json");

const bucketName = 'chotuve-5d909.appspot.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName //TODO: usar variable de enotnrno
});

var bucket = admin.storage().bucket(bucketName);

module.exports = bucket;