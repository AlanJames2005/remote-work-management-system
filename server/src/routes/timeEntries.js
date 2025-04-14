import express from 'express';
import { auth } from '../middleware/auth';
import { TimeEntry } from '../config/database';

const router = express.Router();

// @route   POST api/time-entries
// @desc    Create a new time entry
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { clockIn, clockOut, notes } = req.body;
    const timeEntry = new TimeEntry({
      clockIn,
      clockOut,
      notes,
      user: req.user.id,
      team: req.user.team
    });
    await timeEntry.save();
    res.status(201).json(timeEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/time-entries
// @desc    Get all time entries for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const timeEntries = await TimeEntry.find({ user: req.user.id })
      .sort({ clockIn: -1 });
    res.json(timeEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT api/time-entries/:id
// @desc    Update a time entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const timeEntry = await TimeEntry.findById(req.params.id);
    if (!timeEntry) {
      return res.status(404).json({ message: 'Time entry not found' });
    }
    if (timeEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updatedTimeEntry = await TimeEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTimeEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE api/time-entries/:id
// @desc    Delete a time entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const timeEntry = await TimeEntry.findById(req.params.id);
    if (!timeEntry) {
      return res.status(404).json({ message: 'Time entry not found' });
    }
    if (timeEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await timeEntry.remove();
    res.json({ message: 'Time entry removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 