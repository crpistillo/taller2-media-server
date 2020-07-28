const fs = require('fs');
const admin = require('firebase-admin');
const logger = require('../services/logger');

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
            logger.debug("Connecting to firebase")
            if (!fs.existsSync(this.serviceAccount) && this.serviceAccount) {
                try {
                    this.serviceAccount = JSON.parse(this.serviceAccount);
                }
                catch(error)
                {
                    logger.error("An error has ocurred while parsing the CREDENTIALS")
                }
            }
            try{
                admin.initializeApp(this.getConfig());
                logger.debug("Successful connection to firebase")
                admin.auth();
            }
            catch (e) {
                logger.error("An error has ocurred while certifying the CREDENTIALS")
            }

        }

        this.getConfig = () => {
            return {
                credential: admin.credential.cert(this.serviceAccount),
                storageBucket: this.bucketName
            };
        }

        this.bucket = () => {
            let bucket;
            try{
                bucket = admin.storage().bucket(this.bucketName);
            }
            catch (e) {
                logger.error("An error has ocurred when acceding the bucket", e)
            }
            return bucket;
        }
    }
}

module.exports = FirebaseService;


