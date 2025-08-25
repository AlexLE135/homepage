// src/components/AdminPanel.tsx
import { useState } from 'react';
import type { FC } from 'react';
import contentData from '../data/content.json';

interface ContentData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    address: { street: string; city: string };
  };
  impressum: { company: string; address: string };
  datenschutz: { lastUpdated: string };
}

const AdminPanel: FC = () => {
  const [content, setContent] = useState<ContentData>(
    contentData as ContentData,
  );
  const [activeSection, setActiveSection] = useState<'personal' | 'impressum' | 'datenschutz'>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Inhalte wurden gespeichert!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleInputChange = (path: string, value: string) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Speichert...' : 'Speichern'}
            </button>
          </div>

          {saveMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {saveMessage}
            </div>
          )}

          {/* Navigation */}
          <div className="flex space-x-4 mb-6 border-b">
            {['personal', 'impressum', 'datenschutz'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as 'personal' | 'impressum' | 'datenschutz')}
                className={`px-4 py-2 font-medium ${
                  activeSection === section
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Forms */}
          <div className="space-y-6">
            {activeSection === 'personal' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={content.personalInfo.name}
                    onChange={(e) => handleInputChange('personalInfo.name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={content.personalInfo.title}
                    onChange={(e) => handleInputChange('personalInfo.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                  <input
                    type="email"
                    value={content.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Straße</label>
                  <input
                    type="text"
                    value={content.personalInfo.address.street}
                    onChange={(e) => handleInputChange('personalInfo.address.street', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stadt</label>
                  <input
                    type="text"
                    value={content.personalInfo.address.city}
                    onChange={(e) => handleInputChange('personalInfo.address.city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {activeSection === 'impressum' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unternehmen</label>
                  <input
                    type="text"
                    value={content.impressum.company}
                    onChange={(e) => handleInputChange('impressum.company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    value={content.impressum.address}
                    onChange={(e) => handleInputChange('impressum.address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {activeSection === 'datenschutz' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Letzte Aktualisierung</label>
                  <input
                    type="date"
                    value={content.datenschutz.lastUpdated}
                    onChange={(e) => handleInputChange('datenschutz.lastUpdated', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-800">
                    Hinweis: Die vollständige Datenschutzerklärung wird automatisch generiert basierend auf den aktuellen Inhalten.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold mb-2">Hinweis</h3>
            <p className="text-sm text-gray-600">
              Die Änderungen werden lokal gespeichert. Um sie dauerhaft zu speichern,
              müssen Sie die JSON-Datei manuell aktualisieren.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
