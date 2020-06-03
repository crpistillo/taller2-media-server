module.exports = Object.freeze({
    ERROR_JSON: '{"status": "Error", "message": "%s"}',
    SUCCESS_JSON: '{"status": "Success", "message": "%s"}',
    REQUEST_IS_NOT_MULTIPART: "Request data is not Multipart/FormData",
    REQUEST_IS_NOT_JSON: "Request data is not Json",
    MISSING_FIELDS_ERROR: "Missing fields in form",
    INVALID_FILE_NAME_OR_EXTENSION: "The file name or extension is not valid",
    ERROR_UPLOADING: "An error has ocurred while uploading the file: %s",
    SUCCESS_ON_DELETE: "The video under the title '%s' was successfully deleted",
    NON_EXISTING_FILE_ERROR: "The video to be deleted does not exist",
    USER_HAS_NO_VIDEOS: "The user you are looking for does not have videos uploaded.",
    USER_VIDEO_LIST: '{"user": "%s" , "videos": %s}',
    ERROR_IN_USER_METADATA: "There was an error while generating the user's metadata list",
    ERROR_IN_USER_VIDEO_LIST: "There was an error while generating the user's video list"
});

