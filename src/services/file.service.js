const fs = require('../services/firebase.service');
let firebaseService;
let bucketName;
var messages = require('../constants/messages');

if(process.env.TESTING == 'true')
{
    bucketName = process.env.BUCKET_NAME_TEST;
    firebaseService = new fs(process.env.CREDENTIALS_TEST, bucketName)
}
else{
    bucketName = process.env.BUCKET_NAME;
    firebaseService = new fs(process.env.CREDENTIALS, bucketName)
}

firebaseService.initialize();
const bucket = firebaseService.bucket();

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

const DESCRIPTION_FIELD = 'description';

class FileService{
    constructor() {
        /**
         * Receives a video throw a multipart/formData and uploads it to Firebase Storage
         * @param{object} file - the file object of the video to upload
         * @param{object} fields - the fields containing the user email and the video title
         * @return{Promise} - a promise with the metadata of the uploaded video
         */
        this.uploadVideo = (file, fields) => {
            return new Promise((resolve, reject) => {
                this.updateOptions(uploadOptions, fields);
                bucket.upload(file.path, uploadOptions)
                    .then(() => {
                        resolve(this.generateMetadata(this.createPath(fields)));
                    })
                    .catch((err) => reject(err.message) );
            });
        }

        /**
         * Generates de metadata of the uploaded video by reading the file in the Firebase Storage
         * @param{string} fileName - the name of the video file from which the metadata will be generated
         * @return{JSON} - the name and the url of the uploaded video
         */
        this.generateMetadata = async (fileName) => {
            const [metadata] = await bucket.file(fileName).getMetadata();
            return {'file': fileName, 'size': metadata.size, 'updated': metadata.updated, 'url': this.generateUrl(fileName)};
        }

        /**
         * Creates the path needed to access the bucket
         * @param{object} fields - the fields of the multipart/form-data request
         * @return{string} - the bucket name
         */
        this.createPath = (fields) => {
            return fields['email'] + '/' + fields['title'];
        }

        /**
         * Generates a Signed Url to visualize the uploaded video by reading the file in the Firebase Storage
         * @param{string} fileName - the name of the video file from wich the url will be generated
         * @return{Object} - a signed url containing the video visualization
         */
        this.generateUrl = (fileName) => {
            return 'https://storage.googleapis.com/'+ bucketName +'/'+ fileName;
        }

        /**
         * Updates the options with wich the video will be uploaded based on the
         * received fields
         * @param{const} options - the options to be updated
         * @param{object} fields - the fields that may contain the description and destination
         */
        this.updateOptions = (options, fields) => {
            options['destination'] = this.createPath(fields);
            if(DESCRIPTION_FIELD in fields){
                options['metadata']['metadata']['info'] = fields[DESCRIPTION_FIELD];
            }
        }

        /**
         * Deletes the video from the Firebase storage
         * @param{object} query: the query containing the required fields to delete the video
         * @return{Promise}: A promise with an error message if an error has occurred
         */
        this.deleteVideo = (query) => {
            return new Promise((resolve, reject) => {
                this.deleteBucket(this.createPath(query))
                    .then(() => resolve())
                    .catch((err) => {
                        reject(err.message);
                    })
            });
        }

        /**
         * Deletes the bucket containing de name of the video 'fileName'
         * @param{string} fileName - the name of the bucket
         */
        this.deleteBucket = async(fileName) => {
            await bucket.file(fileName).delete();
        }

        /**
         * Lists all the metadata of the videos uploaded by the user
         * @param{string} user - the user email
         * @return{Promise} - a promise with the metadata list
         */
        this.getVideosByUser = (user) => {
            return new Promise((resolve, reject) => {
                this.listVideosByUser(user)
                    .then((videos) => {
                        this.generateMetadataByUser(videos)
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
        this.generateMetadataByUser = async(videos) => {
            const metadata = [];
            for(let i=0;i<videos.length;i++)
            {
                const m = await this.generateMetadata(videos[i].name)
                metadata.push(m)
            }
            return metadata;
        }

        /**
         * Lists all the video-files in the bucket filtered by the user-prefix
         * @param user{string} - the prefix with which the videos will be filtered
         * @return{Promise} - a promise with the list containing all the video-files uploaded by the user
         */
        this.listVideosByUser = async(user) => {
            const options = {
                prefix: user,
                autoPaginate: true,
            };

            const [videos] = await bucket.getFiles(options);
            return videos;
        }

    }
}

module.exports = FileService