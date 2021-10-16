const { Router } = require("express");
const Producer = require("../models/Producer");
const router = Router();
const { SAME_INSTANCE, NOTHING_FIND } = require("../helpers/messages");

//  api/v1
router.post("/producer", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const uniqProducer = await Producer.findOne({
      fullName: `${firstName} ${lastName}`,
    });

    if (uniqProducer) {
      return res.status(400).json({ error: SAME_INSTANCE });
    }

    const producer = new Producer({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
    });

    await producer.save();

    res.status(200).json(producer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/producer/:id", async (req, res) => {
  try {
    const { fullName } = req.body;
    const uniqProducer = await Producer.findOne({ fullName });

    if (uniqProducer) return res.status(400).json({ error: SAME_INSTANCE });

    const producer = await Producer.findByIdAndUpdate(
      req.params.id,
      { fullName },
      { new: true }
    );

    res.status(200).json(producer);
  } catch (error) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/producer/:id", async (req, res) => {
  try {
    const producer = await Producer.findByIdAndDelete(req.params.id);

    if (producer) res.status(200).send({ producer });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/producer/:id", async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);

    if (!producer) {
      return res.status(404).send({ error: NOTHING_FIND });
    }
    res.status(200).send({ producer });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/producers", async (req, res) => {
  try {
    const producers = await Producer.find({});

    res.status(200).json({ producers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
