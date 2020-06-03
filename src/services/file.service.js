bucket = require('../services/firebase.service');
var messages = require('../constants/messages');

const options = {
    resumable: true,
    validation: 'crc32c',
    contentType: 'video/mp4',
    metadata: {
        metadata: {
            info: 'No video description'
        }
    }
};

const VALID_EXTENSION = '.mp4';
const DESCRIPTION_FIELD = 'description';

class FileService{
    constructor() {
        /*
        Receives a video throw a multipart/formData and uploads it to Firebase Storage
        :param file: the file object of the video to upload
        :return: the metadata of the uploaded video
         */
        this.uploadVideo = (file, fields) => {
            return new Promise((resolve, reject) => {
                this.updateOptions(options, fields);

                if(!this.validFile(file.name))
                    reject(messages.INVALID_FILE_NAME_OR_EXTENSION);
                else{
                    bucket.upload(file.path, options)
                        .then(() => {
                            console.log('The video "' + fields.title + '" was successfully uploaded');
                            resolve(generateMetadata(file.name));
                        })
                        .catch((err) => reject(err) );
                }
            });
        }

        /*
        Generates de metadata of the uploaded video by reading the file in the Firebase Storage
        :param fileName: the name of the video file from which the metadata will be generated
        :return: the name, size, updated, url of the uploaded video
         */
        //TODO: Manejar excepciones
        async function generateMetadata(fileName) {
            const [metadata] = await bucket.file(fileName).getMetadata()
            const url = await generateSignedUrl(fileName);

            return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated , 'url': url};
        }

        this.createPath = (fields) => {
            return fields['email'] + '/' + fields['title'];
        }

        /*
        Validates the name of the file to be uploaded
        :param fileName: the name of the video file to be validated
        :return: a reject if the fileName is not valid
         */
        //TODO: Extender a otros formatos de video soportados
        this.validFile = (fileName) => {
            return (fileName.substr(-4)==VALID_EXTENSION);
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
                virtualHostedStyle: true
            };

            // Get a v2 signed URL for the file
            const [url] = await bucket.file(fileName).getSignedUrl(options);
            return url;
        }

        this.updateOptions = (options, fields) => {
            options['destination'] = this.createPath(fields);
            if(DESCRIPTION_FIELD in fields){
                options['metadata']['metadata']['info'] = fields[DESCRIPTION_FIELD];
            }
        }

        this.deleteVideo = (fields) => {
            return new Promise((resolve, reject) => {
                deleteBucket(this.createPath(fields))
                    .then(() => {
                        console.log("Successfully deleted");
                        resolve();
                    })
                    .catch((err) => {
                        console.log("Err");
                        reject(err);
                    })
            });
        }
        async function deleteBucket(fileName) {
            await bucket.file(fileName).delete();
        }


    }
}

module.exports = new FileService();

