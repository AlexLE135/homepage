/**
 * Admin Panel JavaScript - Content Management System with Backend API
 * Uses REST API instead of file-system storage
 */

const CONFIG = {
    API_BASE: 'http://localhost:3001/api',
    TOKEN_KEY: 'adminToken'
};

// Utility functions
const makeAuthenticatedRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });

    if (response.status === 401) {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        window.location.href = 'login.html';
        return;
    }

    return response.json();
};

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadContent();
    loadProjects();
});

// Dashboard laden
function loadDashboard() {
    // Aktuelle Zeit und Datum setzen
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString('de-DE');
    
    // SSL-Status prüfen
    checkSSLStatus();
}

// SSL-Status prüfen
function checkSSLStatus() {
    fetch(window.location.origin, { mode: 'no-cors' })
        .then(() => {
            document.getElementById('sslStatus').innerHTML = '<span class="text-green-600">✓ Aktiv</span>';
        })
        .catch(() => {
            document.getElementById('sslStatus').innerHTML = '<span class="text-red-600">✗ Fehler</span>';
        });
}

// Inhalte laden
async function loadContent() {
    try {
        const content = await makeAuthenticatedRequest('/content');
        
        document.getElementById('heroTitle').value = content.hero?.title || '';
        document.getElementById('heroSubtitle').value = content.hero?.subtitle || '';
        document.getElementById('heroCTA').value = content.hero?.cta || '';
        
        document.getElementById('aboutTitle').value = content.about?.title || '';
        document.getElementById('aboutDescription').value = content.about?.description || '';
        
        document.getElementById('impressumContent').value = content.legal?.impressum || '';
        document.getElementById('datenschutzContent').value = content.legal?.datenschutz || '';
        
        // Update project count
        document.getElementById('projectCount').textContent = content.projects?.length || 0;
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

// Projekte laden
async function loadProjects() {
    try {
        const projects = await makeAuthenticatedRequest('/projects');
        const projectsList = document.getElementById('projectsList');
        
        projectsList.innerHTML = '';
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'border p-4 rounded bg-white';
            projectDiv.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-semibold text-lg">${project.title}</h4>
                    <div class="flex space-x-2">
                        <button onclick="saveProject('${project.id}')" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Speichern</button>
                        <button onclick="deleteProject('${project.id}')" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Löschen</button>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Titel</label>
                        <input type="text" id="title-${project.id}" value="${project.title}" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Beschreibung</label>
                        <textarea id="description-${project.id}" rows="3" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">${project.description}</textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Technologien (komma-getrennt)</label>
                        <input type="text" id="tech-${project.id}" value="${project.technologies?.join(', ') || ''}" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">GitHub URL</label>
                        <input type="text" id="github-${project.id}" value="${project.github || ''}" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Live Demo URL</label>
                        <input type="text" id="demo-${project.id}" value="${project.live || ''}" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Bild URL</label>
                        <input type="text" id="image-${project.id}" value="${project.image || ''}" class="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    
                    <div class="flex items-center">
                        <input type="checkbox" id="featured-${project.id}" ${project.featured ? 'checked' : ''} class="mr-2">
                        <label for="featured-${project.id}" class="text-sm text-gray-700">Featured Project</label>
                    </div>
                </div>
            `;
            projectsList.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Failed to load projects:', error);
    }
}

// Hero Section speichern
async function saveHeroSection() {
    const data = {
        hero: {
            title: document.getElementById('heroTitle').value,
            subtitle: document.getElementById('heroSubtitle').value,
            cta: document.getElementById('heroCTA').value
        }
    };
    
    try {
        await makeAuthenticatedRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        showMessage('Hero Section gespeichert!', 'success');
    } catch (error) {
        showMessage('Fehler beim Speichern!', 'error');
    }
}

// About Section speichern
async function saveAboutSection() {
    const data = {
        about: {
            title: document.getElementById('aboutTitle').value,
            description: document.getElementById('aboutDescription').value
        }
    };
    
    try {
        await makeAuthenticatedRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        showMessage('About Section gespeichert!', 'success');
    } catch (error) {
        showMessage('Fehler beim Speichern!', 'error');
    }
}

// Projekt speichern
async function saveProject(id) {
    const project = {
        title: document.getElementById(`title-${id}`).value,
        description: document.getElementById(`description-${id}`).value,
        technologies: document.getElementById(`tech-${id}`).value.split(',').map(t => t.trim()),
        github: document.getElementById(`github-${id}`).value,
        live: document.getElementById(`demo-${id}`).value,
        image: document.getElementById(`image-${id}`).value,
        featured: document.getElementById(`featured-${id}`).checked
    };
    
    try {
        await makeAuthenticatedRequest(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(project)
        });
        showMessage('Projekt gespeichert!', 'success');
    } catch (error) {
        showMessage('Fehler beim Speichern!', 'error');
    }
}

// Projekt löschen
async function deleteProject(id) {
    if (confirm('Projekt wirklich löschen?')) {
        try {
            await makeAuthenticatedRequest(`/projects/${id}`, {
                method: 'DELETE'
            });
            showMessage('Projekt gelöscht!', 'success');
            loadProjects(); // Reload projects
        } catch (error) {
            showMessage('Fehler beim Löschen!', 'error');
        }
    }
}

// Neues Projekt hinzufügen
async function addProject() {
    const project = {
        title: 'Neues Projekt',
        description: 'Projektbeschreibung hier eingeben...',
        technologies: ['React', 'TypeScript'],
        github: '',
        live: '',
        image: '',
        featured: false
    };
    
    try {
        await makeAuthenticatedRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(project)
        });
        showMessage('Neues Projekt erstellt!', 'success');
        loadProjects();
    } catch (error) {
        showMessage('Fehler beim Erstellen!', 'error');
    }
}

// Impressum speichern
async function saveImpressum() {
    const data = {
        legal: {
            impressum: document.getElementById('impressumContent').value
        }
    };
    
    try {
        await makeAuthenticatedRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        showMessage('Impressum gespeichert!', 'success');
    } catch (error) {
        showMessage('Fehler beim Speichern!', 'error');
    }
}

// Datenschutz speichern
async function saveDatenschutz() {
    const data = {
        legal: {
            datenschutz: document.getElementById('datenschutzContent').value
        }
    };
    
    try {
        await makeAuthenticatedRequest('/content', {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        showMessage('Datenschutzerklärung gespeichert!', 'success');
    } catch (error) {
        showMessage('Fehler beim Speichern!', 'error');
    }
}

// Bild hochladen
async function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage('Keine Datei ausgewählt!', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showMessage('Bitte wählen Sie ein Bild aus!', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const token = localStorage.getItem(CONFIG.TOKEN_KEY);
        const response = await fetch(`${CONFIG.API_BASE}/upload/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('Bild erfolgreich hochgeladen!', 'success');
            document.getElementById('uploadStatus').innerHTML = `
                <div class="text-green-600 mt-2">✓ ${file.name} wurde hochgeladen<br>
                <span class="text-sm">URL: ${result.url}</span></div>
            `;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        showMessage('Fehler beim Hochladen!', 'error');
    }
}

// Stundenplan hochladen
async function uploadSchedule() {
    const fileInput = document.getElementById('scheduleUpload');
    const file = fileInput.files[0];
    const week = document.getElementById('scheduleWeek').value;
    
    if (!file || !week) {
        showMessage('Bitte wählen Sie eine Datei und Woche aus!', 'error');
        return;
    }
    
    if (file.type !== 'application/pdf') {
        showMessage('Bitte wählen Sie eine PDF-Datei aus!', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('schedule', file);
    formData.append('week', week);
    
    try {
        const token = localStorage.getItem(CONFIG.TOKEN_KEY);
        const response = await fetch(`${CONFIG.API_BASE}/upload/schedule`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('Stundenplan erfolgreich hochgeladen!', 'success');
            document.getElementById('scheduleStatus').innerHTML = `
                <div class="text-green-600 mt-2">✓ Stundenplan für Woche ${week} wurde hochgeladen<br>
                <span class="text-sm">URL: ${result.url}</span></div>
            `;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        showMessage('Fehler beim Hochladen!', 'error');
    }
}

// Nachricht anzeigen
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded shadow-lg text-white ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Abmelden
function logout() {
    if (confirm('Möchten Sie sich wirklich abmelden?')) {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        window.location.href = 'login.html';
    }
}

// Login-Überprüfung
function checkLogin() {
    const token = localStorage.getItem(CONFIG.TOKEN_KEY);
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Initialisierung
checkLogin();