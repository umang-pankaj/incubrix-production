import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export default function ScheduleDemoModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: ''
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen && step === 1 && selectedDate) {
            fetchSlots(selectedDate);
        }
    }, [isOpen, step, selectedDate]);

    const fetchSlots = async (date) => {
        setLoading(true);
        setError(null);
        try {
            const dateStr = format(date, 'yyyy-MM-dd');
            const response = await fetch(`${BACKEND_URL}/api/booking/slots?date=${dateStr}`);
            const data = await response.json();
            if (data.success) {
                setSlots(data.slots || []);
            } else {
                setError(data.message || 'Failed to fetch slots. Please ensure your Google Calendar is shared with the service account email.');
            }
        } catch (err) {
            setError('Could not connect to the booking server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const { isAuthenticated, setAuthModalOpen } = useAuth();

    const handleBooking = async () => {
        if (!isAuthenticated) {
            setAuthModalOpen(true);
            return;
        }

        if (!selectedSlot || !formData.name || !formData.email || !formData.purpose) return;

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/api/booking/schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    startTime: selectedSlot.start,
                    endTime: selectedSlot.end
                })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess(true);
                setStep(3);
            } else {
                setError(data.message || 'Booking failed');
            }
        } catch (err) {
            setError('An error occurred while booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setStep(1);
        setSelectedDate(new Date());
        setSelectedSlot(null);
        setFormData({ name: '', email: '', purpose: '' });
        setSuccess(false);
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); setTimeout(reset, 500); } }}>
            <DialogContent className="sm:max-w-[500px] bg-[#0a0e27] border-cyan-500/20 text-white overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {success ? 'Demo Scheduled!' : 'Schedule a Demo'}
                    </DialogTitle>
                    {!success && (
                        <DialogDescription className="text-gray-400">
                            {step === 1 ? 'Choose an available date and time.' : 'Provide your details to confirm the booking.'}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-6 py-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < startOfToday() || date > addDays(new Date(), 30)}
                                    className="rounded-md border border-cyan-500/10 bg-[#0a0e27]/40"
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <Label className="text-sm font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    Available Slots
                                </Label>
                                <div className="h-[200px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span className="text-xs">Checking availability...</span>
                                        </div>
                                    ) : slots.length > 0 ? (
                                        slots.map((slot, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`w-full py-2 px-3 rounded-lg text-sm transition-all border ${selectedSlot === slot
                                                    ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                                                    : 'bg-[#0a0e27]/40 border-cyan-500/10 text-gray-300 hover:border-cyan-500/40'
                                                    }`}
                                            >
                                                {format(new Date(slot.start), 'p')}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500 text-sm mt-8">
                                            No slots available for this date.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        <Button
                            disabled={!selectedSlot || loading}
                            onClick={() => setStep(2)}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        >
                            Continue
                        </Button>
                    </div>
                )}

                {step === 2 && !success && (
                    <div className="space-y-4 py-4">
                        <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg space-y-1">
                            <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Selected Slot</div>
                            <div className="text-sm flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {format(selectedDate, 'PPP')}
                            </div>
                            <div className="text-sm flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {format(new Date(selectedSlot.start), 'p')} - {format(new Date(selectedSlot.end), 'p')}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-[#0a0e27]/40 border-cyan-500/20"
                                    placeholder="Umang Pankaj"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-[#0a0e27]/40 border-cyan-500/20"
                                    placeholder="umang@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose of Meeting</Label>
                                <Textarea
                                    id="purpose"
                                    value={formData.purpose}
                                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                    className="bg-[#0a0e27]/40 border-cyan-500/20 min-h-[80px]"
                                    placeholder="Tell us what you'd like to discuss..."
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                            <Button
                                disabled={loading || !formData.name || !formData.email || !formData.purpose}
                                onClick={handleBooking}
                                className="flex-[2] bg-gradient-to-r from-cyan-500 to-blue-500"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && success && (
                    <div className="py-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">You're all set!</h3>
                            <p className="text-gray-400">
                                A calendar invitation with a Google Meet link has been sent to <strong>{formData.email}</strong>.
                            </p>
                        </div>
                        <Button onClick={onClose} className="w-full bg-cyan-500 hover:bg-cyan-600">
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
