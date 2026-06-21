import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = ({ setUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            const decoded = parseJwt(token);
            const user = {
                email: decoded.sub,
                role: decoded.role
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            // Redirect based on role
            if (user.role === 'ROLE_ADMIN') {
                navigate('/admin');
            } else {
                navigate('/student');
            }
        } else {
            navigate('/login');
        }
    }, [location, navigate, setUser]);

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div className="loader"></div>
            <p>Completing sign in...</p>
        </div>
    );
};

export default AuthCallback;
