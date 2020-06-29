const serializedFile = require('../serialized/serializedFile');
const serializedMetadata = require('../serialized/serializedMetadata');
const serializedVideo = require('../serialized/serializedVideo');

module.exports = Object.freeze({
    FIELDS: { email: 'caropistillo@gmail.com', title: 'Video de prueba' },
    URL: "https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistillo%40gmail.com/Video%20de%20prueba",
    METADATA: {
        "file": 'caropistillo@gmail.com/Video de prueba',
        "size": '1074291',
        "updated": '2020-06-29T06:47:48.276Z',
        "url": 'https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistillo%40gmail.com/Video%20de%20prueba'
    },
    SERIALIZED_FILE: new serializedFile("prueba.mp4", "/tmp/upload_f8b9568cfd66e68eead2d24df41e98a3"),
    URL_WITH_CREDENTIAL: "https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistillo%40gmail.com/Video%20de%20prueba%205?GoogleAccessId=CREDENTIALS",
    SERIALIZED_METADATA: new serializedMetadata("caropistillo@gmail.com/Video de prueba", "1074291", "2020-06-27T21:49:36.597Z"),
    SUCCESS: "Success",
    SERIALIZED_VIDEO_A: new serializedVideo("caropistillo@gmail.com/Video de prueba"),
    SERIALIZED_VIDEO_B: new serializedVideo("caropistillo@gmail.com/Amazonas"),
    USER: "caropistillo@gmail.com",
    LIST_OPTIONS: {
        prefix: "caropistillo@gmail.com",
        autoPaginate: true,
    },


})