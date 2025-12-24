import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { TrendingUp, Sparkles, Search, X, Hash } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState({ latest: [], trending: [] });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/blogs', {
                params: {
                    search: debouncedSearch,
                    tag: activeTag
                }
            });
            setBlogs(res.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [debouncedSearch, activeTag]);

    const commonTags = ['Technology', 'Lifestyle', 'Coding', 'Travel', 'Health', 'Design'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    A Space for <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">Ideas</span> & <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-600">Stories</span>
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
                    Explore the latest insights from our community through our minimalist, lightning-fast blogging platform.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-focus-within:opacity-100" />
                    <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center px-4 py-3 shadow-lg group-hover:border-indigo-500/50 transition-all">
                        <Search className="text-zinc-400 mr-3" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by title, content or hashtags..."
                            className="w-full bg-transparent outline-none text-zinc-900 dark:text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Tag Filters */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {commonTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                activeTag === tag 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105' 
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                            <Hash size={14} className="inline mr-1" /> {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trending Section - Hide if searching */}
            {!debouncedSearch && !activeTag && (
                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                            <TrendingUp className="text-indigo-600" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Trending Now</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => <SkeletonLoader key={i} />)
                        ) : (
                            blogs.trending.map(blog => <BlogCard key={blog.id} blog={blog} />)
                        )}
                    </div>
                </section>
            )}

            {/* Latest/Results Section */}
            <section>
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                        <Sparkles className="text-purple-600" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {debouncedSearch || activeTag ? 'Search Results' : 'Latest Stories'}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => <SkeletonLoader key={i} />)
                    ) : (
                        blogs.latest.map(blog => <BlogCard key={blog.id} blog={blog} />)
                    )}
                </div>
                {!loading && blogs.latest.length === 0 && (
                    <div className="text-center py-32 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="max-w-xs mx-auto flex flex-col items-center gap-4 text-zinc-500">
                            <Search size={48} className="opacity-20" />
                            <p className="font-medium">No stories found matching your criteria. Try different keywords or tags!</p>
                            <button 
                                onClick={() => { setSearchQuery(''); setActiveTag(''); }}
                                className="text-indigo-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};


export default Home;
