/**
 * Backend API for alexle135.de - Content Management System
 * Provides endpoints for managing all dynamic content
 * Uses JSON file storage for simplicity (can be upgraded to database)
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const ensureDirectories = async () => {
    const dirs = ['data', 'uploads/images', 'uploads/schedules', 'uploads/projects'];
    for (const dir of dirs) {
        await fs.mkdir(dir, { recursive: true }).catch(() => {});
    }
};

// File paths
const DATA_FILE = path.join(__dirname, 'data', 'site-content.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = 'uploads/';
        if (file.mimetype.startsWith('image/')) {
            dest += 'images/';
        } else if (file.mimetype === 'application/pdf') {
            dest += 'schedules/';
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = /image|application\/pdf/.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images and PDF files are allowed'));
        }
    }
});

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Verify user still exists
        const users = await getUsers();
        const user = users.find(u => u.username === decoded.username);
        
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Utility functions
const readData = async (filePath, defaultValue = {}) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return defaultValue;
    }
};

const writeData = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const getContent = () => readData(DATA_FILE, {
    hero: {
        title: "Full-Stack Developer",
        subtitle: "Creating Digital Experiences with Modern Technologies",
        description: "Ich entwickle moderne Webanwendungen mit React, TypeScript und Cloud-Technologien."
    },
    about: {
        title: "Über mich",
        content: "Als leidenschaftlicher Full-Stack Developer entwickle ich innovative Webanwendungen."
    },
    projects: [],
    legal: {
        impressum: "",
        datenschutz: ""
    },
    schedule: {
        currentWeek: null,
        filePath: null
    },
    images: []
});

const getUsers = () => readData(USERS_FILE, []);

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.username === username);
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new password required' });
    }

    try {
        const users = await getUsers();
        const userIndex = users.findIndex(u => u.username === req.user.username);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!await bcrypt.compare(currentPassword, users[userIndex].password)) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        users[userIndex].password = await bcrypt.hash(newPassword, 10);
        await writeData(USERS_FILE, users);
        
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// Content endpoints
app.get('/api/content', async (req, res) => {
    try {
        const content = await getContent();
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load content' });
    }
});

app.put('/api/content', authenticateToken, async (req, res) => {
    try {
        const updates = req.body;
        const content = await getContent();
        
        const updatedContent = { ...content, ...updates };
        await writeData(DATA_FILE, updatedContent);
        
        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update content' });
    }
});

// Projects endpoints
app.get('/api/projects', async (req, res) => {
    try {
        const content = await getContent();
        res.json(content.projects || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load projects' });
    }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
    try {
        const project = { ...req.body, id: Date.now().toString() };
        const content = await getContent();
        
        content.projects = content.projects || [];
        content.projects.push(project);
        
        await writeData(DATA_FILE, content);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const content = await getContent();
        
        const projectIndex = content.projects.findIndex(p => p.id === id);
        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        content.projects[projectIndex] = { ...content.projects[projectIndex], ...updates };
        await writeData(DATA_FILE, content);
        
        res.json(content.projects[projectIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const content = await getContent();
        
        content.projects = content.projects.filter(p => p.id !== id);
        await writeData(DATA_FILE, content);
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// File upload endpoints
app.post('/api/upload/image', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const imageUrl = `/uploads/images/${req.file.filename}`;
        
        // Store image metadata
        const content = await getContent();
        content.images = content.images || [];
        content.images.push({
            filename: req.file.filename,
            originalName: req.file.originalname,
            url: imageUrl,
            uploadedAt: new Date().toISOString()
        });
        
        await writeData(DATA_FILE, content);
        
        res.json({ url: imageUrl, filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

app.post('/api/upload/schedule', authenticateToken, upload.single('schedule'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF uploaded' });
        }

        const { week } = req.body;
        if (!week) {
            return res.status(400).json({ error: 'Week parameter required' });
        }

        const fileUrl = `/uploads/schedules/${req.file.filename}`;
        
        const content = await getContent();
        content.schedule = {
            currentWeek: week,
            filePath: fileUrl,
            filename: req.file.originalname,
            uploadedAt: new Date().toISOString()
        };
        
        await writeData(DATA_FILE, content);
        
        res.json({ url: fileUrl, week });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload schedule' });
    }
});

// Initialize server
const initializeServer = async () => {
    await ensureDirectories();
    
    // Create default admin user if none exists
    const users = await getUsers();
    if (users.length === 0) {
        const defaultPassword = await bcrypt.hash('admin123', 10);
        users.push({
            username: 'admin',
            password: defaultPassword,
            createdAt: new Date().toISOString()
        });
        await writeData(USERS_FILE, users);
        console.log('Default admin user created (username: admin, password: admin123)');
    }
    
    // Create initial content file if it doesn't exist
    await getContent();
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large' });
        }
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
});

// Start server
app.listen(PORT, async () => {
    await initializeServer();
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin API available at http://localhost:${PORT}/api`);
});

module.exports = app;