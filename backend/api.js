const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/utils/database');

// Import routes
const authRoutes = require('./src/routes/auth');
const contentRoutes = require('./src/routes/content');
const skillsRoutes = require('./src/routes/skills');
const projectsRoutes = require('./src/routes/projects');
const schedulesRoutes = require('./src/routes/schedules');
const uploadsRoutes = require('./src/routes/uploads');
const galleryRoutes = require('./src/routes/gallery');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded content
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic routes for testing
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/schedules', schedulesRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/gallery', galleryRoutes);

// Initialize database and start server
async function startServer() {
  try {
    await db.connect();
    await db.initialize();
    
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`💾 Database: ${db.dbPath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;