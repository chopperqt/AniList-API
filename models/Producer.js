const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    fullName: {type: String, require: true, unique: true},
}, {timestamps: true})

module.exports = model('Producer', schema)