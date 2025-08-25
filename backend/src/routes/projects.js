const express = require('express');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await db.all('SELECT * FROM projects WHERE is_published = TRUE ORDER BY sort_order, created_at DESC');
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new project (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, image_url, tags, github_url, demo_url, sort_order } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await db.run(
      'INSERT INTO projects (title, description, image_url, tags, github_url, demo_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, image_url, tags, github_url, demo_url, sort_order || 0]
    );

    const newProject = await db.get('SELECT * FROM projects WHERE id = ?', [result.id]);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, tags, github_url, demo_url, is_published, sort_order } = req.body;

    const result = await db.run(
      'UPDATE projects SET title = ?, description = ?, image_url = ?, tags = ?, github_url = ?, demo_url = ?, is_published = ?, sort_order = ? WHERE id = ?',
      [title, description, image_url, tags, github_url, demo_url, is_published, sort_order, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await db.get('SELECT * FROM projects WHERE id = ?', [id]);
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM projects WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;