const { Router } = require('express')
const { SAME_INSTANCE } = require('../helpers/messages')
const Studio = require('../models/Studio')
const router = Router()
const { calculatedPage, makePagination, makeQuery } = require('../helpers/methods')
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require('../helpers/constants')


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
        const {per_page, page, search, from, to} = req.query
        const perPage = per_page || DEFAULT_PER_PAGE
        const currentPage = page || DEFAULT_PAGE
        const totalPage = await (await Studio.find(makeQuery({field: 'name', value: search}, from, to))).length
        const studios = await Studio.find(makeQuery({field: 'name', value: search}, from,to)).skip(calculatedPage(currentPage, perPage)).limit(+perPage)
        
        res.status(200).json({
            data: studios,
            pagination: makePagination(totalPage, currentPage, perPage)
        })

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})


module.exports = router