module.exports = Object.freeze({
    ERROR_JSON: '{"status": "Error", "message": "%s"}',
    SUCCESS_JSON: '{"status": "Success", "message": "%s"}',
    REQUEST_IS_NOT_MULTIPART: "Request data is not Multipart/FormData",
    REQUEST_IS_NOT_JSON: "Request data is not Json",
    MISSING_FIELDS_ERROR: "Missing fields in form",
    INVALID_FILE_NAME_OR_EXTENSION: "The file name or extension is not valid. It must be a .mp4",
    UPLOADING_VIDEO: "The video '%s' from user %s is trying to be uploaded",
    ERROR_UPLOADING: "An error has ocurred while uploading the file: %s",
    SUCCESS_ON_UPLOAD: "The video '%s' from user %s was successfully uploaded",
    SUCCESS_ON_DELETE: "The video %s from user %s was successfully deleted",
    DELETING_VIDEO: "The video '%s' from user %s is trying to be deleted",
    ERROR_DELETING: "An error has occurred while deleting the file: %s",
    USER_HAS_NO_VIDEOS: "The user %s does not exist or does not have videos uploaded.",
    USER_VIDEO_LIST: '{"user": "%s" , "videos": %s}',
    ERROR_IN_USER_VIDEO_LIST: "There was an error while generating the user's video list",
    ERROR_IN_USER_METADATA: "There was an error while generating the user's metadata list",
    GETTING_VIDEO: "The videos from user %s are being searched",
    SUCCESS_ON_GET: "The videos from user %s were successfully found"
});

