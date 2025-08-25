const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

class Database {
  constructor() {
    this.dbPath = './data/cms.db';
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('📊 Connected to SQLite database');
          resolve();
        }
      });
    });
  }

  initialize() {
    return new Promise((resolve, reject) => {
      const schema = `
        -- Users Table
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(50) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          role VARCHAR(20) DEFAULT 'editor',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Content Table
        CREATE TABLE IF NOT EXISTS content (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key VARCHAR(100) UNIQUE NOT NULL,
          data TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_by INTEGER REFERENCES users(id)
        );

        -- Skills Table
        CREATE TABLE IF NOT EXISTS skills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL,
          percentage INTEGER DEFAULT 10 CHECK(percentage BETWEEN 0 AND 100),
          category VARCHAR(50),
          icon VARCHAR(50),
          is_active BOOLEAN DEFAULT TRUE,
          sort_order INTEGER DEFAULT 0
        );

        -- Projects Table
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          image_url VARCHAR(255),
          tags TEXT,
          github_url VARCHAR(255),
          demo_url VARCHAR(255),
          is_published BOOLEAN DEFAULT TRUE,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Weekly Schedule
        CREATE TABLE IF NOT EXISTS weekly_schedules (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_number INTEGER NOT NULL,
          year INTEGER NOT NULL,
          schedule_data TEXT NOT NULL,
          file_url VARCHAR(255),
          is_published BOOLEAN DEFAULT TRUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(week_number, year)
        );

        -- Uploaded Files
        CREATE TABLE IF NOT EXISTS uploaded_files (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          filename VARCHAR(255) NOT NULL,
          original_name VARCHAR(255) NOT NULL,
          mime_type VARCHAR(100) NOT NULL,
          size INTEGER NOT NULL,
          path VARCHAR(500) NOT NULL,
          uploaded_by INTEGER REFERENCES users(id),
          uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Gallery Images
        CREATE TABLE IF NOT EXISTS gallery_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(200),
          description TEXT,
          image_url VARCHAR(500) NOT NULL,
          thumbnail_url VARCHAR(500),
          category VARCHAR(100),
          tags TEXT,
          is_active BOOLEAN DEFAULT TRUE,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;

      this.db.exec(schema, async (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database schema initialized');
          await this.seedInitialData();
          resolve();
        }
      });
    });
  }

  async seedInitialData() {
    // Default admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const initialData = [
      `DELETE FROM skills`,
      `INSERT INTO users (username, password_hash, email, role) 
       VALUES ('admin', '${hashedPassword}', 'schneider@alexle135.de', 'admin') 
       ON CONFLICT(username) DO NOTHING`,
      
      `INSERT INTO skills (name, percentage, category) VALUES 
       ('React', 85, 'Frontend'),
       ('TypeScript', 78, 'Frontend'),
       ('Node.js', 72, 'Backend'),
       ('PostgreSQL', 68, 'Database'),
       ('Tailwind CSS', 82, 'Frontend'),
       ('Docker', 65, 'DevOps')`,
      
      `INSERT INTO content (key, data) VALUES 
       ('about', '{"title": "Über mich", "description": "Full-Stack Developer mit Leidenschaft für moderne Web-Technologien..."}'),
       ('contact', '{"email": "schneider@alexle135.de", "phone": "015568920209"}')
       ON CONFLICT(key) DO NOTHING`
    ];

    for (const query of initialData) {
      await this.run(query);
    }
    
    console.log('🌱 Initial data seeded');
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('📊 Database connection closed');
          resolve();
        }
      });
    });
  }
}

module.exports = new Database();