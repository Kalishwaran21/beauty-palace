import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

export default function BookAppointment() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ guestName: '', guestPhone: '', services: [], date: '', timeSlot: '', notes: '' });
    const [loading, setLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const location = useLocation();

    useEffect(() => {
        api.get('/services').then(r => {
            setServices(r.data);
            if (location.state?.serviceId) {
                setForm(f => ({ ...f, services: [location.state.serviceId] }));
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/appointments', form);
            setBookingSuccess(true);
            setForm({ guestName: '', guestPhone: '', services: [], date: '', timeSlot: '', notes: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (bookingSuccess) {
        return (
            <div style={{ paddingTop: '10rem', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Booking Submitted!</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        Your booking has been received. We will contact you by WhatsApp shortly to confirm your appointment. Thank you!
                    </p>
                    <button className="btn btn-gold" onClick={() => setBookingSuccess(false)}>Book Another Service</button>
                </div>
            </div>
        );
    }

    const selectedServices = services.filter(s => form.services.includes(s._id));
    const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0);
    const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);

    return (
        <div style={{ paddingTop: '6rem' }}>
            <div className="page-header">
                <span className="section-label">Book Now</span>
                <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Book an Appointment</h1>
                <div className="gold-divider"></div>
            </div>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={form.guestName}
                                    onChange={e => setForm({ ...form, guestName: e.target.value })}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number (WhatsApp)</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={form.guestPhone}
                                    onChange={e => setForm({ ...form, guestPhone: e.target.value })}
                                    required
                                    placeholder="e.g. +91 98765 43210"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Select Services</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
                                    {Object.entries(
                                        services.reduce((acc, s) => {
                                            acc[s.category || 'Other'] = acc[s.category || 'Other'] || [];
                                            acc[s.category || 'Other'].push(s);
                                            return acc;
                                        }, {})
                                    ).map(([category, categoryServices]) => (
                                        <div key={category}>
                                            <h4 style={{ color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {category}
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                                                {categoryServices.map(s => {
                                                    const isSelected = form.services.includes(s._id);
                                                    return (
                                                        <div
                                                            key={s._id}
                                                            onClick={() => {
                                                                const newServices = isSelected
                                                                    ? form.services.filter(id => id !== s._id)
                                                                    : [...form.services, s._id];
                                                                setForm({ ...form, services: newServices });
                                                            }}
                                                            style={{
                                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                                padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer',
                                                                background: isSelected ? 'var(--gold)' : 'var(--bg-3)',
                                                                border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--border)'}`,
                                                                transition: 'all 0.2s ease',
                                                                userSelect: 'none'
                                                            }}
                                                        >
                                                            <div>
                                                                <div style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? '#111' : 'var(--white)' }}>
                                                                    {s.name}
                                                                </div>
                                                                <div style={{ fontSize: '0.8rem', color: isSelected ? 'rgba(0,0,0,0.8)' : 'var(--text)' }}>
                                                                    {s.duration} mins
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                                <div style={{ fontWeight: 700, color: isSelected ? '#111' : 'var(--gold)' }}>
                                                                    ₹{s.price}
                                                                </div>
                                                                {isSelected ? (
                                                                    <span style={{ background: '#111', color: 'var(--gold)', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                                                                ) : (
                                                                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--text-light)' }}></span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Preferred Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Select Time Slot</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.5rem' }}>
                                    {TIME_SLOTS.map(slot => (
                                        <button
                                            key={slot}
                                            type="button"
                                            className={`btn btn-sm ${form.timeSlot === slot ? 'btn-gold' : 'btn-ghost'}`}
                                            onClick={() => setForm({ ...form, timeSlot: slot })}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Notes (Optional)</label>
                                <textarea
                                    className="form-input"
                                    rows={4}
                                    placeholder="Any special requests..."
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gold btn-block"
                                disabled={loading || !form.timeSlot || form.services.length === 0}
                            >
                                {loading ? 'Booking...' : 'Confirm Appointment →'}
                            </button>
                        </form>

                        {/* Summary */}
                        <div style={{ position: 'sticky', top: '7rem' }}>
                            <div className="card">
                                <div className="card-body">
                                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                        Booking Summary
                                    </h3>
                                    {selectedServices.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <span style={{ color: 'var(--text)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Selected Services</span>
                                                {selectedServices.map(s => (
                                                    <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--white)' }}>
                                                        <span style={{ maxWidth: '70%' }}>{s.name}</span>
                                                        <span>₹{s.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                                <span style={{ color: 'var(--text)' }}>Total Duration</span>
                                                <span style={{ color: 'var(--white)' }}>{totalDuration} mins</span>
                                            </div>
                                            {form.date && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--text)' }}>Date</span>
                                                    <span style={{ color: 'var(--white)' }}>
                                                        {new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            )}
                                            {form.timeSlot && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--text)' }}>Time</span>
                                                    <span style={{ color: 'var(--white)' }}>{form.timeSlot}</span>
                                                </div>
                                            )}
                                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <strong style={{ color: 'var(--white)' }}>Grand Total</strong>
                                                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.5rem' }}>
                                                    ₹{totalPrice}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ color: 'var(--text)', fontSize: '0.9rem' }}>Select one or more services to see your total.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    .container > div[style] { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
