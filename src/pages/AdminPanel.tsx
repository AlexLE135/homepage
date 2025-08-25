import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ContentData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  impressum: {
    company: string;
    address: string;
    contact: {
      email: string;
      phone: string;
    };
    legal: {
      ustId: string;
      taxNumber: string;
    };
  };
  datenschutz: {
    lastUpdated: string;
    version: string;
    contactEmail: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    content: string;
  };
}

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // In production: use environment variable

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Falsches Passwort!');
    }
  };

  const loadContent = async () => {
    try {
      const response = await fetch('/src/data/content.json');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const saveContent = async () => {
    try {
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content.json';
      a.click();
      URL.revokeObjectURL(url);
      setSaveStatus('✅ Inhalt wurde zum Download bereitgestellt');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('❌ Fehler beim Speichern');
    }
  };

  const updateContent = (path: string, value: any) => {
    if (!content) return;
    
    const newContent = { ...content };
    const keys = path.split('.');
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent";
  const textareaClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-32";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className={inputClass}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Anmelden
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Laden...</div>;
  }

  const tabs = [
    { id: 'personal', label: 'Persönliche Info', icon: '👤' },
    { id: 'impressum', label: 'Impressum', icon: '🏢' },
    { id: 'datenschutz', label: 'Datenschutz', icon: '🔒' },
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'about', label: 'Über mich', icon: 'ℹ️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Content Management System</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Abmelden
            </button>
          </div>

          {/* Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-2">              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-4">                <h2 className="text-lg font-semibold mb-4">Persönliche Informationen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                  <div>                    <label className="block text-sm font-medium mb-1">Name</label>                    <input
                      type="text"
                      value={content.personalInfo.name}
                      onChange={(e) => updateContent('personalInfo.name', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Titel</label>                    <input
                      type="text"
                      value={content.personalInfo.title}
                      onChange={(e) => updateContent('personalInfo.title', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">E-Mail</label>                    <input
                      type="email"
                      value={content.personalInfo.email}
                      onChange={(e) => updateContent('personalInfo.email', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Telefon</label>                    <input
                      type="tel"
                      value={content.personalInfo.phone}
                      onChange={(e) => updateContent('personalInfo.phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Straße</label>                    <input
                      type="text"
                      value={content.personalInfo.address.street}
                      onChange={(e) => updateContent('personalInfo.address.street', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Stadt</label>                    <input
                      type="text"
                      value={content.personalInfo.address.city}
                      onChange={(e) => updateContent('personalInfo.address.city', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Land</label>                    <input
                      type="text"
                      value={content.personalInfo.address.country}
                      onChange={(e) => updateContent('personalInfo.address.country', e.target.value)}
                      className={inputClass}
                    />
                  </div>                </div>              </div>
            )}

            {activeTab === 'impressum' && (
              <div className="space-y-4">                <h2 className="text-lg font-semibold mb-4">Impressum</h2>                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                  <div>                    <label className="block text-sm font-medium mb-1">Unternehmen</label>                    <input
                      type="text"
                      value={content.impressum.company}
                      onChange={(e) => updateContent('impressum.company', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Adresse</label>                    <input
                      type="text"
                      value={content.impressum.address}
                      onChange={(e) => updateContent('impressum.address', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Kontakt E-Mail</label>                    <input
                      type="email"
                      value={content.impressum.contact.email}
                      onChange={(e) => updateContent('impressum.contact.email', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Kontakt Telefon</label>                    <input
                      type="tel"
                      value={content.impressum.contact.phone}
                      onChange={(e) => updateContent('impressum.contact.phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Umsatzsteuer-ID</label>                    <input
                      type="text"
                      value={content.impressum.legal.ustId}
                      onChange={(e) => updateContent('impressum.legal.ustId', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Steuernummer</label>                    <input
                      type="text"
                      value={content.impressum.legal.taxNumber}
                      onChange={(e) => updateContent('impressum.legal.taxNumber', e.target.value)}
                      className={inputClass}
                    />
                  </div>                </div>              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-4">                <h2 className="text-lg font-semibold mb-4">Hero Section</h2>                <div className="space-y-4">                  <div>                    <label className="block text-sm font-medium mb-1">Titel</label>                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero.title', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Untertitel</label>                    <input
                      type="text"
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Beschreibung</label>                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero.description', e.target.value)}
                      className={textareaClass}
                    />
                  </div>                </div>              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">                <h2 className="text-lg font-semibold mb-4">Über mich</h2>                <div className="space-y-4">                  <div>                    <label className="block text-sm font-medium mb-1">Titel</label>                    <input
                      type="text"
                      value={content.about.title}
                      onChange={(e) => updateContent('about.title', e.target.value)}
                      className={inputClass}
                    />
                  </div>                  <div>                    <label className="block text-sm font-medium mb-1">Inhalt</label>                    <textarea
                      value={content.about.content}
                      onChange={(e) => updateContent('about.content', e.target.value)}
                      className={textareaClass}
                    />
                  </div>                </div>              </div>
            )}

            {/* Save Button */}
            <div className="border-t pt-4 mt-6">              <div className="flex justify-between items-center">                {saveStatus && <span className="text-sm text-gray-600">{saveStatus}</span>}
                <button
                  onClick={saveContent}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  💾 Als JSON herunterladen
                </button>
              </div>              <p className="text-sm text-gray-500 mt-2">
                💡 Tipp: Die heruntergeladene Datei muss manuell in `/src/data/content.json` kopiert werden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;