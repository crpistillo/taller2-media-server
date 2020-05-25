bucket = require('../services/firebase.service');
const filename = 'prueba.png';

const options = {
    destination: 'new-image.png',
    resumable: true,
    validation: 'crc32c'
};

class FileService{
    constructor() {
    }

    /*
    Uploads a file to the firebase storage
     */
    //TODO: Generalizar para cualquier archivo (esta con uno de prueba)
    upload_file = (res) => {
        bucket.upload(filename.toString(), options, function(err, file) {
            if(err){
                console.log('There was an error uploading the file ' + filename.toString());
            }
            else {
                console.log('The file ' + filename.toString() + ' was successfully uploaded');
            }
        });
        res.send("Uploaded file");
    }
}

module.exports = new FileService();

