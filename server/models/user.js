const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    imageUrl: String
});

module.exports = mongoose.model('user', userSchema, 'users');