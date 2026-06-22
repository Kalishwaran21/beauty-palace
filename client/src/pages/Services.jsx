import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['All', 'Hair', 'Skin', 'Bridal', 'Nails', 'Spa'];

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        api.get('/services')
            .then(r => setServices(r.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = activeCategory === 'All'
        ? services
        : services.filter(s => s.category === activeCategory);

    return (
        <div>
            <div className="page-header">
                <span className="section-label">Explore</span>
                <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>Our Services</h1>
                <div className="gold-divider"></div>
                <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto' }}>
                    Discover premium beauty services crafted for every style and occasion.
                </p>
            </div>

            <section className="section">
                <div className="container">
                    {/* Category Filter */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
                        {CATEGORIES.map(c => (
                            <button
                                key={c}
                                onClick={() => setActiveCategory(c)}
                                className={`btn btn-sm ${activeCategory === c ? 'btn-gold' : 'btn-ghost'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading-spinner"><div className="spinner"></div></div>
                    ) : filtered.length === 0 ? (
                        <div className="empty-state">
                            <h3>No services found.</h3>
                            <p>Log in as admin and click "Seed Services" to add default services.</p>
                        </div>
                    ) : (
                        <div className="grid-3">
                            {filtered.map(service => (
                                <div key={service._id} className="card service-item-card">
                                    {service.imageUrl && (
                                        <div className="service-card-img">
                                            <img src={service.imageUrl} alt={service.name} loading="lazy" />
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <span className="badge" style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                                            {service.category}
                                        </span>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{service.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '1rem' }}>
                                            {service.description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>
                                                ⏱ {service.duration} mins
                                            </span>
                                            <span style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                                                ₹{service.price}
                                            </span>
                                        </div>
                                        <Link to="/book" state={{ serviceId: service._id }} className="btn btn-outline btn-sm btn-block">
                                            Book This Service
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                .service-item-card .service-card-img { height: 200px; overflow: hidden; }
                .service-item-card .service-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
                .service-item-card:hover .service-card-img img { transform: scale(1.05); }
            `}</style>
        </div>
    );
}
