
const images = [
    { src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800', category: 'Hairstyling' },
    { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800', category: 'Hair Color' },
    { src: 'https://images.unsplash.com/photo-1516975080661-460d3c01c03e?q=80&w=800', category: 'Spa' },
    { src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800', category: 'Bridal' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', category: 'Nails' },
    { src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800', category: 'Haircut' },
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800', category: 'Salon' },
    { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800', category: 'Spa' },
    { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800', category: 'Facial' },
];

export default function Gallery() {
    return (
        <div>
            <div className="page-header">
                <span className="section-label">Our Work</span>
                <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>Style Gallery</h1>
                <div className="gold-divider"></div>
                <p style={{color:'var(--text-light)', maxWidth:'500px', margin:'0 auto'}}>A showcase of our best transformations across all services.</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="full-gallery-grid">
                        {images.map((img, i) => (
                            <div key={i} className={`full-gallery-item ${i === 0 || i === 5 ? 'wide' : ''}`}>
                                <img src={img.src} alt={img.category} loading="lazy" />
                                <div className="full-gallery-overlay">
                                    <span style={{ fontSize: '1.2rem' }}>✨</span>
                                    <span>{img.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                .full-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                .full-gallery-item {
                    position: relative;
                    border-radius: var(--radius);
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 4/5;
                }
                .full-gallery-item.wide { aspect-ratio: 16/9; grid-column: span 2; }
                .full-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
                .full-gallery-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: flex-end;
                    padding: 1.5rem; color: var(--gold);
                    opacity: 0; transition: var(--transition);
                }
                .full-gallery-overlay span { color: white; font-size: 0.9rem; margin-top: 0.5rem; }
                .full-gallery-item:hover img { transform: scale(1.07); }
                .full-gallery-item:hover .full-gallery-overlay { opacity: 1; }
                @media (max-width: 768px) {
                    .full-gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    .full-gallery-item.wide { grid-column: auto; aspect-ratio: 4/5; }
                }
            `}</style>
        </div>
    );
}
