const express = require('express');
const router = express.Router();

const { createTask } = require('../controllers/taskControllers');
const { protect } = require('../middleware/authmiddleware');

router.post('/newTask', protect, createTask);

module.exports = router;


