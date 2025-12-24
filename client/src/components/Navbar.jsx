import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, User, PenTool, Home } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            JSONBlog
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2">
                                <Home size={18} /> Home
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-zinc-600" />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/write" 
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    <PenTool size={18} /> <span className="hidden sm:inline">Write</span>
                                </Link>
                                <Link to={`/profile/${user.username}`} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600">
                                    <User size={20} />
                                </Link>
                                <button onClick={logout} className="text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600">Login</Link>
                                <Link 
                                    to="/register" 
                                    className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
