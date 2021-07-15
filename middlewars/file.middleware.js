const {
  fileUploadEnum: {
    PHOTOS_MIMETYPES,
    VIDEOS_MIMETYPES,
    DOCS_MIMETYPES,
    PHOTO_MAX_SIZE,
    VIDEO_MAX_SIZE,
    DOCS_MAX_SIZE
  },
  statusCode
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');
const { fileValidator } = require('../validators');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      if (req.files) {
        const files = Object.values(req.files);

        const photos = [];
        const videos = [];
        const documents = [];

        for (const file of files) {
          const { name, size, mimetype } = file;

          if (PHOTOS_MIMETYPES.includes(mimetype)) {
            if (size > PHOTO_MAX_SIZE) {
              throw new ErrorHandler(
                statusCode.FILE_TOO_BIG,
                errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name),
                errorMessage.FILE_SIZE_IS_TOO_LARGE.code
              );
            }

            photos.push(file);
          } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
            if (size > VIDEO_MAX_SIZE) {
              throw new ErrorHandler(
                statusCode.FILE_TOO_BIG,
                errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name),
                errorMessage.FILE_SIZE_IS_TOO_LARGE.code
              );
            }

            videos.push(file);
          } else if (DOCS_MIMETYPES.includes(mimetype)) {
            if (size > DOCS_MAX_SIZE) {
              throw new ErrorHandler(
                statusCode.FILE_TOO_BIG,
                errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name),
                errorMessage.FILE_SIZE_IS_TOO_LARGE.code
              );
            }

            documents.push(file);
          } else {
            throw new ErrorHandler(
              statusCode.INVALID_FORMAT,
              errorMessage.INVALID_FORMAT.message,
              errorMessage.INVALID_FORMAT.code
            );
          }
        }

        req.photos = photos;
        req.documents = documents;
        req.videos = videos;
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAvatar: (req, res, next) => {
    try {
      if (req.photos) {
        if (req.photos.length > 1) {
          throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.JUST_ONE_PHOTO.message, errorMessage.JUST_ONE_PHOTO.code);
        }

        [req.avatar] = req.photos;
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkFilesCount: (req, res, next) => {
    try {
      const { documents, videos } = req;

      const file = documents || videos;

      if (file.length > 2) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.MAX_FILE_COUNT.message, errorMessage.MAX_FILE_COUNT.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkFilesPath: (req, res, next) => {
    try {
      const { files } = req.params;

      const { error } = fileValidator.fileExtensionValidator.validate(files);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.WRONG_FILE_LOAD.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
