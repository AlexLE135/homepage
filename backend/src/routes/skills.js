const express = require('express');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await db.all('SELECT * FROM skills WHERE is_active = TRUE ORDER BY sort_order, name');
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new skill (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, percentage, category, icon, sort_order } = req.body;

    if (!name || percentage === undefined) {
      return res.status(400).json({ error: 'Name and percentage are required' });
    }

    const result = await db.run(
      'INSERT INTO skills (name, percentage, category, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, percentage, category, icon, sort_order || 0]
    );

    const newSkill = await db.get('SELECT * FROM skills WHERE id = ?', [result.id]);
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update skill (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, percentage, category, icon, is_active, sort_order } = req.body;

    const result = await db.run(
      'UPDATE skills SET name = ?, percentage = ?, category = ?, icon = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [name, percentage, category, icon, is_active, sort_order, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    const updatedSkill = await db.get('SELECT * FROM skills WHERE id = ?', [id]);
    res.json(updatedSkill);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete skill (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM skills WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;