import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Github, Linkedin, Youtube, Instagram, Facebook, Edit2, Shield, Power, Loader2, Link as LinkIcon } from 'lucide-react';

const Profile = () => {
    const { username } = useParams();
    const { user: currentUser, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editData, setEditData] = useState({});

    const ensureExternalLink = (url) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `https://${url}`;
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile(editData);
            setProfile(prev => ({ ...prev, profile: editData }));
            setEditing(false);
            await checkAuth(); // Refresh current user in context
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDeactivate = async () => {
        if (window.confirm('Are you sure you want to deactivate your account? This will hide your profile and all your blogs.')) {
            try {
                await axios.post('/users/deactivate');
                await logout();
                navigate('/');
            } catch (error) {
                console.error('Error deactivating account:', error);
            }
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;
    if (!profile) return null;

    const isOwnProfile = currentUser && currentUser.username === username;
    const { profile: p } = profile;

    const platforms = [
        { id: 'github', icon: Github, label: 'GitHub' },
        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
        { id: 'instagram', icon: Instagram, label: 'Instagram' },
        { id: 'youtube', icon: Youtube, label: 'YouTube' },
        { id: 'facebook', icon: Facebook, label: 'Facebook' },
        { id: 'gmail', icon: Mail, label: 'Gmail' }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 transition-all duration-500">
            {/* Header / Cover Area */}
            <div 
                className="relative h-48 rounded-3xl mb-12 shadow-xl overflow-hidden group/cover"
                style={{ 
                    background: p.backgroundImage ? `url(${p.backgroundImage}) center/cover no-repeat` : 'linear-gradient(to right, #6366f1, #a855f7)'
                }}
            >
                {!p.backgroundImage && <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white" />}
            </div>

            <div className="relative -mt-24 px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                        <div className="w-32 h-32 bg-white dark:bg-zinc-900 rounded-2xl p-2 shadow-2xl relative group/avatar">
                            {p.profilePicture ? (
                                <img src={p.profilePicture} alt={profile.username} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <div className="pb-2">
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{profile.username}</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium">@{profile.username}</p>
                        </div>
                    </div>

                    {isOwnProfile && (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setEditing(!editing)}
                                className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
                            >
                                <Edit2 size={16} /> {editing ? 'Cancel' : 'Edit Profile'}
                            </button>
                            <button 
                                onClick={handleDeactivate}
                                className="flex items-center gap-2 bg-red-50 dark:bg-red-950/20 text-red-600 border border-red-100 dark:border-red-900/50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95"
                            >
                                <Power size={16} /> Deactivate
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
                {/* Info Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    {editing ? (
                        <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Profile Picture</label>
                                <input 
                                    type="text"
                                    placeholder="Image URL"
                                    value={editData.profilePicture}
                                    onChange={(e) => setEditData({ ...editData, profilePicture: e.target.value })}
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Background Image</label>
                                <input 
                                    type="text"
                                    placeholder="Background URL"
                                    value={editData.backgroundImage}
                                    onChange={(e) => setEditData({ ...editData, backgroundImage: e.target.value })}
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Bio</label>
                                <textarea 
                                    value={editData.bio}
                                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                    className="w-full h-32 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Bio</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                                "{p.bio || 'This user hasn’t added a bio yet.'}"
                            </p>
                        </div>
                    )}

                    <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6">Connect</h3>
                        <div className="space-y-4">
                            {editing ? (
                                <div className="space-y-4">
                                    {platforms.map(({ id, icon: Icon, label }) => (
                                        <div key={id} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-300 font-medium text-sm">
                                                    <Icon size={16} /> {label}
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        className="sr-only peer"
                                                        checked={editData.socialLinks[id]?.visible ?? true}
                                                        onChange={e => setEditData({
                                                            ...editData, 
                                                            socialLinks: {
                                                                ...editData.socialLinks,
                                                                [id]: { ...editData.socialLinks[id], visible: e.target.checked }
                                                            }
                                                        })}
                                                    />
                                                    <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"></div>
                                                </label>
                                            </div>
                                            <input 
                                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500/10" 
                                                value={editData.socialLinks[id]?.url || ''} 
                                                onChange={e => setEditData({
                                                    ...editData, 
                                                    socialLinks: {
                                                        ...editData.socialLinks,
                                                        [id]: { ...editData.socialLinks[id], url: e.target.value }
                                                    }
                                                })} 
                                                placeholder={`${label} Profile URL`} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {platforms.map(({ id, icon: Icon, label }) => {
                                        const link = p.socialLinks[id];
                                        if (link?.url && link.visible) {
                                            return (
                                                <a 
                                                    key={id}
                                                    href={ensureExternalLink(link.url)} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors group"
                                                >
                                                    <div className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors">
                                                        <Icon size={18} /> 
                                                    </div>
                                                    <span className="font-medium text-sm">{label}</span>
                                                </a>
                                            );
                                        }
                                        return null;
                                    })}
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                         <div className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                                            <Mail size={18} />
                                         </div>
                                         <span className="font-medium text-sm">{profile.email}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {editing && (
                        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2 text-zinc-900 dark:text-white"><Shield size={20} className="text-indigo-500" /> Visibility Settings</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-indigo-100 dark:border-zinc-800 cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-zinc-900 dark:text-white">Public Profile</span>
                                        <span className="text-xs text-zinc-500">Allow everyone to see your posts and profile</span>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={editData.isPublic}
                                        onChange={(e) => setEditData({ ...editData, isPublic: e.target.checked })}
                                        className="w-5 h-5 rounded-full border-zinc-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                    />
                                </label>
                            </div>
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full mt-6 bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="animate-spin" size={20} /> : 'Update My Profile'}
                            </button>
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Music Vibe</h2>
                        {editing ? (
                            <div className="space-y-4">
                                <p className="text-xs text-zinc-500">Paste a Spotify song, album, or playlist link to embed it on your profile.</p>
                                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl px-4 py-1.5 border border-zinc-200 dark:border-zinc-800">
                                    <LinkIcon size={18} className="text-zinc-400" />
                                    <input 
                                        className="w-full bg-transparent py-2.5 outline-none text-sm"
                                        placeholder="https://open.spotify.com/track/..."
                                        value={editData.spotifyTrack}
                                        onChange={e => {
                                            let val = e.target.value;
                                            if (val.includes('open.spotify.com') && !val.includes('embed')) {
                                                val = val.replace('.com/', '.com/embed/');
                                            }
                                            setEditData({...editData, spotifyTrack: val});
                                        }}
                                    />
                                </div>
                            </div>
                        ) : p.spotifyTrack ? (
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                <iframe 
                                    src={p.spotifyTrack} 
                                    width="100%" 
                                    height="152" 
                                    frameBorder="0" 
                                    allowFullScreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 p-12 rounded-3xl text-center text-zinc-500 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                                     <Home size={24} />
                                </div>
                                <span>No favorite track added yet.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Profile;
