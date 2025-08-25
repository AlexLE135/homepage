import { useState, useEffect } from 'react';
import type { FC } from 'react';
import ImageManager from './ImageManager';

interface ContentData {
  personalInfo?: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
    social: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  hero?: {
    title: string;
    subtitle: string;
    description: string;
  };
  about?: {
    title: string;
    content: string;
  };
  skills?: Array<{
    id?: number;
    name: string;
    percentage: number;
    category: string;
    icon?: string;
    is_active?: boolean;
    sort_order?: number;
  }>;
  projects?: Array<{
    id?: number;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    github?: string;
    live?: string;
    featured?: boolean;
    is_published?: boolean;
    sort_order?: number;
  }>;
  contact?: {
    email: string;
    phone: string;
  };
}

const EnhancedAdminPanel: FC = () => {
  const [content, setContent] = useState<ContentData>({});
  const [activeSection, setActiveSection] = useState<'personal' | 'hero' | 'about' | 'skills' | 'projects' | 'contact'>('personal');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [error, setError] = useState('');
  const [showImageManager, setShowImageManager] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchContent();
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/content/all-content');
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError('Fehler beim Laden der Inhalte');
      console.error('Error fetching content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (key: string, data: any) => {
    try {
      setIsSaving(true);
      setSaveMessage('');
      setError('');

      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/content/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
      });

      if (!response.ok) throw new Error('Failed to save content');

      setSaveMessage('Inhalte erfolgreich gespeichert!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error('Error saving content:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (path: string, value: any) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
    
    // Auto-save after 2 seconds of inactivity
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      handleSave(activeSection, newContent[activeSection as keyof ContentData]);
    }, 2000);
    
    setAutoSaveTimer(timer);
  };

  const handleSkillChange = (index: number, field: string, value: any) => {
    const newSkills = [...(content.skills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setContent({ ...content, skills: newSkills });
    
    // Auto-save skills
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      handleSave('skills', newSkills);
    }, 2000);
    
    setAutoSaveTimer(timer);
  };

  const addSkill = () => {
    setContent({
      ...content,
      skills: [...(content.skills || []), { name: '', percentage: 50, category: 'Frontend' }]
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...(content.skills || [])];
    newSkills.splice(index, 1);
    setContent({ ...content, skills: newSkills });
  };

  const handleProjectChange = (index: number, field: string, value: any) => {
    const newProjects = [...(content.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    
    if (field === 'technologies' && typeof value === 'string') {
      newProjects[index].technologies = value.split(',').map(t => t.trim());
    }
    
    setContent({ ...content, projects: newProjects });
    
    // Auto-save projects
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      handleSave('projects', newProjects);
    }, 2000);
    
    setAutoSaveTimer(timer);
  };

  const addProject = () => {
    setContent({
      ...content,
      projects: [...(content.projects || []), { 
        title: '', 
        description: '', 
        technologies: [],
        featured: false,
        is_published: true
      }]
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...(content.projects || [])];
    newProjects.splice(index, 1);
    setContent({ ...content, projects: newProjects });
  };

  const handleImageSelect = (imageUrl: string) => {
    if (activeProjectIndex !== null) {
      handleProjectChange(activeProjectIndex, 'image', imageUrl);
    }
    setShowImageManager(false);
    setActiveProjectIndex(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Inhalte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Live-Editor für www.alexle135.de</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSave(activeSection, content[activeSection as keyof ContentData])}
                disabled={isSaving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Speichert...' : 'Aktuelle Sektion speichern'}
              </button>
              <button
                onClick={fetchContent}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Neu laden
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {saveMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {saveMessage}
            </div>
          )}

          {/* Navigation */}
          <div className="flex space-x-1 mb-6 border-b overflow-x-auto">
            {['personal', 'hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as any)}
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeSection === section
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {section === 'personal' && 'Persönliche Info'}
                {section === 'hero' && 'Hero Bereich'}
                {section === 'about' && 'Über mich'}
                {section === 'skills' && 'Fähigkeiten'}
                {section === 'projects' && 'Projekte'}
                {section === 'contact' && 'Kontakt'}
              </button>
            ))}
          </div>

          {/* Content Forms */}
          <div className="space-y-6">
            {activeSection === 'personal' && content.personalInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={content.personalInfo.name || ''}
                    onChange={(e) => handleInputChange('personalInfo.name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={content.personalInfo.title || ''}
                    onChange={(e) => handleInputChange('personalInfo.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                  <input
                    type="email"
                    value={content.personalInfo.email || ''}
                    onChange={(e) => handleInputChange('personalInfo.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={content.personalInfo.phone || ''}
                    onChange={(e) => handleInputChange('personalInfo.phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Straße</label>
                  <input
                    type="text"
                    value={content.personalInfo.address?.street || ''}
                    onChange={(e) => handleInputChange('personalInfo.address.street', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stadt</label>
                  <input
                    type="text"
                    value={content.personalInfo.address?.city || ''}
                    onChange={(e) => handleInputChange('personalInfo.address.city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={content.personalInfo.social?.github || ''}
                    onChange={(e) => handleInputChange('personalInfo.social.github', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={content.personalInfo.social?.linkedin || ''}
                    onChange={(e) => handleInputChange('personalInfo.social.linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeSection === 'hero' && content.hero && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={content.hero.title || ''}
                    onChange={(e) => handleInputChange('hero.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Untertitel</label>
                  <input
                    type="text"
                    value={content.hero.subtitle || ''}
                    onChange={(e) => handleInputChange('hero.subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                  <textarea
                    value={content.hero.description || ''}
                    onChange={(e) => handleInputChange('hero.description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeSection === 'about' && content.about && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={content.about.title || ''}
                    onChange={(e) => handleInputChange('about.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inhalt</label>
                  <textarea
                    value={content.about.content || ''}
                    onChange={(e) => handleInputChange('about.content', e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Fähigkeiten & Expertise</h3>
                  <button
                    onClick={addSkill}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    + Fähigkeit hinzufügen
                  </button>
                </div>
                
                <div className="space-y-4">
                  {content.skills?.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prozent</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.percentage}
                              onChange={(e) => handleSkillChange(index, 'percentage', parseInt(e.target.value))}
                              className="w-full"
                            />
                            <span className="text-sm font-medium w-12">{skill.percentage}%</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                          <select
                            value={skill.category}
                            onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Database">Database</option>
                            <option value="Cloud">Cloud</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Tools">Tools</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeSkill(index)}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Projekte & Arbeiten</h3>
                  <button
                    onClick={addProject}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    + Projekt hinzufügen
                  </button>
                </div>
                
                <div className="space-y-6">
                  {content.projects?.map((project, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Technologien (kommagetrennt)</label>
                          <input
                            type="text"
                            value={project.technologies?.join(', ') || ''}
                            onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="React, TypeScript, Node.js"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Beschreibung</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bild URL</label>
                          <div className="flex space-x-2">
                            <input
                              type="url"
                              value={project.image || ''}
                              onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                              placeholder="/images/project.jpg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const currentProject = content.projects?.[index];
                                setActiveProjectIndex(index);
                                setShowImageManager(true);
                              }}
                              className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700"
                            >
                              Auswählen
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                          <input
                            type="url"
                            value={project.github || ''}
                            onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                          <input
                            type="url"
                            value={project.live || ''}
                            onChange={(e) => handleProjectChange(index, 'live', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={project.featured || false}
                              onChange={(e) => handleProjectChange(index, 'featured', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Featured</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={project.is_published !== false}
                              onChange={(e) => handleProjectChange(index, 'is_published', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Veröffentlicht</span>
                          </label>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeProject(index)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          >
                            Projekt entfernen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'contact' && content.contact && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                  <input
                    type="email"
                    value={content.contact.email || ''}
                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={content.contact.phone || ''}
                    onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800 mb-2">✅ Live-Editor aktiv</h3>
            <p className="text-sm text-blue-700">
              Alle Änderungen werden direkt auf dem Server gespeichert. Die Homepage verwendet die neuen Daten sofort!
            </p>
          </div>
        </div>
      </div>

      {/* Image Manager Modal */}
      {showImageManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bild auswählen</h3>
              <button
                onClick={() => {
                  setShowImageManager(false);
                  setActiveProjectIndex(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ImageManager
              onImageSelect={handleImageSelect}
              currentImage={
                activeProjectIndex !== null 
                  ? content.projects?.[activeProjectIndex]?.image 
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAdminPanel;