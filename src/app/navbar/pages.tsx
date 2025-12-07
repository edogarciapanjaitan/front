"use client";

import { useState, useEffect } from "react";
import { isAuthenticated, isAdmin, isUser, getRole, getEmail, logout } from "@/utils/auth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        setAuthenticated(isAuthenticated());
        setAdmin(isAdmin());
        setUser(isUser());
        setRole(getRole());
        setEmail(getEmail());
    }, []);

    const handleLinkClick = () => setIsOpen(false);
    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setAdmin(false);
        setUser(false);
        setRole(null);
        setEmail(null);
    };

    if (!mounted) {
        return null;
    }

    return (
        <header className="fixed top-0 w-full text-red-800 bg-white/90 backdrop-blur-xl z-50 shadow-md">
            <nav className="flex items-center justify-between p-4 sm:p-6">
                {/* Logo */}
                <a href="/home" className="text-2xl font-bold shrink-0">
                    Pro Event
                </a>

                
                <ul className="hidden md:flex items-center gap-6">
                    <li><a href="/home" className="hover:text-gray-600 transition">Home</a></li>
                    <li><a href="/events" className="hover:text-gray-600 transition">Events</a></li>
                    <li><a href="/about" className="hover:text-gray-600 transition">About</a></li>
                    
                    {/* role */}
                    {authenticated ? (
                        <>
                            {admin && (
                                <li>
                                    <a href="/admin/dashboard" className="hover:text-gray-600 transition font-semibold">
                                        Admin Dashboard
                                    </a>
                                </li>
                            )}
                            <li className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{email || role}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><a href="/login" className="hover:text-gray-600 transition">Login</a></li>
                    )}
                </ul>

                {/* Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none transition"
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <ul className="flex flex-col gap-2 p-4">
                        <li><a href="/home" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 rounded transition">Home</a></li>
                        <li><a href="/events" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 rounded transition">Events</a></li>
                        <li><a href="/abut" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 rounded transition">About</a></li>
                        
                        {/* Menu berdasarkan role */}
                        {authenticated ? (
                            <>
                                {admin && (
                                    <li>
                                        <a href="/admin/dashboard" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 rounded transition font-semibold">
                                            Admin Dashboard
                                        </a>
                                    </li>
                                )}
                                <li className="px-4 py-2 text-sm text-gray-600">
                                    {email ? (
                                        <span>Email: <strong>{email}</strong></span>
                                    ) : (
                                        <span>Role: <strong>{role}</strong></span>
                                    )}
                                </li>
                                <li>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            handleLinkClick();
                                        }}
                                        className="w-full text-left block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li><a href="/login" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100 rounded transition">Login</a></li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Navbar;