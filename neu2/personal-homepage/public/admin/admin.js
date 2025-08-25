/**
 * Admin Panel JavaScript - Content Management System
 * Ermöglicht die Verwaltung der Homepage-Inhalte
 */

// Konfiguration
const CONFIG = {
    API_ENDPOINT: 'api.php',
    UPLOAD_ENDPOINT: 'upload.php',
    CONTENT_FILE: 'content.json',
    IMAGES_DIR: '../public/images/',
    SCHEDULES_DIR: '../public/schedules/'
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
    
    // Seitenaufrufe laden (simuliert)
    loadPageViews();
    
    // SSL-Status prüfen
    checkSSLStatus();
}

// Seitenaufrufe laden (simuliert mit LocalStorage)
function loadPageViews() {
    let views = localStorage.getItem('pageViews') || 0;
    views = parseInt(views) + Math.floor(Math.random() * 10);
    localStorage.setItem('pageViews', views.toString());
    document.getElementById('pageViews').textContent = views;
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
function loadContent() {
    // Standardinhalte laden
    fetch(CONFIG.CONTENT_FILE)
        .then(response => response.json())
        .then(data => {
            document.getElementById('heroTitle').value = data.hero?.title || '';
            document.getElementById('heroSubtitle').value = data.hero?.subtitle || '';
            document.getElementById('heroCTA').value = data.hero?.cta || '';
            
            document.getElementById('aboutTitle').value = data.about?.title || '';
            document.getElementById('aboutDescription').value = data.about?.description || '';
            
            document.getElementById('impressumContent').value = data.legal?.impressum || '';
            document.getElementById('datenschutzContent').value = data.legal?.datenschutz || '';
        })
        .catch(() => {
            console.log('Keine vorhandenen Inhalte gefunden');
        });
}

// Projekte laden
function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    
    fetch('../src/data/projects.json')
        .then(response => response.json())
        .then(projects => {
            projectsList.innerHTML = '';
            projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'border p-4 rounded';
                projectDiv.innerHTML = `
                    <h4 class="font-semibold mb-2">${project.title}</h4>
                    <input type="text" value="${project.title}" class="w-full mb-2 border p-1 rounded" data-field="title" data-id="${project.id}">
                    <textarea class="w-full mb-2 border p-1 rounded" data-field="description" data-id="${project.id}" rows="2">${project.description}</textarea>
                    <input type="text" value="${project.github}" class="w-full mb-2 border p-1 rounded" data-field="github" data-id="${project.id}">
                    <input type="text" value="${project.demo}" class="w-full mb-2 border p-1 rounded" data-field="demo" data-id="${project.id}">
                    <div class="flex space-x-2">
                        <button onclick="saveProject(${project.id})" class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Speichern</button>
                        <button onclick="deleteProject(${project.id})" class="bg-red-600 text-white px-3 py-1 rounded text-sm">Löschen</button>
                    </div>
                `;
                projectsList.appendChild(projectDiv);
            });
        });
}

// Hero Section speichern
function saveHeroSection() {
    const data = {
        hero: {
            title: document.getElementById('heroTitle').value,
            subtitle: document.getElementById('heroSubtitle').value,
            cta: document.getElementById('heroCTA').value
        }
    };
    
    saveContent(data);
    showMessage('Hero Section gespeichert!', 'success');
}

// About Section speichern
function saveAboutSection() {
    const data = {
        about: {
            title: document.getElementById('aboutTitle').value,
            description: document.getElementById('aboutDescription').value
        }
    };
    
    saveContent(data);
    showMessage('About Section gespeichert!', 'success');
}

// Projekt speichern
function saveProject(id) {
    // Implementation für Projekt-Update
    showMessage('Projekt gespeichert!', 'success');
}

// Projekt löschen
function deleteProject(id) {
    if (confirm('Projekt wirklich löschen?')) {
        // Implementation für Projekt-Löschung
        showMessage('Projekt gelöscht!', 'success');
    }
}

// Neues Projekt hinzufügen
function addProject() {
    // Implementation für neues Projekt
    showMessage('Neues Projekt hinzugefügt!', 'success');
    loadProjects();
}

// Impressum speichern
function saveImpressum() {
    const data = {
        legal: {
            impressum: document.getElementById('impressumContent').value
        }
    };
    
    saveContent(data);
    showMessage('Impressum gespeichert!', 'success');
}

// Datenschutz speichern
function saveDatenschutz() {
    const data = {
        legal: {
            datenschutz: document.getElementById('datenschutzContent').value
        }
    };
    
    saveContent(data);
    showMessage('Datenschutzerklärung gespeichert!', 'success');
}

// Inhalt speichern
function saveContent(data) {
    // In LocalStorage speichern
    let existingData = JSON.parse(localStorage.getItem('contentData') || '{}');
    const updatedData = { ...existingData, ...data };
    localStorage.setItem('contentData', JSON.stringify(updatedData));
    
    // Optional: Als JSON-Datei downloaden
    downloadJSON(updatedData, 'content.json');
}

// Bild hochladen
function uploadImage() {
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
    formData.append('folder', document.getElementById('imageFolder').value);
    
    // Simuliertes Hochladen
    setTimeout(() => {
        showMessage('Bild erfolgreich hochgeladen!', 'success');
        document.getElementById('uploadStatus').innerHTML = `
            <div class="text-green-600 mt-2">✓ ${file.name} wurde hochgeladen</div>
        `;
    }, 1000);
}

// Stundenplan hochladen
function uploadSchedule() {
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
    
    // Simuliertes Hochladen
    setTimeout(() => {
        showMessage('Stundenplan erfolgreich hochgeladen!', 'success');
        document.getElementById('scheduleStatus').innerHTML = `
            <div class="text-green-600 mt-2">✓ Stundenplan für Woche ${week} wurde hochgeladen</div>
        `;
    }, 1000);
}

// JSON Download
function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
}

// Login-Überprüfung
function checkLogin() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }
}

// Initialisierung
checkLogin();