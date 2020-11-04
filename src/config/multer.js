const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME } = process.env;

aws.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
});

const storageS3 = multerS3({
  s3: new aws.S3(),
  bucket: S3_BUCKET_NAME,
  acl: 'public-read',
  key: (req, file, cb) => {
    const { tokenUser, body } = req;
    const { id } = body;

    // Foto de perfil
    if (req.url === '/profile-photo') {
      const userId = id || tokenUser._id;

      if (id && tokenUser.role !== 'admin' && tokenUser._id !== id) {
        cb('Você não tem permissão para alterar outro usuário.', false);
      } else {
        cb(null, `public/profile/${userId}`);
      }
    }
  },
});

const fileUpload = {
  storage: storageS3,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb('Invalid file type.', false);
    }
  },
};

module.exports = fileUpload;
