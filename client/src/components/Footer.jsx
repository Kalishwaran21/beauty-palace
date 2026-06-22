import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">✨ Beauty<span>Palace</span></Link>
                    <p>Premium beauty services that bring out your confidence and elegance.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="WhatsApp">💬</a>
                    </div>
                </div>


                <div className="footer-col">
                    <h4>Hours</h4>
                    <ul className="hours-list">
                        <li><span>Mon – Fri</span><span>10am – 8pm</span></li>
                        <li><span>Saturday</span><span>9am – 9pm</span></li>
                        <li><span>Sunday</span><span>10am – 6pm</span></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul className="contact-list">
                        <li>📍 123 Beauty Lane, Coimbatore</li>
                        <li>📞 +91 98765 43210</li>
                        <li>✉ info@beautypalace.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-copy">
                <p>&copy; {new Date().getFullYear()} Beauty Palace. All rights reserved.</p>
            </div>
        </footer>
    );
}
