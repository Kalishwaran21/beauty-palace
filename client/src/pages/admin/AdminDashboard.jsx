import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import AdminNav from './AdminNav';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/dashboard')
            .then(r => setStats(r.data))
            .catch(() => toast.error('Failed to load dashboard'))
            .finally(() => setLoading(false));
    }, []);

    const seedServices = async () => {
        try {
            const { data } = await api.post('/admin/seed');
            toast.success(data.message);
        } catch {
            toast.error('Seed failed');
        }
    };

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
            <AdminNav />
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
                        <p style={{ color: 'var(--text)' }}>Manage your salon operations</p>
                    </div>
                    <button onClick={seedServices} className="btn btn-outline btn-sm">🌱 Seed Services</button>
                </div>

                {loading ? (
                    <div className="loading-spinner"><div className="spinner"></div></div>
                ) : stats ? (
                    <>
                        <div className="grid-4" style={{ marginBottom: '3rem' }}>
                            <div className="card"><div className="card-body admin-stat"><span style={{ fontSize: '2rem' }}>👥</span><div><div className="admin-stat-num">{stats.totalUsers}</div><div className="admin-stat-label">Total Clients</div></div></div></div>
                            <div className="card"><div className="card-body admin-stat"><span style={{ fontSize: '2rem' }}>📅</span><div><div className="admin-stat-num">{stats.totalAppointments}</div><div className="admin-stat-label">Total Bookings</div></div></div></div>
                            <div className="card"><div className="card-body admin-stat"><span style={{ fontSize: '2rem' }}>⏳</span><div><div className="admin-stat-num">{stats.pendingAppointments}</div><div className="admin-stat-label">Pending</div></div></div></div>
                            <div className="card"><div className="card-body admin-stat"><span style={{ fontSize: '2rem' }}>✂</span><div><div className="admin-stat-num">{stats.totalServices}</div><div className="admin-stat-label">Services</div></div></div></div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem' }}>Recent Appointments</h2>
                                    <Link to="/admin/appointments" className="btn btn-ghost btn-sm">View All</Link>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                                {['Client', 'Service', 'Status', 'Amount'].map(h => (
                                                    <th key={h} style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.recentAppointments.map(apt => (
                                                <tr key={apt._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                    <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{apt.user?.name}</td>
                                                    <td style={{ padding: '0.75rem', color: 'var(--text-light)' }}>{apt.service?.name}</td>
                                                    <td style={{ padding: '0.75rem' }}><span className={`badge badge-${apt.status}`}>{apt.status}</span></td>
                                                    <td style={{ padding: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>₹{apt.service?.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
            <style>{`.admin-stat{display:flex;align-items:center;gap:1.25rem}.admin-stat-num{font-family:var(--font-heading);font-size:2rem;color:var(--white);line-height:1}.admin-stat-label{font-size:0.75rem;color:var(--text);text-transform:uppercase;letter-spacing:0.5px;margin-top:0.2rem}`}</style>
        </div>
    );
}
