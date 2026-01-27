const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'pending',
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'error', error: error.message });
  }
};

