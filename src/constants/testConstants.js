const serializedFile = require('../serialized/serializedFile');
const serializedVideo = require('../serialized/serializedVideo');

module.exports = Object.freeze({
    FIELDS: { email: 'caropistillo@gmail.com', title: 'Video de prueba' },
    FIELDS_2: { email: 'cpistillo@fi.uba.ar', title: 'Video de prueba 2' },
    FIELDS_3: { email: 'cpistillo@gmail.com', title: 'Video de prueba 3', description: "No description" },
    METADATA: {
        file: 'caropistillo@gmail.com/Video de prueba',
        url: 'https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistillo%40gmail.com/Video%20de%20prueba'
    },
    METADATA_3: {
        file: 'cpistillo@gmail.com/Video de prueba 3',
        url: 'https://chotuve-5d909.appspot.com.storage.googleapis.com/cpistillo%40gmail.com/Video%20de%20prueba%203'
    },
    URL: "https://chotuve-5d909.appspot.com.storage.googleapis.com/caropistillo%40gmail.com/Video%20de%20prueba",
    SERIALIZED_FILE: new serializedFile("prueba.mp4", "test/video_test.mp4"),
    SERIALIZED_BAD_FILE: new serializedFile("prueba.mov", "test/video_test.mp4"),
    SERIALIZED_NON_EXISTENT_FILE: new serializedFile("prueba.mp4", "video.mp4"),
    SUCCESS: "Success",
    SERIALIZED_VIDEO_A: new serializedVideo("caropistillo@gmail.com/Video de prueba"),
    SERIALIZED_VIDEO_B: new serializedVideo("caropistillo@gmail.com/Amazonas"),
    USER: "caropistillo@gmail.com",
    USER_2: "cpistillo@fi.uba.ar",
    LIST_OPTIONS: {
        prefix: "caropistillo@gmail.com",
        autoPaginate: true,
    },
    USER_2_VIDEO_LIST: [
        {
            file: 'cpistillo@fi.uba.ar/Video de prueba 2',
            url: 'https://chotuve-5d909.appspot.com.storage.googleapis.com/cpistillo%40fi.uba.ar/Video%20de%20prueba%202'
        }
    ]

})