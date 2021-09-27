const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    count: {type: Number},
}, {timestamps: true})

module.exports = model('Genre', schema)