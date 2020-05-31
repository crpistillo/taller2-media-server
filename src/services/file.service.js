bucket = require('../services/firebase.service');

const options = {
    //destination: 'new-image.png',
    resumable: true,
    validation: 'crc32c',
    //TODO: Cambiar, esto es de prueba
    metadata: {
        metadata: {
            info: 'Metadata de prueba'
        }
    }

};

class FileService{
    constructor() {

        /*
        Uploads a file from RAM to the firebase storage
         */
        this.uploadFile = (fileName) => {
            return new Promise((resolve, reject) => {
                this.validateFile(fileName)
                    .then(() => {
                        bucket.upload(fileName.toString(), options, function(err, file) {
                             if(err){
                                 console.log('There was an error uploading the file ' + fileName.toString());
                             }
                             else {
                                 console.log('The file ' + fileName.toString() + ' was successfully uploaded');
                             }
                         })
                        resolve(getMetadata(fileName));
                    })
                    .catch(function (err) {
                        reject(err);
                    })
            });
        }

        //TODO: Manejar excepciones
        async function getMetadata(fileName) {
            const [metadata] = await
                bucket.file(fileName.toString()).getMetadata();

            //TODO: Arreglar como se muestra en json
            const url = generateSignedUrl(fileName);
            return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated , 'url': url};
        }


        //TODO: Fijarse si tiene una extensión válida
        this.validateFile = (fileName) => {

            return new Promise((resolve, reject) => {
                if (!fileName){
                    reject('File name was not provided');
                } else {
                    resolve();
                }
            });
        }

        //TODO: Manejar excepciones
        //TODO: admitir videos
        async function generateSignedUrl(fileName) {
            // These options will allow temporary read access to the file
            const options = {
                version: 'v2', // defaults to 'v2' if missing.
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };

            // Get a v2 signed URL for the file
            const [url] = await bucket.file(fileName).getSignedUrl(options);

            console.log(url);

            return url;

        }

    }
}


module.exports = new FileService();

