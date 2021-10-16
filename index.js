const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', require('./routes/genre.route'))
app.use('/api/v1', require('./routes/producer.route'))
app.use('/api/v1', require('./routes/studio.route'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'))
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


// app.get('/', (req,res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
