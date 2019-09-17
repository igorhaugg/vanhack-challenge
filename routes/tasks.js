const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const validateTask = require('../validation/task');
const User = require('../models/User');
const Task = require('../models/Task');
const keys = require('../config/keys');

// @route   POST api/tasks
// @desc    Add task
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, validation } = validateTask(req.body);
  // Check Validation
  if (!validation) {
    return res.status(400).json(errors);
  }
  // Get fields
  const taskFields = {};
  taskFields.title = req.body.title;
  taskFields.users = req.body.user;
  taskFields.priority = req.body.priority;
  taskFields.description = req.body.description;

  try {
    const task = await new Task(taskFields).save();
    return res.json(task);
  } catch (error) {
    return res.status(400).json(errors);
  }
});

// @route   GET api/tasks/task/:id
// @desc    Get task
// @access  Private
router.get('/task/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {};
  const id = req.params.id;
  try {
    const task = await Task.findOne({ _id: id }).populate('users');
    if (!task) {
      errors.notask = 'Task not found!';
      return res.json(errors);
    }

    return res.json(task);
  } catch (error) {
    return res.status(400).json(errors);
  }
});

// @route   PATCH api/tasks/:id
// @desc    Edit task
// @access  Private
router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        done: true
      },
      { new: true }
    );
    return res.json(task);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', async (req, res) => {
  const errors = {};
  try {
    const tasks = await Task.find({ done: false }).populate('users');
    if (!tasks || tasks.length === 0) {
      errors.notasks = 'Tasks not found!';
      return res.json(errors);
    }
    return res.json(tasks);
  } catch (err) {
    return res.status(404).json({ notasks: 'Tasks not found!' });
  }
});

// @route   GET api/tasks/:id
// @desc    Get all tasks from user
// @access  Private
router.get('/:id', async (req, res) => {
  const errors = {};
  try {
    const id = req.params.id;
    const tasks = await Task.find({ users: id, done: false }).populate('users');
    if (!tasks || tasks.length === 0) {
      errors.notasks = 'Tasks not found!';
      return res.json(errors);
    }
    return res.json(tasks);
  } catch (err) {
    return res.status(404).json({ notasks: 'Tasks not found!' });
  }
});

module.exports = router;
