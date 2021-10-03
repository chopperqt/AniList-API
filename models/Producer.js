const { Schema, model } = require('mongoose')

const schema = new Schema({
    fullname: {type: String, require: true, unique: true},
}, {timestamps: true})

module.exports = model('Producer', schema)