import api from '../utils/api';

const DashboardService = {
  getAdminStats: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },

  getStudentStats: async (studentId, departmentId) => {
    const response = await api.get(`/dashboard/student/${studentId}/${departmentId}`);
    return response.data;
  }
};

export default DashboardService;
