import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import AdminNav from './AdminNav';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchAppointments = () => {
        api.get('/admin/appointments')
            .then(r => setAppointments(r.data))
            .catch(() => toast.error('Failed to load appointments'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { fetchAppointments(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/admin/appointments/${id}`, { status });
            toast.success('Status updated');
            fetchAppointments();
        } catch {
            toast.error('Update failed');
        }
    };

    const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
            <AdminNav />
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>All Appointments</h1>
                <p style={{ color: 'var(--text)', marginBottom: '2rem' }}>Manage and update appointment statuses</p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {['all', ...STATUSES].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`btn btn-sm ${filter === s ? 'btn-gold' : 'btn-ghost'}`}
                            style={{ textTransform: 'capitalize' }}>
                            {s}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading-spinner"><div className="spinner"></div></div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <div className="card">
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-3)' }}>
                                        {['Client', 'Service', 'Date', 'Time', 'Amount', 'Status', 'Update'].map(h => (
                                            <th key={h} style={{ padding: '1rem', textAlign: 'left', color: 'var(--text)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(apt => (
                                        <tr key={apt._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '0.9rem 1rem', color: 'var(--text-light)' }}>{apt.user?.name}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: 'var(--text-light)' }}>{apt.service?.name}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: 'var(--text)', whiteSpace: 'nowrap' }}>{new Date(apt.date).toLocaleDateString('en-IN')}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: 'var(--text)' }}>{apt.timeSlot}</td>
                                            <td style={{ padding: '0.9rem 1rem', color: 'var(--gold)', fontWeight: 600 }}>₹{apt.service?.price}</td>
                                            <td style={{ padding: '0.9rem 1rem' }}><span className={`badge badge-${apt.status}`}>{apt.status}</span></td>
                                            <td style={{ padding: '0.9rem 1rem' }}>
                                                <select defaultValue={apt.status} onChange={e => updateStatus(apt._id, e.target.value)}
                                                    style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text-light)', padding: '0.3rem 0.6rem', borderRadius: 4, fontSize: '0.8rem', cursor: 'pointer' }}>
                                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && <div className="empty-state" style={{ padding: '3rem' }}><p>No appointments found.</p></div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
