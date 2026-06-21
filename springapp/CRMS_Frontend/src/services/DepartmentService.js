import api from '../utils/api';

const DepartmentService = {
    getAll: async () => {
        const response = await api.get('/departments');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/departments/${id}`);
        return response.data;
    },
    create: async (dept) => {
        const response = await api.post('/departments', dept);
        return response.data;
    },
    update: async (id, dept) => {
        const response = await api.put(`/departments/${id}`, dept);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/departments/${id}`);
    }
};

export default DepartmentService;
