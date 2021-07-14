const {
  fileUploadEnum: {
    PHOTOS_MIMETYPES,
    PHOTO_MAX_SIZE
  },
  statusCode
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      if (req.files) {
        const files = Object.values(req.files);

        const photos = [];

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
          } else {
            throw new ErrorHandler(
              statusCode.INVALID_FORMAT,
              errorMessage.INVALID_FORMAT.message,
              errorMessage.INVALID_FORMAT.code
            );
          }
        }

        req.photos = photos;
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
  }
};
