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
                    const res = await axios.get(`/blogs/id/${id}`);
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
        
        const tags = formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        
        if (tags.length > 5) {
            alert('You can only add up to 5 keywords/hashtags.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                hashtags: tags
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

    const tagCount = formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag !== '').length;

    if (fetching) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 mb-8 transition-colors group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <input 
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Article Title"
                        className="w-full text-4xl md:text-5xl font-extrabold bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
                    />
                    
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 flex-1 min-w-[280px] bg-zinc-50 dark:bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <ImageIcon className="text-zinc-400" size={20} />
                            <input 
                                type="text"
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                placeholder="Cover Image URL (e.g. Unsplash)"
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-3 flex-1 min-w-[280px] bg-zinc-50 dark:bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 group focus-within:border-indigo-500/50 transition-all">
                            <Hash className="text-zinc-400" size={20} />
                            <div className="flex-1 flex items-center justify-between">
                                <input 
                                    type="text"
                                    value={formData.hashtags}
                                    onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                                    placeholder="Tags (max 5, comma separated)"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tagCount > 5 ? 'bg-red-100 text-red-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                                    {tagCount}/5
                                </span>
                            </div>
                        </div>
                        <select 
                            value={formData.visibility}
                            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                            className="bg-zinc-50 dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 outline-none text-sm font-bold text-zinc-600 dark:text-zinc-400"
                        >
                            <option value="public">🌍 Public Access</option>
                            <option value="private">🔒 Private Only</option>
                        </select>
                    </div>
                </div>

                <div className="relative group">
                    <textarea 
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Tell your story..."
                        className="w-full min-h-[500px] bg-transparent border-none outline-none text-lg text-zinc-700 dark:text-zinc-300 resize-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800 leading-relaxed"
                    />
                </div>

                <div className="fixed bottom-12 right-12 flex items-center gap-4">
                    <button 
                        type="submit"
                        disabled={loading || tagCount > 5}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-indigo-500/40 flex items-center gap-3 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {id ? 'Update Story' : 'Publish Now'}</>}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default Editor;
