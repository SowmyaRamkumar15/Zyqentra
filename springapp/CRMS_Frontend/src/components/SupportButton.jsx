import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, ArrowLeft, Bot, Sparkles, User, RotateCcw } from 'lucide-react';

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); // 'menu' or 'chat'
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to Zyqentra support. How can I help you navigate our campus recruitment management platform today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat when new message or typing starts
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (view === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, view]);

  const quickReplies = [
    "How to apply for a job?",
    "Check my application status",
    "How are interviews scheduled?",
    "Login / Reset Password issues"
  ];

  const getBotResponse = (text) => {
    const cleanText = text.toLowerCase();
    if (cleanText.includes('apply') || cleanText.includes('job') || cleanText.includes('board') || cleanText.includes('candidate')) {
      return "To apply for jobs on Zyqentra:\n1. Log in or register as a **Student (Candidate)**.\n2. Go to the **Job Board** section in your sidebar.\n3. Click on any job post to view details, then click **Apply Now**.\n4. Complete the required profile information and submit!";
    }
    if (cleanText.includes('status') || cleanText.includes('application')) {
      return "You can easily track your applications!\n1. Navigate to the **My Applications** tab on your Student Dashboard.\n2. Here you can see your status: *Applied, Shortlisted, Selected,* or *Rejected*.\n3. We also send an email notification as soon as the recruiter changes your status.";
    }
    if (cleanText.includes('recruiter') || cleanText.includes('interview') || cleanText.includes('schedule')) {
      return "For interviews on Zyqentra:\n- **Recruiters** can schedule interview rounds from the **Interviews** tab in their dashboard.\n- **Candidates** will view their scheduled interview dates/details directly in the dashboard and receive automated email reminders.";
    }
    if (cleanText.includes('password') || cleanText.includes('reset') || cleanText.includes('login')) {
      return "Login issues?\n1. Click on the **Forgot Password** link on the login page.\n2. Enter your registered email to receive a password reset link.\n3. Follow the instructions sent in the email to secure your account.";
    }
    if (cleanText.includes('contact') || cleanText.includes('phone') || cleanText.includes('email') || cleanText.includes('support')) {
      return "You can call us directly at **+91 800 123 4567** or send an email to **support@zyqentra.com**. Our experts are happy to help!";
    }
    if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey') || cleanText.includes('greetings')) {
      return "Hello! 😊 I'm the Zyqentra assistant. How can I guide you today? Feel free to ask about jobs, status tracking, or account setup!";
    }
    return "I'm here to help! If you have specific questions about applying for jobs, application status, interview schedules, or logging in, just ask. Otherwise, you can connect directly with our helpline at **support@zyqentra.com**.";
  };

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response after a brief typing delay
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi there! 👋 Welcome to Zyqentra support. How can I help you navigate our campus recruitment management platform today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Optional: reset view back to menu when closing
    setTimeout(() => setView('menu'), 300);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: 0,
              width: '380px',
              maxHeight: '520px',
              height: '80vh',
              background: 'var(--surface)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              background: 'var(--gradient-blue, var(--primary))',
              padding: '1.25rem 1.5rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {view === 'chat' && (
                  <button
                    onClick={() => setView('menu')}
                    style={{
                      background: 'transparent',
                      color: 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                    {view === 'chat' ? (
                      <>
                        <Bot size={18} /> Zyqentra Assistant
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Connect with Us
                      </>
                    )}
                  </h4>
                  <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: '2px 0 0 0' }}>
                    {view === 'chat' ? 'Online • Quick Support' : 'Our experts are here to help'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {view === 'chat' && (
                  <button
                    onClick={handleResetChat}
                    title="Reset Conversation"
                    style={{
                      background: 'transparent',
                      color: 'white',
                      opacity: 0.8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {view === 'menu' ? (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>CALL US</div>
                      <a href="tel:+918001234567" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', transition: 'color 0.2s' }}>
                        +91 800 123 4567
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--background)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMAIL US</div>
                      <a href="mailto:support@zyqentra.com" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', transition: 'color 0.2s' }}>
                        support@zyqentra.com
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Prefer an interactive automated chat?</p>
                  <button
                    onClick={() => setView('chat')}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      borderRadius: '14px',
                      background: 'var(--primary)',
                      color: 'white',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    <Send size={16} /> Start Chat
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {/* Messages List */}
                <div style={{
                  flex: 1,
                  padding: '1.25rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  background: 'var(--background)'
                }}
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        marginBottom: '3px',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600
                      }}
                      >
                        {msg.sender === 'bot' ? <Bot size={11} /> : <User size={11} />}
                        <span>{msg.sender === 'bot' ? 'Assistant' : 'You'} • {msg.timestamp}</span>
                      </div>
                      <div style={{
                        padding: '0.75rem 1rem',
                        borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: msg.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                        color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        whiteSpace: 'pre-line',
                        border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                      }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start'
                    }}
                    >
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px', fontWeight: 600 }}>
                        Assistant is typing...
                      </div>
                      <div style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '16px 16px 16px 4px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center'
                      }}
                      >
                        <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.2s infinite ease-in-out' }}></span>
                        <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.2s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                        <span className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1.2s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick replies suggestions */}
                <div style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--background)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  scrollbarWidth: 'none'
                }}
                >
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(reply)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '20px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    gap: '0.75rem',
                    background: 'var(--surface)',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    style={{
                      flex: 1,
                      padding: '0.6rem 1rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border)',
                      outline: 'none',
                      background: 'var(--background)'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    style={{
                      background: inputText.trim() && !isTyping ? 'var(--primary)' : 'var(--border)',
                      color: 'white',
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: inputText.trim() && !isTyping ? 'pointer' : 'default',
                      flexShrink: 0,
                      boxShadow: inputText.trim() && !isTyping ? '0 4px 10px rgba(37, 99, 235, 0.15)' : 'none'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default SupportButton;

