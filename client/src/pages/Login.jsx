import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', form);
            login(data);
            toast.success(`Welcome back, ${data.name}!`);
            navigate(data.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', paddingTop: '6rem', background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '3rem', width: '100%', maxWidth: 440 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--white)', fontWeight: 600, textAlign: 'center', marginBottom: '1.5rem' }}>
                    ✨ Beauty<span style={{ color: 'var(--gold)' }}>Palace</span>
                </div>
                <h2 style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: 'var(--text)', marginBottom: '2rem', fontSize: '0.9rem' }}>Login to book your appointments</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-gold btn-block" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login →'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 600 }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
}
