import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navbar-inner">
                <Link to="/" className="nav-logo">
                    ✨ Beauty<span>Palace</span>
                </Link>

                {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/services" className={isActive('/services')} onClick={() => setMenuOpen(false)}>Services</Link></li>
                    <li><Link to="/gallery" className={isActive('/gallery')} onClick={() => setMenuOpen(false)}>Gallery</Link></li>
                    <li><Link to="/book" className={isActive('/book')}>Book Now</Link></li>
                    {isAdmin && <li><Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''}>Admin</Link></li>}
                </ul>

                <div className="nav-right">
                    {isAdmin && (
                        <div className="auth-btns">
                            <Link to="/admin" className="btn btn-ghost btn-sm">Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-gold btn-sm">Logout</button>
                        </div>
                    )}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>
        </header>
    );
}
