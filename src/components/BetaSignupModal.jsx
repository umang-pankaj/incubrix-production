import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2, Rocket, Sparkles, Plus, X, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

import { ALL_COUNTRY_CODES } from '@/lib/countryCodes';

const inputClass = "bg-[#151d45]/60 border-cyan-500/20 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 h-11 rounded-xl";

const CREATOR_TYPES = [
    { id: 'thought_leaders', label: 'Thought Leaders' },
    { id: 'podcasters', label: 'Podcasters' },
    { id: 'youtubers', label: 'YouTubers' },
    { id: 'educators', label: 'Educators' },
    { id: 'solopreneurs', label: 'Solopreneurs' },
];

const PLATFORMS = [
    {
        id: 'linkedin', label: 'LinkedIn',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
    },
    {
        id: 'youtube', label: 'YouTube',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>),
    },
    {
        id: 'instagram', label: 'Instagram',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>),
    },
    {
        id: 'apple_podcast', label: 'Apple Podcasts',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm7.952 4.408c2.336.007 4.528.994 6.094 2.745a8.336 8.336 0 012.018 5.815 8.513 8.513 0 01-1.498 4.714c-.697 1.018-1.63 1.93-2.763 2.23-.389.101-.775.049-1.12-.143-.344-.192-.576-.51-.681-.887l-.005-.022c-.162-.655.046-1.387.635-1.88.325-.276.606-.603.847-.969a5.316 5.316 0 00.79-3.005 5.408 5.408 0 00-10.816 0 5.316 5.316 0 00.79 3.005c.241.366.522.693.847.97.59.492.797 1.224.635 1.879l-.005.022c-.105.377-.337.695-.681.887-.345.192-.731.244-1.12.143-1.133-.3-2.066-1.212-2.763-2.23A8.513 8.513 0 013.596 13a8.336 8.336 0 012.018-5.815 8.338 8.338 0 016.094-2.745zm.007 3.569a4.783 4.783 0 014.783 4.783 4.783 4.783 0 01-4.783 4.783 4.783 4.783 0 01-4.783-4.783 4.783 4.783 0 014.783-4.783zm0 2.486a2.297 2.297 0 100 4.594 2.297 2.297 0 000-4.594zm-.006 5.21c.358 0 .715.034 1.065.1.58.11 1.13.62 1.276 1.2l.684 2.74c.095.38-.007.77-.275 1.056a1.28 1.28 0 01-.988.433h-3.524a1.28 1.28 0 01-.988-.433 1.27 1.27 0 01-.275-1.056l.684-2.74c.147-.58.697-1.09 1.276-1.2.35-.066.707-.1 1.065-.1z" /></svg>),
    },
    {
        id: 'spotify', label: 'Spotify Podcast',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>),
    },
    {
        id: 'patreon', label: 'Patreon',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.96 0-7.19-3.22-7.19-7.18 0-3.97 3.23-7.21 7.19-7.21M2 21.6h3.5V2.41H2V21.6z" /></svg>),
    },
    {
        id: 'twitter', label: 'X (Twitter)',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
    },
    {
        id: 'newsletter', label: 'Newsletter',
        icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>),
    },
];

