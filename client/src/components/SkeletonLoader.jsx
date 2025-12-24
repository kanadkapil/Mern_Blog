import React from 'react';

const SkeletonLoader = ({ type = 'card' }) => {
    if (type === 'card') {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-6">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
                    <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
                    <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-1" />
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-1" />
                    <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mt-6" />
                </div>
            </div>
        );
    }

    if (type === 'blog') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
                <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />
                <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-12" />
                <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-12" />
                <div className="space-y-4">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
            </div>
        );
    }

    return null;
};

export default SkeletonLoader;
