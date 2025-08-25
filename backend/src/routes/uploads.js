const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../utils/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image, document and text files are allowed'));
    }
  }
});

// Upload file
router.post('/', authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename, mimetype, size, path: filePath } = req.file;

    const result = await db.run(
      'INSERT INTO uploaded_files (filename, original_name, mime_type, size, path, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)',
      [filename, originalname, mimetype, size, filePath, req.user.id]
    );

    const fileUrl = `/uploads/${filename}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: result.id,
        filename: originalname,
        url: fileUrl,
        size: size,
        mimeType: mimetype
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all uploaded files (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const files = await db.all(`
      SELECT uf.*, u.username as uploaded_by_name 
      FROM uploaded_files uf 
      LEFT JOIN users u ON uf.uploaded_by = u.id 
      ORDER BY uf.uploaded_at DESC
    `);
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete file (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get file info first
    const file = await db.get('SELECT * FROM uploaded_files WHERE id = ?', [id]);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete from filesystem
    const filePath = path.join(uploadsDir, file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    const result = await db.run('DELETE FROM uploaded_files WHERE id = ?', [id]);

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;