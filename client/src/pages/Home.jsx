import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-page">

            {/* ===== HERO ===== */}
            <section className="hero-section">
                <div className="hero-slider">
                    <div className="hero-slide slide-1"></div>
                    <div className="hero-slide slide-2"></div>
                    <div className="hero-slide slide-3"></div>
                    <div className="hero-slide slide-4"></div>
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge">✨ Premium Unisex Salon</div>
                    <h1>Where Style Meets <em>Confidence</em></h1>
                    <p>Experience luxury beauty services crafted by our expert team. From haircuts to bridal makeovers — we bring out your best self.</p>
                    <div className="hero-cta">
                        <Link to="/book" className="btn btn-gold">Book Appointment →</Link>
                        <Link to="/services" className="btn btn-outline">Our Services</Link>
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">30+</div>
                        <div className="stat-label">Services</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">4.9★</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT ===== */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-img-col">
                        <img
                            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
                            alt="Salon interior"
                            className="about-main-img"
                        />
                        <div className="exp-tag">
                            <span>10+</span>
                            <small>Years Exp.</small>
                        </div>
                    </div>
                    <div className="about-text-col">
                        <span className="section-label">About Us</span>
                        <h2 className="section-title">Premium Beauty Experience in Dindigul</h2>
                        <div className="gold-divider left"></div>
                        <p>Beauty Palace Premium Unisex Salon is your one-stop beauty destination curated by experts to offer the best in hair, skin, and beauty services.</p>
                        <p style={{ marginTop: '1rem' }}>Our mission is to deliver premium and luxury quality services with our professionally &amp; technically qualified team.</p>
                        <ul className="about-check-list">
                            <li>✦ Premium hair styling &amp; coloring</li>
                            <li>✦ Advanced skin &amp; facial treatments</li>
                            <li>✦ Expert bridal makeup artists</li>
                            <li>✦ Relaxing spa &amp; wellness services</li>
                        </ul>
                        <Link to="/services" className="btn btn-gold" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                            Explore Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES PREVIEW ===== */}
            <section className="services-preview-section">
                <div className="section-header-center">
                    <span className="section-label">What We Offer</span>
                    <h2 className="section-title">Premium Salon Services</h2>
                    <div className="gold-divider"></div>
                    <p className="section-subtitle">From haircuts to bridal packages — a full range of luxury beauty services.</p>
                </div>
                <div className="services-preview-grid">
                    <div className="service-card-preview">
                        <div className="service-icon-big">✂️</div>
                        <h3>Haircut &amp; Styling</h3>
                        <p>Modern cuts tailored to your face shape and lifestyle.</p>
                        <span className="price-tag">From ₹800</span>
                    </div>
                    <div className="service-card-preview">
                        <div className="service-icon-big">🎨</div>
                        <h3>Hair Coloring</h3>
                        <p>Vibrant, long-lasting color and balayage treatments.</p>
                        <span className="price-tag">From ₹2,500</span>
                    </div>
                    <div className="service-card-preview">
                        <div className="service-icon-big">💆</div>
                        <h3>Spa &amp; Facial</h3>
                        <p>Rejuvenating skin care using top-tier luxury products.</p>
                        <span className="price-tag">From ₹1,200</span>
                    </div>
                    <div className="service-card-preview">
                        <div className="service-icon-big">👰</div>
                        <h3>Bridal Package</h3>
                        <p>Complete bridal transformation for your special day.</p>
                        <span className="price-tag">From ₹8,000</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <Link to="/services" className="btn btn-outline">View All Services →</Link>
                </div>
            </section>

            {/* ===== GALLERY PREVIEW ===== */}
            <section className="gallery-preview-section">
                <div className="section-header-center">
                    <span className="section-label">Our Work</span>
                    <h2 className="section-title">Style Gallery</h2>
                    <div className="gold-divider"></div>
                </div>
                <div className="gallery-preview-grid">
                    <div className="gallery-preview-item tall">
                        <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop" alt="Hairstyling" loading="lazy" />
                        <div className="gallery-preview-overlay">Hairstyling</div>
                    </div>
                    <div className="gallery-preview-item">
                        <img src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=600&auto=format&fit=crop" alt="Hair Color" loading="lazy" />
                        <div className="gallery-preview-overlay">Hair Color</div>
                    </div>
                    <div className="gallery-preview-item">
                        <img src="https://images.unsplash.com/photo-1516975080661-460d3c01c03e?q=80&w=600&auto=format&fit=crop" alt="Spa" loading="lazy" />
                        <div className="gallery-preview-overlay">Spa</div>
                    </div>
                    <div className="gallery-preview-item">
                        <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop" alt="Bridal" loading="lazy" />
                        <div className="gallery-preview-overlay">Bridal</div>
                    </div>
                    <div className="gallery-preview-item">
                        <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop" alt="Nails" loading="lazy" />
                        <div className="gallery-preview-overlay">Nails</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/gallery" className="btn btn-outline">View Full Gallery →</Link>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="testimonials-section">
                <div className="section-header-center">
                    <span className="section-label">Client Love</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                    <div className="gold-divider"></div>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>"Absolutely amazing experience! The stylists are top-notch and the ambiance is so luxurious."</p>
                        <strong>— Priya Sharma</strong>
                    </div>
                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>"Best bridal makeup I have ever seen. The team made me feel like a queen on my wedding day!"</p>
                        <strong>— Divya R.</strong>
                    </div>
                    <div className="testimonial-card">
                        <div className="stars">★★★★★</div>
                        <p>"I come here every month for hair care. Consistent quality and outstanding service every time."</p>
                        <strong>— Kavitha M.</strong>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="cta-section">
                <div className="cta-box">
                    <h2>Ready for Your Transformation?</h2>
                    <p>Book your appointment today and experience the best beauty services in Coimbatore.</p>
                    <Link to="/book" className="btn btn-gold btn-lg">Book Appointment →</Link>
                </div>
            </section>

        </div>
    );
}
