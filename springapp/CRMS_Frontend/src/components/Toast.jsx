import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        background: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        border: `1px solid ${type === 'success' ? '#bcf0da' : '#fecaca'}`,
        minWidth: '300px'
      }}
    >
      <div style={{ color: type === 'success' ? '#16a34a' : '#dc2626' }}>
        {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--secondary)' }}>
          {type === 'success' ? 'Success' : 'Error'}
        </p>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          {message}
        </p>
      </div>
      <button onClick={onClose} style={{ color: 'var(--text-muted)', background: 'transparent', padding: '0.25rem' }}>
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
