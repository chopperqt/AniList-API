const { Schema, model } = required('mongoose')

const schema = new Schema({
    name: {type: String, require: true, unique: true},
}, { timestamps: true })

module.exports = model('Studio', schema)

