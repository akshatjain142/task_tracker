const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { search, status, sort } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }

    if (status && ['Pending', 'In Progress', 'Complete'].includes(status)) {
      query.status = status;
    }

    let tasksQuery = Task.find(query);
    if (sort === 'dueDate') {
      tasksQuery = tasksQuery.sort({ dueDate: 1 });
    } else if (sort === 'priority') {
      tasksQuery = tasksQuery.sort({ priority: 1 });
    } else {
      tasksQuery = tasksQuery.sort({ createdAt: -1 });
    }

    const tasks = await tasksQuery.exec();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;
    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and due date are required.' });
    }
    const newTask = new Task({ title, description, dueDate, status, priority });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
