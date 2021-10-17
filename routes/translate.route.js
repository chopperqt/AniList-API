const { Router } = require('express')
const { SAME_INSTANCE } = require('../helpers/messages')
const { calculatedPage, makePagination } = require('../helpers/methods')
const Translate = require('../models/Translate')
const router = Router()

router.post('/translate', async (req,res) => {
    try {
        const {name} = req.body

        const uniqueTranslate = await Translate.findOne({name})

        if (uniqueTranslate) return res.status(400).json({error: SAME_INSTANCE})

        const translate = new Translate({name})

        await translate.save()

        res.status(200).json(translate);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/translate', async (req,res) => {
    try {
        const {per_page, page} = req.query

        const perPage = per_page || 15
        const currentPage = page || 1
        const totalPage = await (await Translate.find()).length

        const translators = await Translate.find().skip(calculatedPage(currentPage, perPage)).limit(+perPage)

        res.status(200).json({
            translators,
            pagination: makePagination(totalPage, currentPage, perPage)
        })

    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router
