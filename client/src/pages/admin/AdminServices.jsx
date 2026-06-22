import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import AdminNav from './AdminNav';

const EMPTY_FORM = { name: '', category: 'Hair', description: '', price: '', duration: '', imageUrl: '' };
const CATEGORIES = ['Hair', 'Skin', 'Bridal', 'Nails', 'Spa'];

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const fetchServices = () => {
        api.get('/services')
            .then(r => setServices(r.data))
            .catch(() => toast.error('Failed to load'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { fetchServices(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await api.put(`/admin/services/${editing}`, form);
                toast.success('Service updated!');
            } else {
                await api.post('/admin/services', form);
                toast.success('Service created!');
            }
            setShowForm(false); setEditing(null); setForm(EMPTY_FORM);
            fetchServices();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error saving service');
        }
    };

    const handleEdit = (s) => {
        setForm({ name: s.name, category: s.category, description: s.description, price: s.price, duration: s.duration, imageUrl: s.imageUrl });
        setEditing(s._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Deactivate this service?')) return;
        try {
            await api.delete(`/admin/services/${id}`);
            toast.success('Service deactivated');
            fetchServices();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>
            <AdminNav />
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Services Management</h1>
                        <p style={{ color: 'var(--text)' }}>Add, edit, or deactivate services</p>
                    </div>
                    <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(EMPTY_FORM); }} className="btn btn-gold btn-sm">
                        {showForm ? '✕ Cancel' : '+ Add Service'}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <div className="card-body">
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{editing ? 'Edit Service' : 'New Service'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Service Name</label>
                                        <input className="form-input" placeholder="e.g. Deep Conditioning" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Price (₹)</label>
                                        <input type="number" className="form-input" placeholder="e.g. 1500" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Duration (minutes)</label>
                                        <input type="number" className="form-input" placeholder="e.g. 60" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} required />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Image URL</label>
                                        <input className="form-input" placeholder="https://..." value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="form-label">Description</label>
                                        <textarea className="form-input" rows={3} placeholder="Service description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ resize: 'vertical' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="submit" className="btn btn-gold">✓ {editing ? 'Update' : 'Create'} Service</button>
                                    <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn btn-ghost">✕ Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="loading-spinner"><div className="spinner"></div></div>
                ) : (
                    <div className="grid-3">
                        {services.map(s => (
                            <div key={s._id} className="card">
                                {s.imageUrl && (
                                    <div style={{ height: 160, overflow: 'hidden' }}>
                                        <img src={s.imageUrl} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div className="card-body">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                        <span className="badge" style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--gold)' }}>{s.category}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleEdit(s)} className="btn btn-ghost btn-sm" style={{ padding: '0.3rem 0.6rem' }}>✎</button>
                                            <button onClick={() => handleDelete(s._id)} className="btn btn-ghost btn-sm" style={{ padding: '0.3rem 0.6rem', color: 'var(--danger)' }}>🗑</button>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>{s.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.75rem' }}>{s.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{s.duration} mins</span>
                                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>₹{s.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
