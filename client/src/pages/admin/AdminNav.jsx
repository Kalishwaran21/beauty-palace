import { Link, useLocation } from 'react-router-dom';

export default function AdminNav() {
    const { pathname } = useLocation();
    return (
        <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
            <div className="container" style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/admin" className={`btn btn-sm ${pathname === '/admin' ? 'btn-gold' : 'btn-ghost'}`}>
                    ⚡ Dashboard
                </Link>
                <Link to="/admin/appointments" className={`btn btn-sm ${pathname === '/admin/appointments' ? 'btn-gold' : 'btn-ghost'}`}>
                    📅 Appointments
                </Link>
                <Link to="/admin/services" className={`btn btn-sm ${pathname === '/admin/services' ? 'btn-gold' : 'btn-ghost'}`}>
                    ✂ Services
                </Link>
            </div>
        </div>
    );
}
