import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight } from 'lucide-react';
import AuthService from '../../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { role } = useParams();
  const navigate = useNavigate();

  const activeRole = role || 'student';

  const roles = [
    { id: 'student', label: 'Student' },
    { id: 'admin', label: 'Placement Officer' },
    { id: 'recruiter', label: 'Recruiter' }
  ];

  const getRoleTitle = () => {
    switch (activeRole) {
      case 'admin': return 'Placement Officer Registration';
      case 'recruiter': return 'Recruiter Registration';
      case 'student':
      default: return 'Student Registration';
    }
  };

  const getRoleEnum = () => {
    switch (activeRole) {
      case 'admin': return 'ROLE_ADMIN';
      case 'recruiter': return 'ROLE_RECRUITER';
      case 'student':
      default: return 'ROLE_STUDENT';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = {
        ...formData,
        role: getRoleEnum()
      };
      await AuthService.register(userData);
      navigate(`/login/${activeRole}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] w-full p-8 bg-background">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card w-full max-w-lg p-12 mx-auto border-none" 
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center bg-indigo-600 w-16 h-16 rounded-2xl mx-auto mb-6 text-white shadow-lg shadow-indigo-500/20">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{getRoleTitle()}</h2>
          <p className="text-slate-500 dark:text-slate-400">Create your Zyqentra account</p>
        </div>

        {/* Role Tabs */}
        <div className="flex p-1 bg-surface border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 shadow-inner">
          {roles.map(r => (
            <Link 
              key={r.id}
              to={`/register/${r.id}`}
              className={`flex-1 text-center py-3 px-4 rounded-xl text-sm transition-all duration-300 ${activeRole === r.id ? 'bg-indigo-600 text-white font-bold shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium'}`}
            >
              {r.label}
            </Link>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Full Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <User size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Enter your full name"
                className="pl-12"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Mail size={18} />
              </span>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="pl-12"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Phone Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Phone size={18} />
              </span>
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="pl-12"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock size={18} />
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="pl-12 pr-12"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">OR</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <button 
          onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
          className="w-full flex items-center justify-center gap-3 bg-surface border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-3.5 rounded-2xl font-bold shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md" 
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" height="18" alt="Google" />
          Sign up with Google
        </button>

        <div className="mt-8 text-center text-sm text-slate-500">
          Already have an account? <Link to={`/login/${activeRole}`} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Sign in here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
