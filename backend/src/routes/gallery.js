const express = require('express');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await db.all('SELECT * FROM gallery_images WHERE is_active = TRUE ORDER BY sort_order, created_at DESC');
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new gallery image (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, image_url, thumbnail_url, category, tags, sort_order } = req.body;

    if (!image_url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const result = await db.run(
      'INSERT INTO gallery_images (title, description, image_url, thumbnail_url, category, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, image_url, thumbnail_url, category, tags, sort_order || 0]
    );

    const newImage = await db.get('SELECT * FROM gallery_images WHERE id = ?', [result.id]);
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error creating gallery image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update gallery image (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, thumbnail_url, category, tags, is_active, sort_order } = req.body;

    const result = await db.run(
      'UPDATE gallery_images SET title = ?, description = ?, image_url = ?, thumbnail_url = ?, category = ?, tags = ?, is_active = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, image_url, thumbnail_url, category, tags, is_active, sort_order, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    const updatedImage = await db.get('SELECT * FROM gallery_images WHERE id = ?', [id]);
    res.json(updatedImage);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete gallery image (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM gallery_images WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;