const serializedFile = require('../serialized/serializedFile');
const serializedVideo = require('../serialized/serializedVideo');

const user_1 = "user1@gmail.com";
const user_2 = "user2@gmail.com";
const user_3 = "user3@gmail.com";
const user_4 = "user4@gmail.com";
const user_5 = "user5@gmail.com";
const user_6 = "user6@gmail.com"
const user_7 = "user7@gmail.com"

const title_1 = "Video test 1";
const title_2 = "Video test 2";
const title_3 = "Video test 3";
const title_4 = "Video test 4";
const title_5 = "Video test 5";
const title_6 = "Video test 6";
const title_7 = "Video test 7";

module.exports = Object.freeze({
    USER_1: user_1,
    USER_2: user_2,
    USER_3: user_3,
    USER_4: user_4,
    USER_5: user_5,
    USER_6: user_6,
    USER_7: user_7,

    TITLE_1: title_1,
    TITLE_5: title_5,
    TITLE_6: title_6,

    VALID_FILES: {file: "prueba.mp4"},
    INVALID_FILES: {},

    FIELDS_1: { email: user_1, title: title_1 },
    FIELDS_2: { email: user_2, title: title_2},
    FIELDS_3: { email: user_3, title: title_3, description: "No description" },
    FIELDS_4: {email: user_4, title: title_4},
    FIELDS_5: {email: user_5, title: title_5},
    FIELDS_6: {email: user_6, title: title_6},
    FIELDS_7: {email: user_7, title: title_7},
    INVALID_FIELDS: {},

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
    METADATA_5: {
        file: user_5 + '/' + title_5,
        url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_5 + '/' + title_5
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
    USER_7_VIDEO_LIST_CONTROLLER: {
        user: user_7,
        videos: [
            {
                file: user_7 + '/' + title_7,
                url: 'https://storage.googleapis.com/' + process.env.BUCKET_NAME_TEST + '/' + user_7 + '/' + title_7
            }
        ]
    }





})