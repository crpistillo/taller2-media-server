const admin = require('firebase-admin');

const bucketName = 'chotuve-5d909.appspot.com';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: bucketName //TODO: usar variable de enotnrno
});

var bucket = admin.storage().bucket(bucketName);

module.exports = bucket;