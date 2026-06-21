import api from '../utils/api';

const UserService = {
    getAll: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    create: async (user) => {
        const response = await api.post('/users', user);
        return response.data;
    },
    update: async (id, user) => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/users/${id}`);
    }
};

export default UserService;
