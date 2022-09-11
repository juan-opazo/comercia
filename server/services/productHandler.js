const mongoose = require('mongoose');
const keys = require('../config/keys');

const Product = mongoose.model('products');
const Comment = mongoose.model('comments');

class ProductHandler {
    constructor(data, imgUrl, isArchived) {
        this.imgUrl = imgUrl;
        this.data = { ...data };
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
        if (this.imgUrl) this.data = { ...this.data, images:[this.imgUrl] };
        const product = await new Product({
            ...this.data
        }).save();
        
        return product;
    }

    async add_image() {
        const product = await Product.findOne({ _id: this.data.id });
        if (this.imgUrl) {
            product.images = [...product.images, this.imgUrl];
            const res = await product.save();
            return res;
        }
        return product;
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