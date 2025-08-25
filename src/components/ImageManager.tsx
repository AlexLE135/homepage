import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface UploadedFile {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  path: string;
  uploaded_by: number;
  uploaded_by_name?: string;
  uploaded_at: string;
  url: string;
}

interface ImageManagerProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageManager: FC<ImageManagerProps> = ({ onImageSelect, currentImage }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/uploads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(data);
    } catch (err) {
      setError('Fehler beim Laden der Dateien');
      console.error('Error fetching files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/uploads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      onImageSelect(result.file.url);
      setShowUpload(false);
      fetchFiles(); // Refresh file list
    } catch (err) {
      setError('Fehler beim Hochladen');
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: number, filename: string) => {
    if (!confirm('Datei wirklich löschen?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/uploads/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');
      
      fetchFiles(); // Refresh file list
    } catch (err) {
      setError('Fehler beim Löschen');
      console.error('Error deleting file:', err);
    }
  };

  const imageFiles = files.filter(file => 
    file.mime_type.startsWith('image/')
  );

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Lade Bilder...</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Bilder verwalten</h4>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          {showUpload ? 'Abbrechen' : '+ Hochladen'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {showUpload && (
        <div className="mb-4 p-3 bg-white rounded border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neues Bild hochladen
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="w-full text-sm"
          />
          {isUploading && (
            <p className="text-sm text-gray-600 mt-2">Wird hochgeladen...</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
        {imageFiles.map((file) => (
          <div
            key={file.id}
            className={`border rounded p-2 bg-white cursor-pointer hover:shadow-md transition-shadow ${
              currentImage === file.url ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onImageSelect(file.url)}
          >
            <img
              src={file.url}
              alt={file.original_name}
              className="w-full h-16 object-cover rounded mb-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/api/placeholder/80/80';
              }}
            />
            <p className="text-xs text-gray-600 truncate" title={file.original_name}>
              {file.original_name}
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {Math.round(file.size / 1024)}KB
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id, file.filename);
                }}
                className="text-red-500 hover:text-red-700 text-xs"
                title="Löschen"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {imageFiles.length === 0 && !showUpload && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Keine Bilder vorhanden</p>
          <button
            onClick={() => setShowUpload(true)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            Erstes Bild hochladen
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageManager;