const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: String,
    teacher: String,
    duration: String,
    semester: String
});

module.exports = mongoose.model('subject', subjectSchema, 'subject');