import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import './Navbar.css';

import logoImg from '../assets/logo.png';

const Navbar = ({ cartCount = 0 }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} onClick={closeMenu}>
                    <img src={logoImg} alt="Solera Life Sciences" style={{ height: '40px', width: 'auto' }} />
                </Link>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/products/accel-wipes" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeMenu}>Product</Link>
                    <a href="/#technology" onClick={closeMenu}>Benefits</a>
                    <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeMenu}>Blog</Link>
                    <a href="/#contact" onClick={closeMenu}>Wholesale (B2B)</a>
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-btn" aria-label="Cart" onClick={closeMenu}>
                        <ShoppingCart size={24} />
                        <span className="cart-count">{cartCount}</span>
                    </Link>
                    <button className="mobile-menu-btn" aria-label="Menu" onClick={toggleMenu}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
            {/* Mobile Menu Overlay */}
            {isMenuOpen && <div className="mobile-backdrop" onClick={closeMenu}></div>}
        </nav>
    );
};

export default Navbar;