export default function BetaSignupModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        fullName: '',
        channelName: '',
        email: '',
        channelLinks: [''],
        linkedinUrl: '',
        countryCode: '+1',
        phoneNumber: '',
    });
    const [creatorTypes, setCreatorTypes] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [countrySearchText, setCountrySearchText] = useState('');
    const countryDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCreatorType = (id) => setCreatorTypes(prev =>
        prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
    const togglePlatform = (id) => setPlatforms(prev =>
        prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (error && scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChannelLinkChange = (index, value) => {
        setFormData(prev => {
            const links = [...prev.channelLinks];
            links[index] = value;
            return { ...prev, channelLinks: links };
        });
    };

    const addChannelLink = () => {
        if (formData.channelLinks.length < 5) {
            setFormData(prev => ({ ...prev, channelLinks: [...prev.channelLinks, ''] }));
        }
    };

    const removeChannelLink = (index) => {
        if (formData.channelLinks.length > 1) {
            setFormData(prev => ({
                ...prev,
                channelLinks: prev.channelLinks.filter((_, i) => i !== index),
            }));
        }
    };

    // --- Validators ---
    const validateName = (name) => /^[A-Za-z\s\-'.]{2,60}$/.test(name.trim());
    const validateEmail = (email) =>
        /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim());
    const validatePhone = (number) => {
        const digits = number.replace(/\s/g, '');
        return /^\d{7,15}$/.test(digits);
    };
    const validateUrl = (url) =>
        /^https?:\/\/[^\s/$.?#].[^\s]*\.[a-zA-Z]{2,}/.test(url.trim());
    const validateLinkedIn = (url) =>
        /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[^\s/]+\/?$/.test(url.trim());

    const { isAuthenticated, setAuthModalOpen, user } = useAuth();

    // Pre-fill name & email from authenticated user when modal opens
    useEffect(() => {
        if (isOpen && user) {
            setFormData(prev => ({
                ...prev,
                fullName: prev.fullName || user.name || '',
                email: prev.email || user.email || '',
            }));
        }
    }, [isOpen, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!isAuthenticated) {
            setAuthModalOpen(true);
            return;
        }

        // Name
        if (!formData.fullName.trim()) {
            setError('Full name is required.');
            return;
        }
        if (!validateName(formData.fullName)) {
            setError('Name must be 2–60 characters and contain only letters, spaces, hyphens, or apostrophes.');
            return;
        }

        // Email
        if (!formData.email.trim()) {
            setError('Email address is required.');
            return;
        }
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address (e.g. you@example.com).');
            return;
        }

        // Phone (optional but must be valid if provided)
        if (formData.phoneNumber.trim()) {
            if (!validatePhone(formData.phoneNumber)) {
                setError('Phone number must contain 5–15 digits (no spaces, dashes, or letters).');
                return;
            }
        }

        // Channel links (optional but must be valid URLs if provided)
        const filledLinks = formData.channelLinks.filter(l => l.trim());
        for (const link of filledLinks) {
            if (!validateUrl(link)) {
                setError(`"${link}" is not a valid URL. Links must start with http:// or https://.`);
                return;
            }
        }

        // LinkedIn — required only for Thought Leaders / Podcasters
        const linkedInRequired = creatorTypes.includes('thought_leaders') || creatorTypes.includes('podcasters');
        if (linkedInRequired) {
            if (!formData.linkedinUrl.trim()) {
                setError('LinkedIn Profile URL is required for Thought Leaders and Podcasters.');
                return;
            }
            if (!validateLinkedIn(formData.linkedinUrl)) {
                setError('Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourname).');
                return;
            }
        } else if (formData.linkedinUrl.trim() && !validateLinkedIn(formData.linkedinUrl)) {
            setError('Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourname).');
            return;
        }

        // Creator type (mandatory)
        if (creatorTypes.length === 0) {
            setError('Please select at least one option for "Which best describes you?"');
            return;
        }

        // Platforms (mandatory)
        if (platforms.length === 0) {
            setError('Please select at least one primary platform.');
            return;
        }

        setLoading(true);
        try {
            // Flatten links and multi-selects
            const filteredLinks = formData.channelLinks.filter(l => l.trim());
            const creatorTypeStr = creatorTypes.join(', ');
            const primaryPlatformStr = platforms.join(', ');

            // ── PRIMARY: Call the backend API (triggers SendGrid emails) ──
            const apiPayload = {
                name: formData.fullName,
                channelName: formData.channelName || null,
                email: formData.email,
                channelLinks: filteredLinks.length > 0 ? filteredLinks : null,
                contactNumber: formData.phoneNumber
                    ? `${formData.countryCode} ${formData.phoneNumber}`
                    : null,
                creatorType: creatorTypeStr,
                primaryPlatform: primaryPlatformStr,
                linkedinUrl: formData.linkedinUrl || null,
            };

            const apiResponse = await fetch(`${BACKEND_URL}/api/beta/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiPayload),
                credentials: 'include',
            });

            const apiResult = await apiResponse.json().catch(() => ({}));

            if (!apiResponse.ok) {
                // Surface server-side errors (duplicate email, validation, etc.)
                throw new Error(apiResult.message || `Server error: ${apiResponse.status}`);
            }

            // ── SECONDARY: Also log to Google Sheets (fire-and-forget) ──
            const GAS_URL = import.meta.env.VITE_BETA_SIGNUP_GAS_URL
                || 'https://script.google.com/a/macros/incubrix.com/s/AKfycboxdgieGkGcxNpfmUoOw3MMCcj4yXCtCD31OEIB51rVYz2STAHXqZnPT7jCCChZy-leHTg/exec';

            if (GAS_URL) {
                const gasPayload = {
                    fullName: formData.fullName,
                    channelName: formData.channelName || 'N/A',
                    email: formData.email,
                    channelLinks: filteredLinks.join(', ') || 'N/A',
                    linkedinUrl: formData.linkedinUrl || 'N/A',
                    creatorType: creatorTypeStr,
                    primaryPlatform: primaryPlatformStr,
                    countryCode: formData.countryCode,
                    phoneNumber: formData.phoneNumber || 'N/A',
                };
                fetch(GAS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(gasPayload),
                }).catch(() => { }); // silently ignore GAS errors
            }

            // Success
            setSuccess(true);
            setFormData({ fullName: '', channelName: '', email: '', channelLinks: [''], linkedinUrl: '', countryCode: '+1', phoneNumber: '' });
            setCreatorTypes([]);
            setPlatforms([]);
            if (onSuccess) onSuccess();

        } catch (err) {
            console.error('Beta signup error:', err);
            setError(err.message || 'Submission failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }

    };

    const handleClose = () => {
        setSuccess(false);
        setError(null);
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[520px] bg-[#0a0e27] border border-cyan-500/20 text-white shadow-2xl shadow-cyan-500/10 p-0 overflow-hidden max-h-[90vh] flex flex-col">
                {success ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] shrink-0">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <DialogHeader className="w-full flex flex-col items-center">
                            <DialogTitle className="text-2xl font-bold text-white mb-2 text-center">
                                Application Received
                            </DialogTitle>
                            <DialogDescription className="text-base text-cyan-100/80 max-w-[320px] mx-auto leading-relaxed text-center mb-8">
                                Your details have been received! You'll receive your Creator Studio access link via email shortly.
                            </DialogDescription>
                        </DialogHeader>
                        <Button
                            onClick={handleClose}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-6 rounded-xl text-lg font-medium shadow-xl shadow-cyan-500/20 w-full sm:w-auto"
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 px-8 pt-8 pb-6 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0e27]" />
                            <div className="relative z-10">
                                <DialogHeader>
                                    <div className="mb-2">
                                        <DialogTitle className="text-2xl font-bold text-white leading-snug">
                                            Get Started with IncuBrix
                                        </DialogTitle>
                                    </div>
                                    <DialogDescription className="text-gray-300 text-base">
                                        Fill in your details and start using IncuBrix Creator Studio.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                        </div>

                        <div ref={scrollRef} className="px-8 pb-8 flex-1 overflow-y-auto custom-scrollbar relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                            {error && (
                                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Name & Channel Name - side by side */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-gray-300 text-sm font-medium">
                                        Full Name <span className="text-cyan-400">*</span>
                                    </Label>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-300 text-sm font-medium">
                                        Channel Name <span className="text-gray-500 font-normal text-xs">(optional)</span>
                                    </Label>
                                    <Input
                                        name="channelName"
                                        value={formData.channelName}
                                        onChange={handleChange}
                                        placeholder="My Channel"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Email Address <span className="text-cyan-400">*</span><span className="text-gray-500 font-normal text-xs ml-1">(work email preferred)</span>
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            {/* Channel Links - dynamic */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Channel Links <span className="text-gray-500 font-normal text-xs">(optional)</span>
                                </Label>
                                <div className="space-y-2">
                                    {formData.channelLinks.map((link, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                value={link}
                                                onChange={(e) => handleChannelLinkChange(i, e.target.value)}
                                                placeholder={`https://youtube.com/@channel${i > 0 ? `-${i + 1}` : ''}`}
                                                className={inputClass + ' flex-1'}
                                            />
                                            {formData.channelLinks.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeChannelLink(i)}
                                                    className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {formData.channelLinks.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={addChannelLink}
                                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm mt-1 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Add another channel
                                    </button>
                                )}
                            </div>



                            {/* Which best describes you? */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Which best describes you? <span className="text-cyan-400">*</span>
                                    <span className="text-gray-500 font-normal text-xs ml-1">(select all that apply)</span>
                                </Label>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {CREATOR_TYPES.map(ct => {
                                        const selected = creatorTypes.includes(ct.id);
                                        return (
                                            <button
                                                key={ct.id}
                                                type="button"
                                                onClick={() => toggleCreatorType(ct.id)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${selected
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                                    : 'bg-[#151d45]/60 border-white/10 text-gray-400 hover:border-cyan-500/40 hover:text-gray-200'
                                                    }`}
                                            >
                                                {selected && <span className="mr-1.5">✓</span>}{ct.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Primary Platform */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Primary Platform <span className="text-cyan-400">*</span>
                                    <span className="text-gray-500 font-normal text-xs ml-1">(select all that apply)</span>
                                </Label>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {PLATFORMS.map(pl => {
                                        const selected = platforms.includes(pl.id);
                                        return (
                                            <button
                                                key={pl.id}
                                                type="button"
                                                onClick={() => togglePlatform(pl.id)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer ${selected
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                                    : 'bg-[#151d45]/60 border-white/10 text-gray-400 hover:border-cyan-500/40 hover:text-gray-200'
                                                    }`}
                                            >
                                                <span className={selected ? 'text-cyan-400' : 'text-gray-500'}>{pl.icon}</span>
                                                {pl.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* LinkedIn Profile URL */}
                            {(() => {
                                const isRequired = creatorTypes.includes('thought_leaders') || creatorTypes.includes('podcasters');
                                return (
                                    <div className="space-y-2">
                                        <Label className="text-gray-300 text-sm font-medium">
                                            LinkedIn Profile URL{' '}
                                            {isRequired
                                                ? <span className="text-cyan-400">*</span>
                                                : <span className="text-gray-500 font-normal text-xs">(optional)</span>}
                                        </Label>
                                        <Input
                                            name="linkedinUrl"
                                            type="url"
                                            value={formData.linkedinUrl}
                                            onChange={handleChange}
                                            placeholder="https://linkedin.com/in/yourname"
                                            className={inputClass}
                                        />
                                    </div>
                                );
                            })()}

                            {/* Country Code + Contact Number */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium">
                                    Contact Number <span className="text-gray-500 font-normal text-xs">(optional)</span>
                                </Label>
                                <div className="flex gap-2 relative">
                                    {/* Custom Combobox */}
                                    <div className="relative" ref={countryDropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                                                setCountrySearchText('');
                                            }}
                                            className="bg-[#151d45]/60 border border-cyan-500/20 text-white h-11 rounded-xl px-2 text-sm focus:border-cyan-500 focus:ring-cyan-500/20 outline-none w-[100px] shrink-0 flex items-center justify-between cursor-pointer"
                                        >
                                            <span className="truncate pr-1">
                                                {ALL_COUNTRY_CODES.find(c => c.code === formData.countryCode)?.code || formData.countryCode}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-cyan-400 opacity-70" />
                                        </button>

                                        {isCountryDropdownOpen && (
                                            <div className="absolute top-[100%] left-0 z-[100] mt-1 w-[260px] bg-[#0a0e27] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden py-1">
                                                <div className="px-2 pt-2 pb-1 sticky top-0 bg-[#0a0e27]">
                                                    <div className="relative">
                                                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
                                                        <Input 
                                                            placeholder="Search country or code..."
                                                            value={countrySearchText}
                                                            onChange={(e) => setCountrySearchText(e.target.value)}
                                                            className="h-8 pl-8 bg-[#151d45]/40 border-cyan-500/20 text-xs text-white"
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-[200px] overflow-y-auto px-1 mt-1">
                                                    {ALL_COUNTRY_CODES.filter(c => 
                                                        c.label.toLowerCase().includes(countrySearchText.toLowerCase()) || 
                                                        c.code.includes(countrySearchText)
                                                    ).map(c => (
                                                        <button
                                                            key={c.code + c.country}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, countryCode: c.code }));
                                                                setIsCountryDropdownOpen(false);
                                                                setCountrySearchText('');
                                                            }}
                                                            className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-center gap-2 ${formData.countryCode === c.code ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-300 hover:bg-[#151d45]/60 hover:text-white'}`}
                                                        >
                                                            <span className="shrink-0 font-medium w-9">{c.code}</span>
                                                            <span className="truncate opacity-80">{c.label.split(' ')[0]} {c.label.split(' ').slice(1, -1).join(' ')}</span>
                                                        </button>
                                                    ))}
                                                    {ALL_COUNTRY_CODES.filter(c => c.label.toLowerCase().includes(countrySearchText.toLowerCase()) || c.code.includes(countrySearchText)).length === 0 && (
                                                        <div className="px-3 py-4 text-center text-xs text-gray-500">No results found.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Input
                                        name="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        className={inputClass + ' flex-1'}
                                    />
                                </div>
                            </div>

                            {/* Submit Button with hover glow */}
                            <motion.div className="relative pt-1" whileHover="hover" initial="rest">
                                {/* Glow layer behind button - appears on hover */}
                                <motion.div
                                    className="absolute inset-0 mt-1 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 blur-md"
                                    variants={{
                                        rest: { opacity: 0, scale: 0.95 },
                                        hover: { opacity: 0.5, scale: 1.02 },
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white py-6 text-base font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 border border-cyan-300/20"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </motion.div>


                        </form>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
