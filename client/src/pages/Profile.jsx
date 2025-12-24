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

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`/users/${username}`);
            setProfile(res.data);
            setEditData(res.data.profile);
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response?.status === 404) navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [username]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile(editData);
            setProfile(prev => ({ ...prev, profile: editData }));
            setEditing(false);
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header / Cover Area */}
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 h-40 rounded-3xl mb-12 shadow-xl shadow-indigo-500/20" />

            <div className="relative -mt-24 px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                        <div className="w-32 h-32 bg-white dark:bg-zinc-900 rounded-2xl p-2 shadow-2xl">
                            {p.profilePicture ? (
                                <img src={p.profilePicture} alt={profile.username} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <div className="pb-2">
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{profile.username}</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium">@{profile.username}</p>
                        </div>
                    </div>

                    {isOwnProfile && (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setEditing(!editing)}
                                className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <Edit2 size={16} /> {editing ? 'Cancel' : 'Edit Profile'}
                            </button>
                            <button 
                                onClick={handleDeactivate}
                                className="flex items-center gap-2 bg-red-50 dark:bg-red-950/20 text-red-600 border border-red-100 dark:border-red-900/50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
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
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">Profile Picture URL</label>
                            <input 
                                type="text"
                                value={editData.profilePicture}
                                onChange={(e) => setEditData({ ...editData, profilePicture: e.target.value })}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none"
                            />
                            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">Bio</label>
                            <textarea 
                                value={editData.bio}
                                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                className="w-full h-32 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none resize-none"
                            />
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Bio</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {p.bio || 'This user hasn’t added a bio yet.'}
                            </p>
                        </div>
                    )}

                    <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6">Connect</h3>
                        <div className="space-y-4">
                            {editing ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2"><Github size={18} /><input className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg px-2 py-1 text-xs" value={editData.socialLinks.github} onChange={e => setEditData({...editData, socialLinks: {...editData.socialLinks, github: e.target.value}})} placeholder="GitHub" /></div>
                                    <div className="flex items-center gap-2"><Linkedin size={18} /><input className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg px-2 py-1 text-xs" value={editData.socialLinks.linkedin} onChange={e => setEditData({...editData, socialLinks: {...editData.socialLinks, linkedin: e.target.value}})} placeholder="LinkedIn" /></div>
                                    <div className="flex items-center gap-2"><Instagram size={18} /><input className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-lg px-2 py-1 text-xs" value={editData.socialLinks.instagram} onChange={e => setEditData({...editData, socialLinks: {...editData.socialLinks, instagram: e.target.value}})} placeholder="Instagram" /></div>
                                </div>
                            ) : (
                                <>
                                    {p.socialLinks.github && <a href={p.socialLinks.github} target="_blank" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"><Github size={20} /> GitHub</a>}
                                    {p.socialLinks.linkedin && <a href={p.socialLinks.linkedin} target="_blank" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"><Linkedin size={20} /> LinkedIn</a>}
                                    {p.socialLinks.instagram && <a href={p.socialLinks.instagram} target="_blank" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"><Instagram size={20} /> Instagram</a>}
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400"><Mail size={20} /> {profile.email}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {editing && (
                        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
                            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2"><Shield size={20} /> Settings</h3>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={editData.isPublic}
                                        onChange={(e) => setEditData({ ...editData, isPublic: e.target.checked })}
                                        className="w-5 h-5 rounded border-zinc-300 text-indigo-600"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Public Profile</span>
                                </label>
                            </div>
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Spotify Favorites</h2>
                        {editing ? (
                            <div className="flex items-center gap-2">
                                <LinkIcon size={18} className="text-zinc-400" />
                                <input 
                                    className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl px-4 py-3 outline-none border border-zinc-200 dark:border-zinc-800"
                                    placeholder="Spotify Embed Link"
                                    value={editData.spotifyTrack}
                                    onChange={e => setEditData({...editData, spotifyTrack: e.target.value})}
                                />
                            </div>
                        ) : p.spotifyTrack ? (
                            <iframe 
                                style={{ borderRadius: '12px' }} 
                                src={p.spotifyTrack} 
                                width="100%" 
                                height="152" 
                                frameBorder="0" 
                                allowFullScreen="" 
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                loading="lazy"
                            />
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center text-zinc-500">
                                No favorite track added yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
