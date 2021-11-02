const { Router } = require("express");
const { DEFAULT_PER_PAGE, DEFAULT_PAGE } = require("../helpers/constants");
const { SAME_INSTANCE, NOTHING_FIND } = require("../helpers/messages");
const {
  calculatedPage,
  makePagination,
  findItemInDB,
  makeQuery,
} = require("../helpers/methods");
const Translate = require("../models/Translate");
const router = Router();

router.get("/translate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const translate = await Translate.findById({ _id: id });

    if (translate) return res.status(200).json({ data: translate });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.put("/translate/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const translate = await Translate.findByIdAndUpdate(id, { name }, { new: true })

    if (translate) return res.status(200).json({data: translate})
  } catch (e) {
    res.status(500).json({message: e.message})
  }
});
router.delete("/translate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const translate = await Translate.findByIdAndDelete(id);

    if (translate) res.status(200).send({ data: translate });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/translate", async (req, res) => {
  try {
    const { name } = req.body;
    const hasTranslate = await Translate.findOne({ name });
    const translate = new Translate({ name });

    if (hasTranslate) return res.status(400).json({ message: SAME_INSTANCE });

    await translate.save();

    res.status(200).json({data: translate});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/translate", async (req, res) => {
  try {
    const { per_page, page, search, from, to } = req.query;
    const perPage = per_page || DEFAULT_PER_PAGE;
    const currentPage = page || DEFAULT_PAGE;
    const totalPage = await (
      await Translate.find(
        makeQuery({ field: "name", value: search }, from, to)
      )
    ).length;
    const translators = await Translate.find(
      makeQuery({ field: "name", value: search }, from, to)
    )
      .skip(calculatedPage(currentPage, perPage))
      .limit(+perPage);

    res.status(200).json({
      data: translators,
      pagination: makePagination(totalPage, currentPage, perPage),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
