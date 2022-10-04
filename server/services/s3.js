const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');
aws.config.update({
    secretAccessKey: keys.AWSS3ClientSecret,
    accessKeyId: keys.AWSS3ClientID,
    region: 'us-east-1'
});
s3 = new aws.S3();


module.exports = multer({
    storage: multerS3({
      s3: s3,
      bucket: keys.AWSS3Bucket,
      metadata: function (req, file, cb) {
        cb(null, Object.assign({}, req.body));
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + ".jpg")
      }
    })
  })