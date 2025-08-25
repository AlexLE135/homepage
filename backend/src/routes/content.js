const express = require('express');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get content by key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;

    if (key === 'skills') {
      const skills = await db.all('SELECT * FROM skills WHERE is_active = TRUE ORDER BY sort_order, name');
      res.json(skills);
    } else if (key === 'projects') {
      const projects = await db.all('SELECT * FROM projects WHERE is_published = TRUE ORDER BY sort_order, created_at DESC');
      res.json(projects);
    } else if (key === 'weekly_schedules') {
      const schedules = await db.all('SELECT * FROM weekly_schedules WHERE is_published = TRUE ORDER BY year DESC, week_number DESC');
      res.json(schedules);
    } else if (key === 'gallery') {
      const gallery = await db.all('SELECT * FROM gallery_images WHERE is_active = TRUE ORDER BY sort_order, created_at DESC');
      res.json(gallery);
    } else if (key === 'all-content') {
      // Get all content for admin panel
      const [
        personalInfo,
        heroContent,
        aboutContent,
        contactInfo,
        socialInfo,
        legalInfo
      ] = await Promise.all([
        db.get('SELECT data FROM content WHERE key = ?', ['personalInfo']),
        db.get('SELECT data FROM content WHERE key = ?', ['hero']),
        db.get('SELECT data FROM content WHERE key = ?', ['about']),
        db.get('SELECT data FROM content WHERE key = ?', ['contact']),
        db.get('SELECT data FROM content WHERE key = ?', ['social']),
        db.get('SELECT data FROM content WHERE key = ?', ['legal'])
      ]);

      const [skills, projects, gallery] = await Promise.all([
        db.all('SELECT * FROM skills ORDER BY sort_order, name'),
        db.all('SELECT * FROM projects ORDER BY sort_order, created_at DESC'),
        db.all('SELECT * FROM gallery_images ORDER BY sort_order, created_at DESC')
      ]);

      res.json({
        personalInfo: personalInfo ? JSON.parse(personalInfo.data) : null,
        hero: heroContent ? JSON.parse(heroContent.data) : null,
        about: aboutContent ? JSON.parse(aboutContent.data) : null,
        contact: contactInfo ? JSON.parse(contactInfo.data) : null,
        social: socialInfo ? JSON.parse(socialInfo.data) : null,
        legal: legalInfo ? JSON.parse(legalInfo.data) : null,
        skills: skills || [],
        projects: projects || [],
        gallery: gallery || []
      });
    } else {
      const content = await db.get('SELECT data FROM content WHERE key = ?', [key]);
      if (content) {
        res.json(JSON.parse(content.data));
      } else {
        res.status(404).json({ error: 'Content not found' });
      }
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update content (admin only)
router.put('/:key', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    const jsonData = JSON.stringify(data);
    
    const result = await db.run(
      'INSERT OR REPLACE INTO content (key, data, updated_by) VALUES (?, ?, ?)',
      [key, jsonData, req.user.id]
    );

    res.json({
      success: true,
      message: 'Content updated successfully',
      key,
      changes: result.changes
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all content keys (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const content = await db.all('SELECT key, updated_at, updated_by FROM content ORDER BY key');
    res.json(content);
  } catch (error) {
    console.error('Error fetching content list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;