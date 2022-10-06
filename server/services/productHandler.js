const mongoose = require('mongoose');
const { Storage } = require('@google-cloud/storage');
const keys = require('../config/keys');

const Product = mongoose.model('products');
const Comment = mongoose.model('comments');

class ProductHandler {
    constructor(data, file, isArchived) {
        this.imgUrl = file.location;
        this.file = file;
        this.data = { ...data };
    }

    async upload_image_to_cloud_storage_and_add_to_product(product) {
        const storage = new Storage({
            keyFilename: 'comercia-dev-d80820ff534b.json',
            projectId: 'comercia-dev',
        });
        const bucketName = keys.cloudStorageBucketName;
        async function createBucket() {
            // Creates the new bucket
            await storage.createBucket(bucketName);
        }

        createBucket().catch(console.error);
        const bucket = storage.bucket(bucketName);
        const today = new Date();
        const originalname = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}_${this.file.originalname}`;
        const blob = bucket.file(originalname);
        const blobStream = blob.createWriteStream({
        resumable: false,
        });

        blobStream.on("error", (err) => {
            console.error(err.message)
        });

        blobStream.on("finish", async (data) => {
            // create a url to access file
            const publicURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            console.log(`public url: ${publicURL}`)
            try {
                await bucket.file(originalname).makePublic();
            } catch {
                console.error(`Uploaded the file successfully: ${originalname}, but public access is denied!`);
            }

            // console.log("Uploaded the file successfully: ", originalname);
            if (publicURL) {
                product.images = [...product.images, publicURL];
                const res = await product.save();
                return res;
            }
        });
        blobStream.end(this.file.buffer);
    }

    async insert() {
        this.data = {
            ...this.data, 
            images:[], 
            isArchived: false,
            date_created: new Date(),
            comments: [],
            rating: []
        };
        // if (this.imgUrl) this.data = { ...this.data, images:[this.imgUrl] };
        const product = new Product({
            ...this.data
        });
        await this.upload_image_to_cloud_storage_and_add_to_product(product);
        // .save();
        
        return product;
    }

    async add_image() {
        
        const product = await Product.findOne({ _id: this.data.id });
        await this.upload_image_to_cloud_storage_and_add_to_product(product);
        
        return 200;
    }

    async add_comment() {
        const product = await Product.findOne({ _id: this.data.id });
        const newComment = new Comment({
            created_by: this.data.owner._id,
            profile_pic: this.data.owner.photos? this.data.owner.photos[0].value : '',
            name: `${this.data.owner.name.givenName} ${this.data.owner.name.familyName}`,
            date_created: new Date(),
            content: this.data.content
        })
        product.comments = [...product.comments, newComment];
        const res = await product.save();
        return res;
    }

    async update() {
        const product = await Product.findOne({ _id: this.data.id });
        for (const key in this.data) {
            product[key] = this.data[key];
        }
        const res = await product.save();
        return res;
    }

    async user_likes_product() {
        const product = await Product.findOne({ _id: this.data.id });
        const users_that_likes_product = product.rating
        if (this.data.userId in users_that_likes_product) return product;
        product.rating.push(this.data.userId);
        product.rating = [...new Set(product.rating)];
        const res = await product.save();
        return res;
    }

    async user_dislikes_product() {
        const product = await Product.findOne({ _id: this.data.id });
        const users_that_likes_product = product.rating
        if (users_that_likes_product.indexOf(this.data.userId) >= 0) {
            product.rating = [ ...new Set(users_that_likes_product.filter(userId => userId !== this.data.userId)) ];
            const res = await product.save();
            return res;
        }
        return product;
        
    }

    static async get_user_products(userId) {
        const myProducts = await Product.find({ created_by: userId });
        return myProducts;
    }

    static async get_all_products() {
        const products = await Product.find();
        return products;
    }
}

module.exports = ProductHandler;