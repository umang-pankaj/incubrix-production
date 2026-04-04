import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function ScheduleDemoModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="sm:max-w-[700px] w-full bg-[#0a0e27] border-cyan-500/20 text-white p-2 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <DialogHeader className="px-6 pt-5 pb-2">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Schedule a Demo
                    </DialogTitle>
                </DialogHeader>

                {/* Exact Calendly inline widget provided by user */}
                <div 
                    className="calendly-inline-widget" 
                    data-url="https://calendly.com/contact-incubrix/30min?hide_gdpr_banner=1&background_color=0a0e27&text_color=e2e8f0&primary_color=1e6bff" 
                    data-resize="true"
                    style={{ minWidth: '320px', height: '800px', borderRadius: '12px', overflow: 'hidden', colorScheme: 'dark' }}
                ></div>
            </DialogContent>
        </Dialog>
    );
}
