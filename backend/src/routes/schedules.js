const express = require('express');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all weekly schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await db.all('SELECT * FROM weekly_schedules WHERE is_published = TRUE ORDER BY year DESC, week_number DESC');
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current week schedule
router.get('/current', async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const weekNumber = getWeekNumber(now);

    const schedule = await db.get(
      'SELECT * FROM weekly_schedules WHERE year = ? AND week_number = ? AND is_published = TRUE',
      [year, weekNumber]
    );

    if (!schedule) {
      return res.status(404).json({ error: 'No schedule found for current week' });
    }

    res.json(schedule);
  } catch (error) {
    console.error('Error fetching current schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create/update weekly schedule (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { week_number, year, schedule_data, file_url } = req.body;

    if (!week_number || !year || !schedule_data) {
      return res.status(400).json({ error: 'Week number, year and schedule data are required' });
    }

    const jsonData = JSON.stringify(schedule_data);
    
    const result = await db.run(
      'INSERT OR REPLACE INTO weekly_schedules (week_number, year, schedule_data, file_url) VALUES (?, ?, ?, ?)',
      [week_number, year, jsonData, file_url]
    );

    const newSchedule = await db.get('SELECT * FROM weekly_schedules WHERE week_number = ? AND year = ?', [week_number, year]);
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete schedule (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run('DELETE FROM weekly_schedules WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json({ success: true, message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to get week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

module.exports = router;