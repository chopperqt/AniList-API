const {Router} = require('express')
const Genre = require('../models/Genre')
const AnimeGenre = require('../models/AnimeGenre')
const router = Router()

const PPG_MAX = 50


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

        res.status(201).json({message: 'Жанр создан!'})

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
    console.log(req.params.id)

    try {
        const deleteGenre = await Genre.findByIdAndDelete(req.params.id)

        if (deleteGenre) {
            res.status(200).send()
        }

    }catch (e) {

    }

})

router.get('/genres', async (req,res) => {
    try {
        const {ppg,search,id, from, to} = req.query
        // const genres = search ?  await Genre.find({name: {"$regex": search, "$options": "i"}}).limit(+ppg || PPG_MAX) : await Genre.find({}).limit(+ppg || PPG_MAX)
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

        console.log(query)


        const genres = await Genre.find(query).limit(+ppg || PPG_MAX) 


        res.status(200).json(genres)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})



module.exports = router