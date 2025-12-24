import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, User } from 'lucide-react';

const BlogCard = ({ blog }) => {
    return (
        <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
            {blog.coverImage && (
                <div className="aspect-video overflow-hidden">
                    <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                    {blog.hashtags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-indigo-50 dark:bg-indigo-950/30 px-2 py-1 rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>
                <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {blog.title}
                    </h3>
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs">
                    <div className="flex items-center gap-3">
                        <Link to={`/profile/${blog.authorName}`} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                            <User size={14} /> {blog.authorName}
                        </Link>
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Heart size={14} className={blog.liked ? "fill-red-500 text-red-500" : ""} />
                        <span>{blog.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
