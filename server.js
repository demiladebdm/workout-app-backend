require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require("cors");


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
// app.use(
//     cors({
//         origin: ["http://localhost:3000", "https://workout-app."],
//         credentials: true,
//     })
// )

// connect to db
mongoose.connect("mongodb://127.0.0.1/WorkoutApp")
    .then(() => {
        // listen for requests
        app.listen(4000, () => {
            console.log('Connected to db and listening on port: 4000')
        })
    })
    .catch(err => {
        console.error(err.message)
    })


process.env