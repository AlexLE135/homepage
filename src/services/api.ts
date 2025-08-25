import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { username: string; password: string; email: string; role?: string }) =>
    api.post('/auth/register', userData),
  
  getMe: () => api.get('/auth/me'),
};

// Content API
export const contentAPI = {
  getContent: (key: string) => api.get(`/content/${key}`),
  
  updateContent: (key: string, data: any) => 
    api.put(`/content/${key}`, { data }),
  
  getAllContent: () => api.get('/content'),
};

// Skills API
export const skillsAPI = {
  getSkills: () => api.get('/skills'),
  
  createSkill: (skillData: {
    name: string;
    percentage: number;
    category?: string;
    icon?: string;
    sort_order?: number;
  }) => api.post('/skills', skillData),
  
  updateSkill: (id: number, skillData: any) => 
    api.put(`/skills/${id}`, skillData),
  
  deleteSkill: (id: number) => api.delete(`/skills/${id}`),
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),
  
  createProject: (projectData: {
    title: string;
    description?: string;
    image_url?: string;
    tags?: string;
    github_url?: string;
    demo_url?: string;
    sort_order?: number;
  }) => api.post('/projects', projectData),
  
  updateProject: (id: number, projectData: any) => 
    api.put(`/projects/${id}`, projectData),
  
  deleteProject: (id: number) => api.delete(`/projects/${id}`),
};

// Schedules API
export const schedulesAPI = {
  getSchedules: () => api.get('/schedules'),
  
  getCurrentSchedule: () => api.get('/schedules/current'),
  
  createSchedule: (scheduleData: {
    week_number: number;
    year: number;
    schedule_data: any;
    file_url?: string;
  }) => api.post('/schedules', scheduleData),
  
  deleteSchedule: (id: number) => api.delete(`/schedules/${id}`),
};

// Uploads API
export const uploadsAPI = {
  uploadFile: (formData: FormData) => 
    api.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  getFiles: () => api.get('/uploads'),
  
  deleteFile: (id: number) => api.delete(`/uploads/${id}`),
};

export default api;