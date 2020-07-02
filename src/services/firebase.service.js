/*const admin = require('firebase-admin');

const bucketName = process.env.BUCKET_NAME;

admin.initializeApp({
    credential: admin.credential.cert(process.env.CREDENTIALS),
    storageBucket: bucketName
});

var bucket = admin.storage().bucket(bucketName);

module.exports = bucket;*/

const fs = require('fs');
const admin = require('firebase-admin');

class FirebaseService {
    /**
     * Constructor
     * @param {string} serviceAccount
     * @param {string} bucketName
     */

    constructor(serviceAccount, bucketName) {

        this.serviceAccount = serviceAccount;
        this.bucketName = bucketName;

        /**
         * Initialize connection
         * @returns {firebase.database.Reference}
         */

        this.initialize = () =>  {
            if (!fs.existsSync(this.serviceAccount) && this.serviceAccount) {
                this.serviceAccount = JSON.parse(this.serviceAccount);
            }
            admin.initializeApp(this.getConfig());
            admin.auth();
        }

        this.getConfig = () => {
            return {
                credential: admin.credential.cert(this.serviceAccount),
                storageBucket: this.bucketName
            };
        }

        this.bucket = () => {
            return admin.storage().bucket(this.bucketName);
        }
    }
}

module.exports = new FirebaseService(process.env.CREDENTIALS, process.env.BUCKET_NAME)



