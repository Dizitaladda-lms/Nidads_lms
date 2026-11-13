"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Style from "./navbar.module.css";
import SiteThemeToggle from "@/components/SiteThemeToggle";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    // Close mobile menu on nav link click (optional)
    const handleNavClick = () => setMobileOpen(false);

    return (
        <nav className={Style.navbar}>
            <Link href="/" className={Style.logo}>
                <img src="/Nidads-2.webp" alt="Nidads Logo" style={{ height: '40px', width: 'auto' }} />
            </Link>
            {/* Hamburger button (only shows when menu is closed on mobile) */}
            <button
                className={Style.mobileToggle}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="navbar-menu"
                onClick={() => setMobileOpen((v) => !v)}
                style={{ display: mobileOpen ? 'none' : undefined }}
            >
                <span>☰</span>
            </button>
            <div
                id="navbar-menu"
                className={
                  Style.linksContainer + (mobileOpen ? ' ' + Style.open : '')
                }
            >
                {/* Close button inside mobile menu */}
                <button
                  className={Style.mobileClose}
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>
                <ul>
                    <li><Link href="/" onClick={handleNavClick}>Home</Link></li>
                    <li><Link href="/course" onClick={handleNavClick}>Courses</Link></li>
                    <li><Link href="/about" onClick={handleNavClick}>About</Link></li>
                    <li><Link href="/contact-us" onClick={handleNavClick}>Contact</Link></li>
                    <li><Link href="/blog" onClick={handleNavClick}>Blog</Link></li>
                    <li className={Style.mobileOnly}>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick();
                                if (typeof window !== 'undefined') {
                                    window.dispatchEvent(new Event('openEnquiryPopup'));
                                }
                            }}
                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit', padding: 0 }}
                        >
                            Councelling
                        </button>
                    </li>
                </ul>
            </div>
            {!pathname?.startsWith("/blog") && <SiteThemeToggle />}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== 'undefined') {
                        window.dispatchEvent(new Event('openEnquiryPopup'));
                    }
                }}
                className={Style.desktopOnly}
                style={{ backgroundColor:'#fff',padding:'8px 15px ',borderRadius:'5px',fontWeight:'bold', color: '#000', marginLeft: '1rem', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
                Join Free Demo
            </button>
        </nav>
    );
}
