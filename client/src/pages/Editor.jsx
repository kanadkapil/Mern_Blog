import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, Image as ImageIcon, Hash, Loader2, ArrowLeft } from 'lucide-react';

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        coverImage: '',
        hashtags: '',
        visibility: 'public'
    });

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const res = await axios.get(`/blogs/id/${id}`); // We'll need to add this endpoint or use slug
                    const blog = res.data;
                    setFormData({
                        title: blog.title,
                        content: blog.content,
                        coverImage: blog.coverImage,
                        hashtags: blog.hashtags.join(', '),
                        visibility: blog.visibility
                    });
                } catch (error) {
                    console.error('Error fetching blog:', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            };
            if (id) {
                await axios.put(`/blogs/${id}`, payload);
            } else {
                await axios.post('/blogs', payload);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 mb-8 transition-colors">
                <ArrowLeft size={20} /> Back
            </button>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <input 
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Article Title"
                        className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                    />
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                            <ImageIcon className="text-zinc-400" size={20} />
                            <input 
                                type="text"
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                placeholder="Cover Image URL"
                                className="w-full bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-lg outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                            <Hash className="text-zinc-400" size={20} />
                            <input 
                                type="text"
                                value={formData.hashtags}
                                onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                                placeholder="Tags (comma separated)"
                                className="w-full bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-lg outline-none text-sm"
                            />
                        </div>
                        <select 
                            value={formData.visibility}
                            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                            className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-lg outline-none text-sm"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                <textarea 
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your story..."
                    className="w-full min-h-[400px] bg-transparent border-none outline-none text-lg text-zinc-700 dark:text-zinc-300 resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                />

                <div className="fixed bottom-8 right-8">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-2xl shadow-indigo-500/50 flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {id ? 'Update' : 'Publish'}</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Editor;
