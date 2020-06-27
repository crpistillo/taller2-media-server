bucket = require('../services/firebase.service');
var messages = require('../constants/messages');

const uploadOptions = {
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
        /**
         * Receives a video throw a multipart/formData and uploads it to Firebase Storage
         * @param{formidable.file} file - the file object of the video to upload
         * @return{Promise} - a promise with the metadata of the uploaded video
         */
        this.uploadVideo = (file, fields) => {
            return new Promise((resolve, reject) => {
                this.updateOptions(uploadOptions, fields);
                if(!this.validFile(file.name))
                    reject(messages.INVALID_FILE_NAME_OR_EXTENSION);
                else{
                    bucket.upload(file.path, uploadOptions)
                        .then(() => {
                            resolve(generateMetadata(this.createPath(fields)));
                        })
                        .catch((err) => reject(err) );
                }
            });
        }

        /**
         * Generates de metadata of the uploaded video by reading the file in the Firebase Storage
         * @param{string} fileName - the name of the video file from which the metadata will be generated
         * @return{JSON} - the name, size, updated, url of the uploaded video
         */
        async function generateMetadata(fileName) {
            const [metadata] = await bucket.file(fileName).getMetadata()
            const url = await generateSignedUrl(fileName);

            return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated , 'url': url};
        }

        /**
         * Creates the path needed to access the bucket
         * @param{formidable.fields} - fields: the fields of the multipart/form-data request
         * @return{string} - the bucket name
         */
        this.createPath = (fields) => {
            return fields['email'] + '/' + fields['title'];
        }

        /**
         * Validates the name of the file to be uploaded
         * @param{string} fileName - the name of the video file to be validated
         * @return{Boolean} - true or false if the file name is valid or not
         */
        //TODO: Extender a otros formatos de video soportados
        this.validFile = (fileName) => {
            return (fileName.substr(-4)==VALID_EXTENSION);
        }

        /**
         * Generates a Signed Url to visualize the uploaded video by reading the file in the Firebase Storage
         * @param{string} fileName - the name of the video file from wich the url will be generated
         * @return{Object} - a signed url containing the video visualization
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
            return url.toString().substring(0, url.toString().indexOf('?GoogleAccessId'));
        }

        /**
         * Updates the options with wich the video will be uploaded based on the
         * received fields
         * @param{const} options - the options to be updated
         * @param{formidable.fields} - fields: the fields that may contain the description and destination
         */
        this.updateOptions = (options, fields) => {
            options['destination'] = this.createPath(fields);
            if(DESCRIPTION_FIELD in fields){
                options['metadata']['metadata']['info'] = fields[DESCRIPTION_FIELD];
            }
        }

        /**
         * Deletes the video from the Firebase storage
         * @param{express.Request.query} query: the query containing the required fields to delete the video
         * @return{Promise}: A promise with an error message if an error has occurred
         */
        this.deleteVideo = (query) => {
            return new Promise((resolve, reject) => {
                deleteBucket(this.createPath(query))
                    .then(() => resolve())
                    .catch(() => {
                        reject(messages.NON_EXISTING_FILE_ERROR);
                    })
            });
        }

        /**
         * Deletes the bucket containing de name of the video 'fileName'
         * @param{string} fileName - the name of the bucket
         */
        async function deleteBucket(fileName) {
            await bucket.file(fileName).delete();
        }

        /**
         * Lists all the metadata of the videos uploaded by the user
         * @param{string} user - the user email
         * @return{Promise} - a promise with the metadata list
         */
        this.getVideosByUser = (user) => {
            return new Promise((resolve, reject) => {
                listVideosByUser(user)
                    .then((videos) => {
                        generateMetadataByUser(videos)
                            .then((metadata) => resolve(metadata))
                            .catch(() => reject(messages.ERROR_IN_USER_METADATA))
                    })
                    .catch(()=> reject(messages.ERROR_IN_USER_VIDEO_LIST))
            });}

        /**
         * Generates the metadata for every video in the list given
         * @param{Array} videos - the list containing the video-files of the user requested
         * @return{Promise} - a promise with the list containing the all the video-metadata of the user
         */
        async function generateMetadataByUser(videos) {
            const metadata = [];
            for(let i=0;i<videos.length;i++)
            {
                const m = await generateMetadata(videos[i].name)
                metadata.push(m)
            }
            return metadata;
        }

        /**
         * Lists all the video-files in the bucket filtered by the user-prefix
         * @param user{string} - the prefix with which the videos will be filtered
         * @return{Promise} - a promise with the list containing all the video-files uploaded by the user
         */
        async function listVideosByUser(user) {
            const options = {
                prefix: user,
                autoPaginate: true,
            };

            const [videos] = await bucket.getFiles(options);
            return videos;
        }


        async function listAllVideos() {
            // Lists files in the bucket
            const [videos] = await bucket.getFiles();

            return videos;
            /*
            files.forEach(file => {
                console.log(file.name);
            });*/
        }

    }
}

module.exports = new FileService();