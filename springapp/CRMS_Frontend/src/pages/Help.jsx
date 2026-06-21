import { useState } from 'react';
import { HelpCircle, Mail, FileText, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);

  const faqs = [
    { q: "How do I apply for a job?", a: "Navigate to the 'Find Jobs' section, click on a job that interests you, and hit the 'Apply' button. You can track your application status in 'My Applications'." },
    { q: "Can I update my profile?", a: "Yes, go to 'Settings' to update your personal details, upload a new resume, and manage your account preferences." },
    { q: "How are candidates selected?", a: "Recruiters review applications based on skills and qualifications. If shortlisted, you will be notified via email or through the platform's dashboard." },
    { q: "I forgot my password, what should I do?", a: "On the login page, click on 'Forgot Password' and follow the instructions to reset your account access." }
  ];

  const handleEmailClick = () => {
    window.location.href = "mailto:demodemocrms@gmail.com?subject=Zyqentra Support Request";
  };

  const handleDocsClick = () => {
    navigate('/docs');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2.5rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ background: 'var(--primary)', color: 'white', padding: '1.25rem', borderRadius: '16px', boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)' }}>
          <HelpCircle size={28} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--secondary)' }}>Help Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find answers and get the support you need.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <FileText size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>Documentation</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6, flex: 1 }}>
            Browse our detailed guides and tutorials to get the most out of the platform.
          </p>
          <button onClick={handleDocsClick} className="btn-secondary" style={{ width: '100%', fontWeight: 600 }}>Read Docs</button>
        </div>

        <div className="card glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', background: 'var(--gradient-blue)', opacity: 0.1, borderRadius: '50%', filter: 'blur(30px)' }}></div>
          
          <div style={{ background: 'var(--gradient-blue)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.3)' }}>
            <MessageSquare size={28} color="white" />
          </div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>Connect with Us</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Our experts are here to help you navigate Zyqentra.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--text-muted)' }}>CALL US</div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginLeft: 'auto' }}>+91 800 123 4567</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--text-muted)' }}>EMAIL US</div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginLeft: 'auto' }}>support@zyqentra.com</div>
            </div>
          </div>

          <div style={{ background: 'var(--primary-light)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', marginTop: 'auto' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem' }}>Prefer a live chat?</div>
            <button className="btn-primary" style={{ width: '100%' }}>Start Chat</button>
          </div>
        </div>
      </div>

      {showFaqs && (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ fontWeight: 600, fontSize: '1rem', textAlign: 'left', color: 'var(--secondary)' }}>{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeFaq === i && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
