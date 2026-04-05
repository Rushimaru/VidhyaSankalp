import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Super Admin APIs
export const superAdminApi = {
  getStats:             () => api.get('/super-admin/stats'),
  getInstitutions:      () => api.get('/super-admin/institutions'),
  getInstitution:       (id) => api.get(`/super-admin/institutions/${id}`),
  createInstitution:    (data) => api.post('/super-admin/institutions', data),
  updateInstitution:    (id, data) => api.put(`/super-admin/institutions/${id}`, data),
  toggleInstitution:    (id) => api.patch(`/super-admin/institutions/${id}/toggle`),
  getPayments:          () => api.get('/super-admin/payments'),
  recordPayment:        (data) => api.post('/super-admin/payments', data),
  updatePayment:        (id, data) => api.put(`/super-admin/payments/${id}`, data),
  getPlans:             () => api.get('/super-admin/plans'),
  createPlan:           (data) => api.post('/super-admin/plans', data),
  upsertPlan:           (id, data) => api.put(`/super-admin/plans/${id}`, data),
};

// ── Institution APIs
export const institutionApi = {
  getAcademicYears:   () => api.get('/institution/academic-years'),
  createAcademicYear: (data) => api.post('/institution/academic-years', data),
  updateAcademicYear: (id, data) => api.put(`/institution/academic-years/${id}`, data),
  deleteAcademicYear: (id) => api.delete(`/institution/academic-years/${id}`),
  getClasses:         (params) => api.get('/institution/classes', { params }),
  createClass:        (data) => api.post('/institution/classes', data),
  updateClass:        (id, data) => api.put(`/institution/classes/${id}`, data),
  deleteClass:        (id) => api.delete(`/institution/classes/${id}`),
  getSubjects:        (params) => api.get('/institution/subjects', { params }),
  createSubject:      (data) => api.post('/institution/subjects', data),
  updateSubject:      (id, data) => api.put(`/institution/subjects/${id}`, data),
  deleteSubject:      (id) => api.delete(`/institution/subjects/${id}`),
  getFaculty:         () => api.get('/institution/faculty'),
  createFaculty:      (data) => api.post('/institution/faculty', data),
  updateFaculty:      (id, data) => api.put(`/institution/faculty/${id}`, data),
  toggleFaculty:      (id) => api.patch(`/institution/faculty/${id}/toggle`),
};

// ── Student APIs
export const studentApi = {
  getAll:       (params) => api.get('/students', { params }),
  getById:      (id) => api.get(`/students/${id}`),
  getStats:     () => api.get('/students/stats'),
  create:       (data) => api.post('/students', data),
  update:       (id, data) => api.put(`/students/${id}`, data),
  delete:       (id) => api.delete(`/students/${id}`),
  bulkUpload:   (formData) => api.post('/students/bulk-upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ── Attendance APIs
export const attendanceApi = {
  mark:          (data) => api.post('/attendance/mark', data),
  getAttendance: (params) => api.get('/attendance', { params }),
  getSummary:    (studentId, params) => api.get(`/attendance/summary/${studentId}`, { params }),
};

// ── Fee APIs
export const feeApi = {
  getAll:    (params) => api.get('/fees', { params }),
  getSummary:(params) => api.get('/fees/summary', { params }),
  create:    (data) => api.post('/fees', data),
  collect:   (id, data) => api.put(`/fees/${id}/collect`, data),
  update:    (id, data) => api.put(`/fees/${id}`, data),
  delete:    (id) => api.delete(`/fees/${id}`),
};

// ── Material APIs
export const materialApi = {
  getAll:   (params) => api.get('/materials', { params }),
  upload:   (formData) => api.post('/materials', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:   (id) => api.delete(`/materials/${id}`),
};

// ── Assignment APIs
export const assignmentApi = {
  getAll:   (params) => api.get('/assignments', { params }),
  getById:  (id) => api.get(`/assignments/${id}`),
  create:   (data) => api.post('/assignments', data),
  update:   (id, data) => api.put(`/assignments/${id}`, data),
  submit:   (id, formData) => api.post(`/assignments/${id}/submit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  grade:    (id, studentId, data) => api.patch(`/assignments/${id}/grade/${studentId}`, data),
};

// ── Timetable APIs
export const timetableApi = {
  get:            (params) => api.get('/timetable', { params }),
  getForTeacher:  (userId) => api.get(`/timetable/teacher/${userId}`),
  save:           (data) => api.post('/timetable', data),
  delete:         (id) => api.delete(`/timetable/${id}`),
};

// ── Auth API
export const authApi = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  verifyOtp:(data) => api.post('/auth/verify-otp', data),
};
