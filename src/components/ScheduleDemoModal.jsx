import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/umang-incubrix/30min';

export default function ScheduleDemoModal({ isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="sm:max-w-[700px] w-full bg-[#0a0e27] border-cyan-500/20 text-white p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-5 pb-2">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Schedule a Demo
                    </DialogTitle>
                </DialogHeader>

                {/* Calendly iframe embed */}
                <iframe
                    src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0e27&text_color=ffffff&primary_color=06b6d4`}
                    width="100%"
                    height="630"
                    frameBorder="0"
                    title="Schedule a Demo"
                    style={{ display: 'block' }}
                />
            </DialogContent>
        </Dialog>
    );
}
