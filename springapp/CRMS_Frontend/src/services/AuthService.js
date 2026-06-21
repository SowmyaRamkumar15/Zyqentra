import api from '../utils/api';

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

const AuthService = {
    login: async (credentials) => {
        // Backend expects 'email' and 'password'
        const response = await api.post('/auth/login', credentials);
        const { accessToken, refreshToken } = response.data;
        
        if (accessToken) {
            const decoded = parseJwt(accessToken);
            const user = {
                userId: decoded.userId,
                username: decoded.username,
                email: decoded.sub,
                role: decoded.role
            };
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            
            return { token: accessToken, user };
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
};

export default AuthService;
