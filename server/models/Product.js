const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = require('./Comment');

const productSchema = new Schema({
    name: String,
    price: Number,
    brand: String,
    store: String,
    description: String,
    rating: [String],
    location: String,
    address: String,
    latitude: Number,
    longitude: Number,
    images: [String],
    date_created: Date,
    comments: [commentSchema],
    is_archived: Boolean,
    created_by: String
});

mongoose.model('products', productSchema);