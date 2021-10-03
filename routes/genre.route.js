const {Router} = require('express')
const Genre = require('../models/Genre')
const AnimeGenre = require('../models/AnimeGenre')
const router = Router()

const PPG_MAX = 1000


//  api/v1
router.post('/genre', async (req, res) => {
    try {
        const { name } = req.body
        const genreFind = await Genre.findOne({name})
        
        if (genreFind) {
            return res.status(400).json({message: 'Такой жанр уже есть!'})
        }

        const genre = new Genre({name})

        await genre.save()

        res.status(201).json(genre)

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.put('/genre/:id', async (req,res) => {
    try {
        const {name} = req.body
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name}, {new: true})

        res.status(200).json(genre)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.get('/genre/:id', async (req,res) => {
    try {
        const genre  = await Genre.findById(req.params.id)

        res.status (200).json(genre)
    }catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.delete('/genre/:id', async (req,res) => {
    try {
        const total = await Genre.find({})
        const deleteGenre = await Genre.findByIdAndDelete(req.params.id)

        if (deleteGenre) {
            res.status(200).send({
                genre: deleteGenre,
            })
        }

    }catch (e) {

    }

})
router.get('/genres', async (req,res) => {
    try {
        const {page,ppg,search,id, from, to} = req.query

        let isSearch = search ||  false
        let isFrom = from || false
        let isTo = to || false
        let query = {}

        if (isSearch) {
            query = {
                name: {"$regex": search, "$options": "i"}
            }
        }

        if (isFrom) {
            query = {
                ...query,
                createdAt: isFrom.toString()
            }
        }

        const total = await (await Genre.find(query)).length

        const genres = await Genre.find(query).skip(page ? page : 0 * (ppg || PPG_MAX)).limit(+ppg || PPG_MAX)


        res.status(200).json({
            genres: genres,
            pagination: {
                total,
                pages: Math.ceil(total / 15)
            }
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})



module.exports = router