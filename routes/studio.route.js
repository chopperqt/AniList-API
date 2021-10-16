const { Router } = require('express')
const { SAME_INSTANCE } = require('../helpers/messages')
const Studio = require('../models/Studio')
const router = Router()
const { calculatedPage } = require('../helpers/methods')


router.post('/studio', async (req,res) => {
    try {
        const { name } = req.body
        const studioFInd = await Studio.findOne({name})

        if (studioFInd) {
            return res.status(400).json({error: SAME_INSTANCE})
        }

        const studio = new Studio({name})

        await studio.save()

        res.status(201).json(studio)

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.get('/studio/:id', async(req,res) => {
    try {
        const studio = await Studio.findById(req.params.id)

        res.status(200).json(studio)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})
router.get('/studio', async (req,res) => {
    try {
        const {per_page, page} = req.query
    
        const perPage = per_page || 1
        const currentPage = page || 1
        const totalPage = await (await Studio.find()).length


        const studios = await Studio.find().skip(calculatedPage(currentPage, perPage)).limit(+perPage)

        res.status(200).json({
            studios,
            pagination: {
                total_page: Math.ceil(totalPage / perPage),
                page: +currentPage,
                per_page: +perPage
            }
        })

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})


module.exports = router