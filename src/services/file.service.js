bucket = require('../services/firebase.service');

const options = {
    //destination: 'new-image.png',
    resumable: true,
    validation: 'crc32c'
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

        async function get_metadata(file_name) {
            const [metadata] = await
                bucket.file(file_name.toString()).getMetadata();
                return {'file': metadata.name, 'size': metadata.size, 'updated': metadata.updated }
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
    }
}


module.exports = new FileService();

