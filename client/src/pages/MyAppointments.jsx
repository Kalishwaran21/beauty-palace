import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = () => {
        api.get('/appointments/my')
            .then(r => setAppointments(r.data))
            .catch(() => toast.error('Failed to load appointments'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchAppointments(); }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this appointment?')) return;
        try {
            await api.put(`/appointments/${id}/cancel`);
            toast.success('Appointment cancelled');
            fetchAppointments();
        } catch {
            toast.error('Failed to cancel');
        }
    };

    return (
        <div style={{ paddingTop: '6rem' }}>
            <div className="page-header">
                <span className="section-label">My Account</span>
                <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>My Appointments</h1>
                <div className="gold-divider"></div>
            </div>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {loading ? (
                        <div className="loading-spinner"><div className="spinner"></div></div>
                    ) : appointments.length === 0 ? (
                        <div className="empty-state">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                            <h3>No appointments yet</h3>
                            <p>Book your first appointment with us!</p>
                            <a href="/book" className="btn btn-gold" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Book Now</a>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {appointments.map(apt => (
                                <div key={apt._id} className="card">
                                    <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontSize: '1.1rem' }}>{apt.service?.name}</h3>
                                                <span className={`badge badge-${apt.status}`}>{apt.status}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                                <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>
                                                    📅 {new Date(apt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                                <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>
                                                    ⏰ {apt.timeSlot}
                                                </span>
                                                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                                                    ₹{apt.service?.price}
                                                </span>
                                            </div>
                                        </div>
                                        {apt.status === 'pending' && (
                                            <button onClick={() => handleCancel(apt._id)} className="btn btn-ghost btn-sm">
                                                ✕ Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
