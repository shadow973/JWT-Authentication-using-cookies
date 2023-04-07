require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const router = require('./routes/userRoute.js')


mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true
  })

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected...'))

app.use(cors())
app.use(express.json())
app.use(router)
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => console.log('Server is running on port 5000'))