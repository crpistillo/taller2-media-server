const serializedFile = require('../serialized/serializedFile');
const serializedVideo = require('../serialized/serializedVideo');

const user_1 = "caropistillo@gmail.com";
const user_2 = "cpistillo@fi.uba.ar";
const user_3 = "cpistillo.paideia@gmail.com";
const user_4 = "ecofriendly.ba@outlook.com.ar";
const title_1 = "Video de prueba 1";
const title_2 = "Video de prueba 2";
const title_3 = "Video de prueba 3";
const title_4 = "Video de prueba 4";

module.exports = Object.freeze({
    USER_1: user_1,
    USER_2: user_2,
    USER_3: user_3,
    USER_4: user_4,

    FIELDS_1: { email: user_1, title: title_1 },
    FIELDS_2: { email: user_2, title: title_2},
    FIELDS_3: { email: user_3, title: title_3, description: "No description" },
    FIELDS_4: {email: user_4, title: title_4},

    METADATA_1: {
        file: user_1 + '/' + title_1,
        url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_1 + '/' + title_1,
    },
    METADATA_2: {
        file: user_2 + '/' + title_2,
        url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_2 + '/' + title_2
    },
    METADATA_3: {
        file: user_3 + '/' + title_3,
        url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_3 + '/' + title_3
    },
    URL_1: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_1 + '/' + title_1,
    SERIALIZED_FILE: new serializedFile("prueba.mp4", "test/video_test.mp4"),
    SERIALIZED_BAD_FILE: new serializedFile("prueba.mov", "test/video_test.mp4"),
    SERIALIZED_NON_EXISTENT_FILE: new serializedFile("prueba.mp4", "video.mp4"),
    SUCCESS: "Success",
    SERIALIZED_VIDEO_A: new serializedVideo(user_1 + '/' + title_1),
    SERIALIZED_VIDEO_B: new serializedVideo(user_1 + '/Amazonas'),
    LIST_OPTIONS: {
        prefix: user_1,
        autoPaginate: true,
    },
    USER_2_VIDEO_LIST: [
        {
            file: user_2 + '/' + title_2,
            url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_2 + '/' + title_2
        }
    ],
    USER_4_VIDEO_LIST: [
        {
            file: user_4 + '/' + title_4,
            url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_4 + '/' + title_4
        }
    ],


})