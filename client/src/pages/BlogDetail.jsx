import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import { Heart, Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liking, setLiking] = useState(false);

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/blogs/${slug}`);
            setBlog(res.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
            if (error.response?.status === 404) navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const handleLike = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setLiking(true);
        try {
            const res = await axios.post(`/blogs/${blog.id}/like`);
            setBlog(prev => ({ ...prev, likes: res.data.likes, liked: res.data.liked }));
        } catch (error) {
            console.error('Error liking blog:', error);
        } finally {
            setLiking(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/blogs/${blog.id}`);
                navigate('/');
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    if (loading) return <SkeletonLoader type="blog" />;
    if (!blog) return null;

    const isAuthor = user && user.id === blog.authorId;

    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 mb-8 transition-colors">
                <ArrowLeft size={20} /> Back
            </button>

            <header className="mb-12">
                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.hashtags.map(tag => (
                        <span key={tag} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center justify-between border-y border-zinc-100 dark:border-zinc-800 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 dark:text-white">{blog.authorName}</p>
                            <div className="flex items-center gap-3 text-sm text-zinc-500">
                                <span className="flex items-center gap-1 font-medium"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1 font-medium"><Heart size={14} /> {blog.likes} likes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleLike}
                            disabled={liking}
                            className={`p-3 rounded-full border transition-all ${
                                blog.liked 
                                ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 text-red-500' 
                                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-500'
                            }`}
                        >
                            <Heart size={20} className={blog.liked ? 'fill-red-500' : ''} />
                        </button>
                        
                        {isAuthor && (
                            <div className="flex items-center gap-2">
                                <Link to={`/edit/${blog.id}`} className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                                    <Edit size={20} />
                                </Link>
                                <button onClick={handleDelete} className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full border border-red-100 dark:border-red-900/50">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {blog.coverImage && (
                <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                    <img src={blog.coverImage} alt={blog.title} className="w-full object-cover" />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {blog.content}
            </div>
        </article>
    );
};

export default BlogDetail;
