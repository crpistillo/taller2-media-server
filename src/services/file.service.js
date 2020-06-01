bucket = require('../services/firebase.service');

const options = {
    resumable: true,
    validation: 'crc32c',
    contentType: 'video/mp4',
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
        Receives a video throw a multipart/formData and uploads it to Firebase Storage
        :param file: the file object of the video to upload
        :return: the metadata of the uploaded video
         */
        this.uploadVideo = (file) => {
            options['destination'] = file.name;
            return new Promise((resolve, reject) => {
                this.validateFile(file.name)
                    .then(() => {
                        bucket.upload(file.path, options, function(err, file) {
                             if(err){
                                 console.log(err);
                                 console.log('There was an error uploading the file ' + file.name);
                             }
                             else {
                                 console.log('The file ' + file.name + ' was successfully uploaded');
                             }
                         })
                        resolve(generateMetadata(file.name));
                    })
                    .catch(function (err) {
                        reject(err);
                    })
            });
        }

        /*
        Generates de metadata of the uploaded video by reading the file in the Firebase Storage
        :param fileName: the name of the video file from which the metadata will be generated
        :return: the name, size, updated, url of the uploaded video
         */
        //TODO: Manejar excepciones
        async function generateMetadata(fileName) {
            const [metadata] = await bucket.file(fileName).getMetadata();
            const url = await generateSignedUrl(fileName);

            return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated , 'url': url};
        }


        /*
        Validates the name of the file to be uploaded
        :param fileName: the name of the video file to be validated
        :return: a reject if the fileName is not valid
         */
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

        /*
        Generates a Signed Url to visualize the uploaded video by reading the file in the Firebase Storage
        :param fileName: the name of the video file from wich the url will be generated
        :return: a signed url containing the video visualization
         */
        async function generateSignedUrl(fileName) {
            // These options will allow temporary read access to the file
            const options = {
                version: 'v2', // defaults to 'v2' if missing.
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };

            // Get a v2 signed URL for the file
            const [url] = await bucket.file(fileName).getSignedUrl(options);
            return url;
        }
    }
}

module.exports = new FileService();

