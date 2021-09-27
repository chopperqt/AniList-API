const { Schema, model } = require('mongoose')


const schema = new Schema({
    animeID: {type: String, require: true},
    genreID: {type: String, require: true}
})

module.exports = model('AnimeGenre', schema)