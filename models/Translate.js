const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {type: String, require: true, unique: true},
    createdAt: {type: Number},
    updatedAt: {type: Number},
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    },
})

module.exports = model('Translate', schema)