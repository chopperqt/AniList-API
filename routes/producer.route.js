const {Router, json} = require('express')
const Producer = require('../models/Producer')
const router = Router()


//  api/v1
router.post('/producer' , async(req,res) => {
    try {
        const  {fullname} = req.body
        console.log(req.body)

        const uniqProducer = await Producer.findOne({fullname})

        if (uniqProducer) {
            return res.status(400).json({message: 'Такой режисёр уже есть!'})
        }

        const producer = new Producer({fullname})
        await producer.save()

        res.status(200).json(producer)    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/producer/:id', async (req,res) =>  {
    try {
        const {fullname} = req.body
        const uniqProducer = await Producer.findOne({fullname})

        if (uniqProducer) return res.status(400).json({message: 'Такой режисёр уже есть!'})

        const producer = await Producer.findByIdAndUpdate(req.params.id, {fullname}, {new: true})

        res.status(200).json(producer)
    }catch (error) {
        res.status(500).json({message: e.message})
    }
})

router.delete('/producer/:id', async (req,res) => {
    try {
        const producer = await Producer.findByIdAndDelete(req.params.id)

        if (producer) res.status(200).send({producer})

    }catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.get('/producer/:id', async(req, res) => {
    try {
        const producer = await Producer.findById(req.params.id)

        if (!producer) {
            return res.status(404).send({message: 'Ничего не найдено!'})
        }
        res.status(200).send({producer})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.get('/producers', async (req, res) => {
    try {
        const producers = await Producer.find({})

        res.status(200).json({
            producers
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



module.exports = router