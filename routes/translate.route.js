const { Router } = require('express')
const { calculatedPage, makePagination } = require('../helpers/methods')
const Translate = require('../models/Translate')
const router = Router()


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
