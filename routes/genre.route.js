const { Router } = require("express");
const Genre = require("../models/Genre");
const AnimeGenre = require("../models/AnimeGenre");
const { SAME_INSTANCE } = require("../helpers/messages");
const { DEFAULT_PER_PAGE, DEFAULT_PAGE } = require("../helpers/constants");
const { makeQuery, calculatedPage, makePagination } = require("../helpers/methods");
const router = Router();

const PPG_MAX = 1000;

router.get("/genre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);

    if (genre) return res.status(200).json({ data: genre });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.put("/genre/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true });

    if (genre) return res.status(200).json({ data: genre });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.delete("/genre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByIdAndDelete(id);

    if (genre) res.status(200).send({ data: genre });
  } catch (e) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/genre", async (req, res) => {
  try {
    const { name } = req.body;
    const hasGenre = await Genre.findOne({ name });
    const genre = new Genre({ name });

    if (hasGenre) return res.status(400).json({ message: SAME_INSTANCE });

    await genre.save();

    res.status(201).json({ data: genre });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get("/genre", async (req, res) => {
  try {
    const { per_page, page, search, from, to } = req.query;
    const perPage = per_page || DEFAULT_PER_PAGE
    const currentPage = page || DEFAULT_PAGE
    const totalPage = await (await Genre.find(makeQuery({field: 'name', value: search}, from, to))).length;
    const genres = await Genre.find(makeQuery({field: 'name', value: search}, from, to)).skip(calculatedPage(currentPage, perPage)).limit(+perPage)

    res.status(200).json({
      data: genres,
      pagination: {
          makePagination(totalPage, currentPage, perPage)
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
