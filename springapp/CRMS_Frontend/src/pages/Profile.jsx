import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Award, Code, Save, CheckCircle, AlertCircle } from 'lucide-react';
import UserService from '../services/UserService';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const data = await UserService.getById(user.userId);
        setUserData(data);
      }
    } catch (err) {
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UserService.update(userData.userId, userData);
      showToast('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const calculateCompletionScore = () => {
    if (!userData) return 0;
    let score = 0;
    if (userData.username) score += 20;
    if (userData.email) score += 20;
    if (userData.phoneNumber) score += 20;
    if (userData.skills && userData.skills.trim().length > 0) score += 20;
    if (userData.certificates && userData.certificates.trim().length > 0) score += 20;
    return score;
  };

  if (loading) return <div className="flex-center h-[80vh]">Loading profile...</div>;

  const score = calculateCompletionScore();

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Your Profile</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your personal information, skills, and certifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div>
          <form onSubmit={handleSave} className="card p-10 border-none bg-surface">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Username</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    className="pl-12"
                    value={userData.username}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="email" 
                    readOnly
                    className="pl-12 opacity-70 cursor-not-allowed bg-slate-50 dark:bg-slate-800"
                    value={userData.email}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="tel" 
                  className="pl-12"
                  value={userData.phoneNumber || ''}
                  onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Skills (comma separated)</label>
              <div className="relative">
                <Code size={18} className="absolute left-4 top-4 text-slate-500" />
                <textarea 
                  rows="3"
                  placeholder="e.g. Java, React, SQL, Problem Solving"
                  className="pl-12 resize-none"
                  value={userData.skills || ''}
                  onChange={(e) => setUserData({...userData, skills: e.target.value})}
                ></textarea>
              </div>
            </div>

            <div className="mb-10">
              <label className="block mb-2 font-semibold text-sm text-slate-900 dark:text-slate-50">Certifications</label>
              <div className="relative">
                <Award size={18} className="absolute left-4 top-4 text-slate-500" />
                <textarea 
                  rows="3"
                  placeholder="e.g. AWS Certified Developer, Oracle Java SE 11"
                  className="pl-12 resize-none"
                  value={userData.certificates || ''}
                  onChange={(e) => setUserData({...userData, certificates: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full" 
              disabled={saving}
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        <div>
          <div className="card p-10 text-center border-none bg-surface">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Profile Completion</h3>
            
            <div className="relative w-36 h-36 mx-auto mb-8">
              <svg width="140" height="140" viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="54" fill="none" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="10" />
                <circle 
                  cx="60" cy="60" r="54" fill="none" className="stroke-indigo-600 transition-all duration-700 ease-out" strokeWidth="10" 
                  strokeDasharray={`${(score / 100) * 339} 339`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-extrabold text-3xl text-indigo-600 dark:text-indigo-400">
                {score}%
              </div>
            </div>

            <div className="text-left space-y-4">
              <div className={`flex items-center gap-3 text-sm font-medium ${userData.username ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                {userData.username ? <CheckCircle size={18} /> : <AlertCircle size={18} />} 
                <span className={userData.username ? 'text-slate-900 dark:text-slate-50' : ''}>Personal Info</span>
              </div>
              <div className={`flex items-center gap-3 text-sm font-medium ${userData.phoneNumber ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                {userData.phoneNumber ? <CheckCircle size={18} /> : <AlertCircle size={18} />} 
                <span className={userData.phoneNumber ? 'text-slate-900 dark:text-slate-50' : ''}>Phone Number</span>
              </div>
              <div className={`flex items-center gap-3 text-sm font-medium ${(userData.skills && userData.skills.trim()) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                {(userData.skills && userData.skills.trim()) ? <CheckCircle size={18} /> : <AlertCircle size={18} />} 
                <span className={(userData.skills && userData.skills.trim()) ? 'text-slate-900 dark:text-slate-50' : ''}>Skills Added</span>
              </div>
              <div className={`flex items-center gap-3 text-sm font-medium ${(userData.certificates && userData.certificates.trim()) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                {(userData.certificates && userData.certificates.trim()) ? <CheckCircle size={18} /> : <AlertCircle size={18} />} 
                <span className={(userData.certificates && userData.certificates.trim()) ? 'text-slate-900 dark:text-slate-50' : ''}>Certifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
