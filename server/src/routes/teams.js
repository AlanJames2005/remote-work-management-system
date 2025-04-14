import express from 'express';
import { Team } from '../models/Team.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all teams
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('members', 'name email')
      .sort('-createdAt');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new team
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const team = new Team({
      name,
      description,
      members: [req.user.id],
      createdBy: req.user.id
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get team by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members', 'name email')
      .populate('createdBy', 'name email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update team
router.put('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    // Check if user is team member
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add member to team
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    team.members.push(userId);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove member from team
router.delete('/:id/members/:userId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    team.members = team.members.filter(
      member => member.toString() !== req.params.userId
    );
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete team
router.delete('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await team.remove();
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 