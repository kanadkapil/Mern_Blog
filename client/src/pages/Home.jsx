import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { TrendingUp, Sparkles } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState({ latest: [], trending: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('/blogs');
                setBlogs(res.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6">
                    A Space for <span className="text-indigo-600">Ideas</span> & <span className="text-purple-600">Stories</span>
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Explore the latest insights from our community through our minimalist, lightning-fast blogging platform.
                </p>
            </div>

            {/* Trending Section */}
            <section className="mb-16">
                <div className="flex items-center gap-2 mb-8">
                    <TrendingUp className="text-indigo-600" />
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Trending on JSONBlog</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => <SkeletonLoader key={i} />)
                    ) : (
                        blogs.trending.map(blog => <BlogCard key={blog.id} blog={blog} />)
                    )}
                </div>
            </section>

            {/* Latest Section */}
            <section>
                <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="text-purple-600" />
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Latest Stories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => <SkeletonLoader key={i} />)
                    ) : (
                        blogs.latest.map(blog => <BlogCard key={blog.id} blog={blog} />)
                    )}
                </div>
                {!loading && blogs.latest.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 dark:text-zinc-400">No stories found. Be the first to write one!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
