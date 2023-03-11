const express = require('express');
const { getWorkouts, createWorkout, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
// router.use(requireAuth);


// routes CRUD operations
router.get('/', getWorkouts)

router.post('/', createWorkout)

router.get('/:id', getWorkout)

router.patch('/:id', updateWorkout)

router.delete('/:id', deleteWorkout)

module.exports = router;
