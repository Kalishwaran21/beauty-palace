import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

export default function BookAppointment() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ service: '', date: '', timeSlot: '', notes: '' });
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/services').then(r => {
            setServices(r.data);
            if (location.state?.serviceId) {
                setForm(f => ({ ...f, service: location.state.serviceId }));
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/appointments', form);
            toast.success('Appointment booked successfully! ✨');
            navigate('/my-appointments');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const selectedService = services.find(s => s._id === form.service);

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
                                <label className="form-label">Select Service</label>
                                <select
                                    className="form-select"
                                    value={form.service}
                                    onChange={e => setForm({ ...form, service: e.target.value })}
                                    required
                                >
                                    <option value="">Choose a service...</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.name} — ₹{s.price}
                                        </option>
                                    ))}
                                </select>
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
                                disabled={loading || !form.timeSlot}
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
                                    {selectedService ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text)' }}>Service</span>
                                                <span style={{ color: 'var(--white)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>
                                                    {selectedService.name}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'var(--text)' }}>Duration</span>
                                                <span style={{ color: 'var(--white)' }}>{selectedService.duration} mins</span>
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
                                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                                <strong style={{ color: 'var(--white)' }}>Total</strong>
                                                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.3rem' }}>
                                                    ₹{selectedService.price}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ color: 'var(--text)', fontSize: '0.9rem' }}>Select a service to see pricing.</p>
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
