import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronRight, HelpCircle, ChevronLeft, CheckCircle2, MessageCircle, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Generate/Retrieve Session ID
// Generate/Retrieve Session ID (keyed by optional email)
const getSessionId = (email) => {
    const key = email ? `${email}_chatSessionId` : 'chatSessionId';
    let id = localStorage.getItem(key);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(key, id);
    }
    return id;
};

/**
 * Renders chat message content as clean, readable plain text.
 * Strips all markdown symbols (#, *, -, **) and formats into
 * paragraphs and indented list items using React elements.
 */
function CleanMessage({ content }) {
    const lines = content.split('\n');
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Strip heading markers (###, ##, #)
        line = line.replace(/^#{1,6}\s*/, '');

        // Strip bold/italic markers (**, *)
        line = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');

        // Detect list items starting with - or *
        const listMatch = line.match(/^[-*]\s+(.*)/);
        if (listMatch) {
            elements.push(
                <div key={key++} className="flex items-start gap-2 my-0.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{listMatch[1].trim()}</span>
                </div>
            );
        } else if (line.trim() === '') {
            if (i > 0) elements.push(<div key={key++} className="h-2" />);
        } else {
            elements.push(
                <p key={key++} className="leading-relaxed">{line.trim()}</p>
            );
        }
    }

    return <div className="space-y-0.5 text-sm">{elements}</div>;
}

const POPUP_DISMISSED_KEY = 'rixi_popup_dismissed';
const LAST_CONVO_KEY = 'rixi_last_conversation';

// Action types that lock the input box
const ACTION_TYPES = ['offer_contact', 'show_pricing', 'show_demo_options'];

export default function ChatWidget() {
    const { user, isAuthenticated, setAuthModalOpen, isAccountDropdownOpen } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/' || location.pathname === '/Home';

    // Only show popup if: on home page AND user hasn't dismissed it before
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);


    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('menu'); // 'menu', 'chat', 'feedback'
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [presets, setPresets] = useState([]);
    // Controls whether the text input is unlocked when action buttons are present
    const [isInputUnlocked, setIsInputUnlocked] = useState(false);
    const [isRecentOpen, setIsRecentOpen] = useState(false);
    const messagesEndRef = useRef(null);

    // Feedback state
    const [feedbackForm, setFeedbackForm] = useState({
        name: user?.displayName || user?.name || '',
        email: user?.email || '',
        category: 'General Feedback',
        title: '',
        description: ''
    });
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFeedbackForm(prev => ({
                ...prev,
                name: user?.displayName || user?.name || '',
                email: user?.email || ''
            }));
        }
    }, [user]);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setFeedbackLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/support/ticket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: feedbackForm.name,
                    email: feedbackForm.email,
                    message: `[Category: ${feedbackForm.category}]\nTitle: ${feedbackForm.title}\n\nDescription: ${feedbackForm.description}`,
                    attachments: [] // Chat feedback usually doesn't need attachments, keeping it simple
                }),
            });

            if (response.ok) {
                setFeedbackSubmitted(true);
                toast.success('Feedback sent! Thank you.');
                setTimeout(() => {
                    setFeedbackSubmitted(false);
                    setMode('menu');
                    setFeedbackForm(prev => ({ ...prev, title: '', description: '' }));
                }, 3000);
            } else {
                toast.error('Failed to send feedback. Please try again.');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            toast.error('Connection error. Please try again later.');
        } finally {
            setFeedbackLoading(false);
        }
    };

    // Load last saved conversation from localStorage
    const [savedConvo, setSavedConvo] = useState(null);

    // Initial load logic for welcome popup (keyed by email, using sessionStorage for per-session visibility)
    useEffect(() => {
        const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
        const dismissed = sessionStorage.getItem(key) === 'true';
        if (isHomePage && !dismissed && !isOpen && !isAccountDropdownOpen) {
            setShowWelcomePopup(true);
        }
    }, [user?.email, isHomePage, isOpen, isAccountDropdownOpen]);

    // Force show popup on fresh login transition
    const prevAuthRef = useRef(isAuthenticated);
    useEffect(() => {
        if (!prevAuthRef.current && isAuthenticated) {
            // User just logged in - force the popup to show
            const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
            sessionStorage.removeItem(key); // Reset any session-level dismissal
            setShowWelcomePopup(true);
        } else if (prevAuthRef.current && !isAuthenticated) {
            // User just logged out - clear dismissal states so it shows for the next login
            const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
            sessionStorage.removeItem(key);
            setShowWelcomePopup(false);
        }
        prevAuthRef.current = isAuthenticated;
    }, [isAuthenticated, user?.email]);

    // Sync savedConvo when user changes
    useEffect(() => {
        const key = user?.email ? `${user.email}_${LAST_CONVO_KEY}` : LAST_CONVO_KEY;
        try {
            const raw = localStorage.getItem(key);
            setSavedConvo(raw ? JSON.parse(raw) : null);
        } catch {
            setSavedConvo(null);
        }
    }, [user?.email]);

    // Hide popup when account dropdown opens, but allow it to come back after
    useEffect(() => {
        const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
        if (isAccountDropdownOpen) {
            setShowWelcomePopup(false);
        } else if (isHomePage && sessionStorage.getItem(key) !== 'true') {
            const timer = setTimeout(() => setShowWelcomePopup(true), 400);
            return () => clearTimeout(timer);
        }
    }, [isAccountDropdownOpen, isHomePage, user?.email]);

    // Hide popup on non-home pages; restore it on home page if not dismissed
    useEffect(() => {
        const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
        if (!isHomePage) {
            setShowWelcomePopup(false);
        } else if (sessionStorage.getItem(key) !== 'true') {
            setShowWelcomePopup(true);
        }
    }, [location.pathname, isHomePage, user?.email]);

    // Load presets
    useEffect(() => {
        const loadPresets = async () => {
            try {
                const response = await fetch('/assets/faq_presets.json');
                const data = await response.json();
                setPresets(data);
            } catch (error) {
                console.error('Error loading presets:', error);
                setPresets([
                    { id: 'pricing', label: 'Pricing & Plans' },
                    { id: 'how_it_works', label: 'How It Works' },
                    { id: 'contact', label: 'Contact Support' }
                ]);
            }
        };
        loadPresets();
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [messages, isLoading]);

    const handleToggle = () => {
        if (!isAuthenticated) {
            setAuthModalOpen(true);
            toast.info("Please sign in or create an account to chat with Rixi!");
            return;
        }
        setIsOpen(!isOpen);
    };

    // Save & reset chat when closed
    useEffect(() => {
        if (!isOpen) {
            if (messages.length > 0) {
                const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                const lastBotMsg = [...messages].reverse().find(m => m.role === 'bot');
                const convoData = {
                    messages,
                    preview: lastUserMsg?.content || lastBotMsg?.content || 'Previous conversation',
                    page: document.title || location.pathname,
                    time: new Date().toISOString(),
                };
                const key = user?.email ? `${user.email}_${LAST_CONVO_KEY}` : LAST_CONVO_KEY;
                localStorage.setItem(key, JSON.stringify(convoData));
                setSavedConvo(convoData);
            }
            setMessages([]);
            setMode('menu');
            setIsInputUnlocked(false);
        }
    }, [isOpen, user?.email]);

    const handleLetsTalk = () => {
        const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
        sessionStorage.setItem(key, 'true');
        setShowWelcomePopup(false);
        if (!isAuthenticated) {
            setAuthModalOpen(true);
            toast.info("Join IncuBrix to start chatting with your AI assistant!");
            return;
        }
        setIsOpen(true);
        setMode('menu');
    };

    const handleDismissPopup = () => {
        const key = user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY;
        sessionStorage.setItem(key, 'true');
        setShowWelcomePopup(false);
    };

    // Auto-dismiss popup after 5 seconds — animates sliding right toward chat icon
    useEffect(() => {
        if (!showWelcomePopup) return;
        const timer = setTimeout(() => {
            handleDismissPopup();
        }, 5000);
        return () => clearTimeout(timer);
    }, [showWelcomePopup]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePresetClick = (preset) => {
        if (preset.id === 'something_else' || preset.action === 'enable_input') {
            setMode('chat');
            const welcomeMsg = preset.answer || "Sure! Please type your question below and I'll do my best to help.";
            setMessages([{ id: Date.now(), role: 'bot', content: welcomeMsg, source: 'faq' }]);
            return;
        }

        const userMsg = { id: Date.now(), role: 'user', content: preset.label };
        // Show user message + typing indicator immediately
        setMessages([userMsg]);
        setMode('chat');
        setIsInputUnlocked(false);
        setIsLoading(true);

        // After 2 seconds, reveal the bot answer
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                role: 'bot',
                content: preset.answer || "I'll help you with that!",
                source: 'faq',
                action: preset.id === 'pricing' ? 'show_pricing' : preset.id === 'demo' ? 'show_demo_options' : undefined
            };
            setMessages(prev => [...prev, botMsg]);
            setIsLoading(false);
        }, 2000);
    };

    const handleContactSupport = () => {
        const supportMsg = "How would you like to get in touch with our team?";
        setMessages([{ id: Date.now(), role: 'bot', content: supportMsg, action: 'offer_contact' }]);
        setMode('chat');
        setIsInputUnlocked(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: currentInput,
                    sessionId: getSessionId(user?.email),
                    userId: user?.id
                })
            });
            const data = await response.json();
            const botMsg = { id: Date.now() + 1, role: 'bot', content: data.reply || "I'm sorry, I couldn't process that.", source: 'ai' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = { id: Date.now() + 1, role: 'bot', content: "Sorry, I'm having trouble connecting. Please try again later!", source: 'ai' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    // Whether the popup should actually be visible
    const popupVisible = showWelcomePopup && !isOpen && isHomePage && !isAccountDropdownOpen;

    // Detect if the last bot message has action buttons (locks input until user unlocks)
    const lastBotMessage = [...messages].reverse().find(m => m.role === 'bot');
    const hasActiveActions = !isInputUnlocked && lastBotMessage && ACTION_TYPES.includes(lastBotMessage.action);

    return (
        <div className="fixed bottom-6 right-4 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[#050510] border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,255,255,0.2)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#0a0e27]/80 backdrop-blur-md p-4 border-b border-white/5 flex items-center justify-between shrink-0 h-16">
                            <div className="flex items-center gap-3">
                                {mode !== 'menu' && (
                                    <Button variant="ghost" size="icon" onClick={() => setMode('menu')} className="w-6 h-6 -ml-2 text-gray-400 hover:text-white">
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                )}
                                {mode === 'feedback' ? (
                                    <h3 className="text-white font-semibold text-xs tracking-tight leading-tight text-center flex-1 pr-6 uppercase tracking-wider">
                                        Tell us what you think or report an issue!
                                    </h3>
                                ) : (
                                    <>
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 overflow-hidden shadow-lg shadow-cyan-500/20">
                                                <img src="/assets/rixi-avatar.png" alt="Rixi" className="w-full h-full object-cover block" />
                                            </div>
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0e27] rounded-full"></span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-sm tracking-wide">Rixi - IncuBrix AI assistant</h3>
                                            <p className="text-[10px] text-cyan-400/80 font-medium uppercase tracking-wider">Powered by IncuBrix</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto bg-[#050510] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">

                            {/* --- MENU MODE --- */}
                            {mode === 'menu' && (
                                <div className="p-4 flex flex-col h-full">

                                    {/* Compact Recent Dropdown */}
                                    {savedConvo && savedConvo.messages?.length > 0 && (
                                        <div className="mb-4 relative">
                                            <button
                                                onClick={() => setIsRecentOpen(v => !v)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f1535] border border-white/8 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                                            >
                                                Recent
                                                <svg className={`w-3 h-3 transition-transform duration-200 ${isRecentOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {isRecentOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-2 rounded-xl bg-[#0f1535] border border-white/8 overflow-hidden shadow-xl"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setMessages(savedConvo.messages);
                                                            setIsInputUnlocked(false);
                                                            setMode('chat');
                                                            setIsRecentOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <div className="w-6 h-6 rounded-full border border-cyan-500/30 overflow-hidden shrink-0">
                                                                <img src="/assets/rixi-avatar.png" alt="Rixi" className="w-full h-full object-cover block" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-semibold text-white truncate max-w-[160px]">
                                                                    {savedConvo.preview.replace(/\*\*(.*?)\*\*/g, '$1').replace(/^#{1,6}\s*/, '').slice(0, 40)}{savedConvo.preview.length > 40 ? '…' : ''}
                                                                </p>
                                                                <p className="text-[10px] text-gray-500">
                                                                    {new Date(savedConvo.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] text-cyan-400 font-semibold shrink-0 group-hover:text-cyan-300 flex items-center gap-0.5">
                                                            Continue <ChevronRight className="w-3 h-3" />
                                                        </span>
                                                    </button>
                                                    <div className="border-t border-white/5 px-4 py-2">
                                                        <button
                                                            onClick={() => {
                                                                const key = user?.email ? `${user.email}_${LAST_CONVO_KEY}` : LAST_CONVO_KEY;
                                                                localStorage.removeItem(key);
                                                                setSavedConvo(null);
                                                                setIsRecentOpen(false);
                                                            }}
                                                            className="text-[10px] text-gray-600 hover:text-red-400 transition-colors"
                                                        >
                                                            Clear history
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                    {/* Premium Floating Typography Greeting */}
                                    <div className="mb-6 px-1 py-2 relative group mt-2">
                                        <div className="mb-1">
                                            <h2 className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] tracking-tight">
                                                Hey {isAuthenticated && user?.name ? user.name.split(' ')[0] : "there"}!
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-0.5 w-8 bg-gradient-to-r from-cyan-500 to-transparent rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                                            <p className="text-sm font-semibold text-cyan-400/90 tracking-wide uppercase">
                                                How can I assist you today?
                                            </p>
                                        </div>
                                        
                                        {/* Subtle background glow effect */}
                                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none"></div>
                                    </div>

                                    {/* Vertical Presets - Compact List */}
                                    <div className="grid gap-2 mb-2">
                                        {presets.map((preset) => (
                                            <motion.button
                                                key={preset.id}
                                                whileHover={{ scale: 1.01, x: 4 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={() => handlePresetClick(preset)}
                                                className="group text-left px-4 py-2.5 rounded-xl bg-[#0f1535] border border-white/5 hover:border-cyan-500/30 hover:bg-[#151d45] transition-all flex items-center justify-between"
                                            >
                                                <span className="text-gray-300 text-xs font-semibold group-hover:text-cyan-400 transition-colors">
                                                    {preset.label}
                                                </span>
                                                <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 transition-all" />
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="space-y-2 mt-auto">
                                        {/* Contact Support — distinct action button */}
                                        <button
                                            onClick={handleContactSupport}
                                            className="group w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#0d1330] border border-indigo-500/25 hover:border-indigo-400/50 hover:bg-indigo-950/40 transition-all"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                                    <HelpCircle className="w-3 h-3 text-indigo-400" />
                                                </div>
                                                <span className="text-xs font-bold text-indigo-300 tracking-tight">Contact Support</span>
                                            </div>
                                            <ChevronRight className="w-3.5 h-3.5 text-indigo-500/40" />
                                        </button>

                                        {/* Feedback — visually distinct, emerald tone */}
                                        <button
                                            onClick={() => setMode('feedback')}
                                            className="group w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#0a1a14] border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-950/30 transition-all"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                                                </div>
                                                <span className="text-xs font-bold text-emerald-300/80 tracking-tight">Tell us what you think</span>
                                            </div>
                                            <ChevronRight className="w-3.5 h-3.5 text-emerald-500/40" />
                                        </button>

                                        <div className="text-[10px] text-gray-500 text-center mt-2 px-4 bg-[#0f1535]/50 py-2 rounded-lg border border-white/5">
                                            By using this bot, you agree to our <a href="/privacy" className="underline hover:text-cyan-400">policies</a>.
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* --- CHAT MODE --- */}
                            {mode === 'chat' && (
                                <div className="p-4 space-y-6">
                                    <div className="text-center text-xs text-gray-600 my-4 flex items-center justify-center gap-4">
                                        <div className="h-px bg-white/5 flex-1"></div>
                                        <span>Today</span>
                                        <div className="h-px bg-white/5 flex-1"></div>
                                    </div>

                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className="max-w-[85%]">
                                                <div className={`
                                                    rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                                                    ${msg.role === 'user'
                                                        ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                                                        : 'bg-[#151d45] text-gray-100 border border-white/5 rounded-tl-sm'
                                                    }
                                                `}>
                                                    <CleanMessage content={msg.content} />

                                                    {/* --- Action Buttons --- */}
                                                    {msg.action === 'offer_contact' && (
                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=support@incubrix.com', '_blank')}
                                                                className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white text-xs py-1 h-8 px-4"
                                                            >
                                                                Email us
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => { setIsOpen(false); navigate('/NeedHelp#contact-form'); }}
                                                                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white text-xs py-1 h-8 px-4"
                                                            >
                                                                Need Help?
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {msg.action === 'show_pricing' && (
                                                        <div className="mt-4">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => { setIsOpen(false); navigate('/Pricing#plans'); }}
                                                                className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white text-xs py-1 h-8 w-full font-bold uppercase tracking-wider"
                                                            >
                                                                Visit Pricing &amp; Plans Page
                                                                <ChevronRight className="w-3 h-3 ml-1" />
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {msg.action === 'show_demo_options' && (
                                                        <div className="mt-4 flex flex-col gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => { 
                                                                    setIsOpen(false); 
                                                                    if (location.pathname === '/') {
                                                                        document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
                                                                    } else {
                                                                        navigate('/#book-demo');
                                                                    }
                                                                }}
                                                                className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white text-xs py-1 h-8 w-full font-bold uppercase tracking-wider text-left justify-start"
                                                            >
                                                                Book a Demo
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setMessages(prev => [...prev,
                                                                    { id: Date.now(), role: 'user', content: 'Watch a pre-recorded video' },
                                                                    { id: Date.now() + 1, role: 'bot', content: "Our pre-recorded demo video is coming soon! Stay tuned for updates.", source: 'faq' }
                                                                    ]);
                                                                    setIsInputUnlocked(true);
                                                                }}
                                                                className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white text-xs py-1 h-8 w-full font-bold uppercase tracking-wider text-left justify-start"
                                                            >
                                                                Watch a pre-recorded video
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {/* "Something else?" — only on last bot msg with actions, while locked */}
                                                    {ACTION_TYPES.includes(msg.action) && msg.id === lastBotMessage?.id && !isInputUnlocked && (
                                                        <motion.button
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            onClick={() => setIsInputUnlocked(true)}
                                                            className="mt-3 w-full py-2 rounded-lg border border-dashed border-gray-600/50 text-[11px] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all font-medium flex items-center justify-center gap-1.5"
                                                        >
                                                            <span>Something else?</span>
                                                            <span className="text-gray-500">Type below here ↓</span>
                                                        </motion.button>
                                                    )}
                                                </div>

                                                {(msg.source === 'ai' || msg.source === 'faq') && (
                                                    <div className="text-[9px] text-gray-600 mt-1 ml-1 flex items-center gap-1 uppercase tracking-tighter font-medium">
                                                        <div className="w-3 h-3 rounded-full overflow-hidden border border-cyan-500/10">
                                                            <img src="/assets/rixi-avatar.png" alt="Rixi" className="w-full h-full object-cover block" />
                                                        </div>
                                                        {msg.source === 'ai' ? 'AI Answer' : 'Official FAQ'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-[#151d45] rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    )}

                                    {!isLoading && messages.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="pt-4 flex justify-center"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setMode('menu')}
                                                className="text-gray-500 hover:text-cyan-400 hover:bg-transparent text-[11px] font-medium transition-all gap-1.5"
                                            >
                                                <ChevronRight className="w-3 h-3 rotate-180" />
                                                Back to Menu Options
                                            </Button>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            )}

                            {/* --- FEEDBACK MODE --- */}
                            {mode === 'feedback' && (
                                <div className="p-6 flex flex-col h-full bg-[#050510]">
                                    {feedbackSubmitted ? (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                                                <CheckCircle2 className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">Thank you!</h4>
                                                <p className="text-gray-400 text-sm mt-1">Our team has received your feedback.</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                            <div className="space-y-1.5">
                                                <Input
                                                    placeholder="Name"
                                                    value={feedbackForm.name}
                                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                                                    className="bg-[#151d45] border-white/10 text-white placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    value={feedbackForm.email}
                                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                                                    className="bg-[#151d45] border-white/10 text-white placeholder:text-gray-500"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Select
                                                    value={feedbackForm.category}
                                                    onValueChange={(val) => setFeedbackForm({ ...feedbackForm, category: val })}
                                                >
                                                    <SelectTrigger className="bg-[#151d45] border-white/10 text-white relative z-10">
                                                        <SelectValue placeholder="Category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0a0e27] border-white/10 text-white z-[100]">
                                                        <SelectItem value="General Feedback" className="hover:bg-white/5 focus:bg-white/10 focus:text-white cursor-pointer">General Feedback</SelectItem>
                                                        <SelectItem value="Bug Report" className="hover:bg-white/5 focus:bg-white/10 focus:text-white cursor-pointer">Bug Report</SelectItem>
                                                        <SelectItem value="Feature Request" className="hover:bg-white/5 focus:bg-white/10 focus:text-white cursor-pointer">Feature Request</SelectItem>
                                                        <SelectItem value="Account Issue" className="hover:bg-white/5 focus:bg-white/10 focus:text-white cursor-pointer">Account Issue</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="bg-[#151d45] border-white/10 rounded-xl overflow-hidden border">
                                                    <Input
                                                        placeholder="Title"
                                                        value={feedbackForm.title}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                                                        className="bg-transparent border-none text-white placeholder:text-gray-500 h-10 px-4 focus-visible:ring-0"
                                                        required
                                                    />
                                                    <Textarea
                                                        placeholder="Description"
                                                        value={feedbackForm.description}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
                                                        className="bg-transparent border-none text-white placeholder:text-gray-500 min-h-[140px] px-4 py-2 resize-none focus-visible:ring-0"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={feedbackLoading}
                                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-cyan-500/20"
                                            >
                                                {feedbackLoading ? (
                                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    'Submit Feedback'
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        {mode === 'chat' && (
                            <div className="p-4 bg-[#0a0e27]/80 backdrop-blur border-t border-white/5 shrink-0">
                                {hasActiveActions && (
                                    <p className="text-[10px] text-gray-600 text-center mb-2 font-medium">
                                        Choose an option above or click <span className="text-gray-500">"Something else?"</span> to type freely
                                    </p>
                                )}
                                <form onSubmit={handleSend} className="relative">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={hasActiveActions ? 'Select an option above...' : 'Ask a question...'}
                                        className={`bg-[#0f1535] border-white/10 text-white pr-12 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 h-10 rounded-xl transition-all ${hasActiveActions
                                            ? 'placeholder:text-gray-600 opacity-40 cursor-not-allowed'
                                            : 'placeholder:text-gray-500 opacity-100'
                                            }`}
                                        disabled={isLoading || hasActiveActions}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!input.trim() || isLoading || hasActiveActions}
                                        className="absolute right-1 top-1 h-8 w-8 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors disabled:opacity-30"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </Button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Welcome Teaser Popup — compact horizontal pill to the left of chat icon */}
            <AnimatePresence>
                {popupVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.7 }}
                        transition={{ duration: 0.35, ease: 'easeIn' }}
                        className="absolute bottom-2 right-16 flex items-center gap-2.5 bg-[#0f1535] border border-cyan-500/30 rounded-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),0_0_16px_rgba(6,182,212,0.12)] backdrop-blur-xl px-3 py-2.5 whitespace-nowrap"
                    >
                        {/* Avatar with online dot */}
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 shadow-sm shadow-cyan-500/20">
                                <img src="/assets/rixi-avatar.png" alt="Rixi" className="w-full h-full object-cover block" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f1535] rounded-full" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col leading-tight">
                            <span className="text-[9px] font-bold text-cyan-400/70 uppercase tracking-widest">Assistant Rixi</span>
                            <span className="text-xs font-semibold text-white/90">
                                Hey {isAuthenticated && user?.name ? user.name.split(' ')[0] : 'there'}!
                            </span>
                        </div>

                        {/* Let's talk */}
                        <button
                            onClick={handleLetsTalk}
                            className="ml-1 h-7 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-[10px] font-bold text-white hover:opacity-90 active:scale-95 transition-all shadow-md shadow-cyan-500/30 flex items-center gap-1"
                        >
                            Let's talk
                            <ChevronRight className="w-3 h-3" />
                        </button>

                        {/* Dismiss */}
                        <button
                            onClick={handleDismissPopup}
                            className="text-gray-600 hover:text-white transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button — always visible on all pages */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className={`
                    h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center transition-all duration-300 z-50 overflow-hidden
                    ${isOpen
                        ? 'bg-[#151d45] text-white border border-white/10'
                        : 'border-2 border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]'
                    }
                `}
            >
                {isOpen ? <X className="w-6 h-6" /> : <img src="/assets/rixi-avatar.png" alt="Rixi" className="w-full h-full object-cover block" />}

                {!isOpen && isHomePage && localStorage.getItem(user?.email ? `${user.email}_${POPUP_DISMISSED_KEY}` : POPUP_DISMISSED_KEY) !== 'true' && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-[#151d45]"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
