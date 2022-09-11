const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
aws.config.update({
    secretAccessKey: 'LrgFmsfRcBhtC/R9MtzsgrRX/YqbGUXcCBO6tYgC',
    accessKeyId: 'AKIAVGMENO5KDBB5ICYI',
    region: 'us-east-1'
});
s3 = new aws.S3();


module.exports = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'comercia-dev/products',
      metadata: function (req, file, cb) {
        cb(null, Object.assign({}, req.body));
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + ".jpg")
      }
    })
  })