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
        this.upload_file = (file_name) => {
            return new Promise((resolve, reject) => {
                this.validate_file(file_name)
                    .then(() => {
                        bucket.upload(file_name.toString(), options, function(err, file) {
                             if(err){
                                 console.log('There was an error uploading the file ' + filename.toString());
                             }
                             else {
                                 console.log('The file ' + file_name.toString() + ' was successfully uploaded');
                             }
                         })
                        resolve(get_metadata(file_name));
                    })
                    .catch(function (err) {
                        reject(err);
                    })
            });
        }

        //TODO: Manejar excepciones
        async function get_metadata(file_name) {
            const [metadata] = await
                bucket.file(file_name.toString()).getMetadata();

            //TODO: Arreglar como se muestra en json
            const url = generate_signed_url(file_name);
            return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated , 'url': url};
        }


        //TODO: Fijarse si tiene una extensión válida
        this.validate_file = (file_name) => {

            return new Promise((resolve, reject) => {
                if (!file_name){
                    reject('File name was not provided');
                } else {
                    resolve();
                }
            });
        }

        //TODO: Manejar excepciones
        //TODO: admitir videos
        async function generate_signed_url(file_name) {
            // These options will allow temporary read access to the file
            const options = {
                version: 'v2', // defaults to 'v2' if missing.
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };

            // Get a v2 signed URL for the file
            const [url] = await bucket.file(file_name).getSignedUrl(options);

            console.log(url);

            return url;

        }

    }
}


module.exports = new FileService();

