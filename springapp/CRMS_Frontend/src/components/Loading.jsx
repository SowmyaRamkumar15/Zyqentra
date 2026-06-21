import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex-center" style={{ height: '100%', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          width: '50px',
          height: '50px',
          background: 'var(--gradient-primary)',
          boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)'
        }}
      />
      <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>Loading excellence...</p>
    </div>
  );
};

export default Loading;
