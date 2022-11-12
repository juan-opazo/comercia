module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,//'', //process.env.GOOGLE_CLIENT_ID
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,//'',
    mongoURI: process.env.MONGO_URI,//'',
    cookieKey: process.env.COOKIE_KEY,//''
    AWSS3ClientID: process.env.AWS_S3_CLIENT_ID,//'',
    AWSS3ClientSecret: process.env.AWS_S3_CLIENT_SECRET,//'',
    AWSS3Bucket: process.env.AWS_S3_BUCKET,
    cloudStorageBucketName: process.env.CLOUD_STORAGE_BUCKET_NAME
}