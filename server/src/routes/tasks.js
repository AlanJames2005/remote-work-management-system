import express from 'express';
import { auth } from '../middleware/auth';
import { Task } from '../config/database';

const router = express.Router();

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user.id,
      team: req.user.team
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks for the authenticated user's team
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ team: req.user.team })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.team.toString() !== req.user.team.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.team.toString() !== req.user.team.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 