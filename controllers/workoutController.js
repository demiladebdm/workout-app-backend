const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// routes CRUD operations
//GET all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//POST or Create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id

        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({ error:'No such workout' })
    }

    res.status(200).json(workout)
}

//PATCH or Update a single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error:'No such workout' })
    }

    res.status(200).json(workout)
}

//Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if(!workout) {
        return res.status(404).json({ error:'No such workout' })
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout
}