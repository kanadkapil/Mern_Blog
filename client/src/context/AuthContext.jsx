import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get('/auth/me');
            setUser(res.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/auth/login', { email, password });
        setUser(res.data.user);
        return res.data;
    };

    const register = async (userData) => {
        const res = await axios.post('/auth/register', userData);
        return res.data;
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        const res = await axios.put('/users/profile', profileData);
        setUser(prev => ({ ...prev, profile: res.data }));
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
