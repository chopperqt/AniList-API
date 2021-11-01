const { Router } = require("express");
const { DEFAULT_PER_PAGE, DEFAULT_PAGE } = require("../helpers/constants");
const { SAME_INSTANCE } = require("../helpers/messages");
const {
  calculatedPage,
  makePagination,
  findItemInDB,
  makeQuery,
} = require("../helpers/methods");
const Translate = require("../models/Translate");
const router = Router();


router.post("/translate", async (req, res) => {
  try {
    const { name } = req.body;

    const uniqueTranslate = await Translate.findOne({ name });

    if (uniqueTranslate) return res.status(400).json({ error: SAME_INSTANCE });

    const translate = new Translate({ name });

    await translate.save();

    res.status(200).json(translate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/translate/:id', async(req,res) => {
    try {
        const { id } = req.params
        const translate = await Translate.findById({_id: id})

        if (translate) return res.status(200).json({data: translate})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
});
router.delete("/translate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const translate = await Translate.findByIdAndDelete(id)

    if (translate) res.status(200).send({data: translate})
  } catch (error) {
      res.status(500).send({error: error.message})
  }
});
router.get("/translate", async (req, res) => {
  try {
    const { per_page, page, search, from, to } = req.query;

    const perPage = per_page || DEFAULT_PER_PAGE;
    const currentPage = page || DEFAULT_PAGE;

    
    const totalPage = await (await Translate.find(makeQuery({field: 'name', value: search}, from, to))).length
    const translators = await Translate.find(makeQuery({field: 'name', value: search}, from,to)).skip(calculatedPage(currentPage, perPage)).limit(+perPage)

    res.status(200).json({
      data: translators,
      pagination: makePagination(totalPage, currentPage, perPage),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
