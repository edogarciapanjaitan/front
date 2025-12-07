"use client";

/**
 * Utility functions untuk authentication dan role checking
 */

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

export const getRole = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("role");
    }
    return null;
};

export const getUser = (): any | null => {
    if (typeof window !== "undefined") {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};

export const getEmail = (): string | null => {
    const user = getUser();
    return user?.email || null;
};

export const isAuthenticated = (): boolean => {
    return getToken() !== null;
};

export const isAdmin = (): boolean => {
    const role = getRole();
    return role === "ADMIN";
};

export const isUser = (): boolean => {
    const role = getRole();
    return role === "USER";
};

export const logout = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }
};

export const requireAuth = (): boolean => {
    if (!isAuthenticated()) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return false;
    }
    return true;
};

export const requireAdmin = (): boolean => {
    if (!requireAuth()) {
        return false;
    }
    
    if (!isAdmin()) {
        if (typeof window !== "undefined") {
            alert("Akses ditolak! Hanya admin yang dapat mengakses halaman ini.");
            window.location.href = "/home";
        }
        return false;
    }
    return true;
};






