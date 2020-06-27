const admin = require('firebase-admin');

const bucketName = process.env.BUCKET_NAME;

admin.initializeApp({
    credential: admin.credential.cert(process.env.CREDENTIALS),
    storageBucket: bucketName
});

var bucket = admin.storage().bucket(bucketName);

module.exports = bucket;