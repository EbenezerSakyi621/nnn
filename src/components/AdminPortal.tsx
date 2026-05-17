import React, { useState } from 'react';
import { mediaStore, SyncSettings } from '../data/mediaStore';
import { DesignItem, VideoItem } from '../data/initialData';
import {
  Lock,
  Upload,
  PlusCircle,
  Trash2,
  RefreshCw,
  Download,
  Copy,
  Check,
  Image as ImageIcon,
  Video as VideoIcon,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Settings,
  Cloud,
  Laptop,
  Globe,
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCatalog: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onUpdateCatalog,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'settings' | 'help'>('upload');

  // Sync Settings State
  const [syncSettings, setSyncSettings] = useState<SyncSettings>(mediaStore.getSyncSettings());
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Upload state
  const [uploadCategory, setUploadCategory] = useState<'designs' | 'animated'>('designs');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Video state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoThumbInput, setVideoThumbInput] = useState('');
  const [videoSuccess, setVideoSuccess] = useState('');
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  // Manage state
  const [designsList, setDesignsList] = useState<DesignItem[]>(mediaStore.getDesigns());
  const [animatedList, setAnimatedList] = useState<DesignItem[]>(mediaStore.getAnimated());
  const [videosList, setVideosList] = useState<VideoItem[]>(mediaStore.getVideos());

  // Export state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'skycreatives' || password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
      refreshLists();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const refreshLists = () => {
    setDesignsList(mediaStore.getDesigns());
    setAnimatedList(mediaStore.getAnimated());
    setVideosList(mediaStore.getVideos());
    onUpdateCatalog();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    mediaStore.saveSyncSettings(syncSettings);
    setSettingsSuccess('Live Publishing settings saved successfully! Your website will now auto-publish using this mode.');
    setTimeout(() => setSettingsSuccess(''), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess('');

    let finalUrl = '';
    if (uploadMethod === 'file') {
      if (!selectedFileBase64) {
        alert('Please select an image file first.');
        return;
      }
      finalUrl = selectedFileBase64;
    } else {
      if (!imageUrlInput.trim()) {
        alert('Please enter a valid image URL.');
        return;
      }
      finalUrl = imageUrlInput.trim();
    }

    setIsUploading(true);
    const res = await mediaStore.addDesign(finalUrl, uploadCategory);
    setIsUploading(false);

    setUploadSuccess(res.message);
    
    // Reset inputs
    setImageUrlInput('');
    setSelectedFileBase64(null);
    setFileName('');
    refreshLists();

    setTimeout(() => setUploadSuccess(''), 6000);
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoSuccess('');

    if (!videoTitle.trim() || !videoUrlInput.trim()) {
      alert('Please enter both Video Title and YouTube URL.');
      return;
    }

    setIsVideoUploading(true);
    const res = await mediaStore.addVideo(videoTitle.trim(), videoUrlInput.trim(), videoThumbInput.trim() || undefined);
    setIsVideoUploading(false);

    setVideoSuccess(res.message);

    // Reset inputs
    setVideoTitle('');
    setVideoUrlInput('');
    setVideoThumbInput('');
    refreshLists();

    setTimeout(() => setVideoSuccess(''), 6000);
  };

  const handleDelete = async (id: string, type: 'designs' | 'animated' | 'videos') => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const res = await mediaStore.deleteItem(id, type);
      refreshLists();
      alert(res.message);
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('WARNING: This will remove all your custom uploads and restore the original Sky Creatives website catalog. Proceed?')) {
      const res = await mediaStore.resetToDefault();
      refreshLists();
      alert(`Catalog reset. ${res.message}`);
    }
  };

  const handleCopySnippet = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleDownloadJson = () => {
    const jsonString = mediaStore.exportDataJson();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sky_creatives_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const snippets = mediaStore.exportHtmlSnippets();

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[99999] p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl shadow-black overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-5 bg-[#020617] border-b border-white/10 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0ea5e9]/20 rounded-lg text-[#0ea5e9]">
              <Globe className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-wide">
                Sky Creatives <span className="text-[#0ea5e9]">Admin Portal</span>
              </h2>
              <p className="text-xs text-slate-400">Upload media directly — goes straight to your live website!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Close Portal
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isLoggedIn ? (
            /* Login Screen */
            <div className="max-w-md mx-auto my-12 bg-[#020617] p-8 rounded-2xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-[#0ea5e9]/20 text-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Admin Authentication</h3>
              <p className="text-slate-400 text-sm mb-6">
                Please enter the master password to unlock the studio dashboard.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] text-center text-lg tracking-widest"
                    autoFocus
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl shadow-lg shadow-[#0ea5e9]/20 hover:shadow-[#0ea5e9]/40 transition-all text-base"
                >
                  Unlock Dashboard
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-800/80 text-left bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Demo Hint</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use password <code className="bg-slate-800 text-[#0ea5e9] px-2 py-0.5 rounded font-mono font-bold">skycreatives</code> or <code className="bg-slate-800 text-[#0ea5e9] px-2 py-0.5 rounded font-mono font-bold">admin123</code> to access the admin portal immediately.
                </p>
              </div>
            </div>
          ) : (
            /* Dashboard Content */
            <div>
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 bg-[#020617] p-2 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'upload'
                      ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload & Add Media</span>
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'manage'
                      ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Manage Catalog ({designsList.length + animatedList.length + videosList.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Live Auto-Publishing & Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('help')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all ${
                    activeTab === 'help'
                      ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>How It Works</span>
                </button>
              </div>

              {/* Tab 1: Upload & Add Media */}
              {activeTab === 'upload' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Image Section */}
                  <div className="bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                      <ImageIcon className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Add New Image Design</span>
                    </div>

                    <form onSubmit={handleAddImage} className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Select Target Section</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setUploadCategory('designs')}
                            className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                              uploadCategory === 'designs'
                                ? 'bg-[#0ea5e9]/20 border-[#0ea5e9] text-[#0ea5e9]'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            Our Designs Grid
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadCategory('animated')}
                            className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                              uploadCategory === 'animated'
                                ? 'bg-[#0ea5e9]/20 border-[#0ea5e9] text-[#0ea5e9]'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            Animated Images Grid
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Upload Method</label>
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                            <input
                              type="radio"
                              name="uploadMethod"
                              checked={uploadMethod === 'file'}
                              onChange={() => setUploadMethod('file')}
                              className="accent-[#0ea5e9]"
                            />
                            <span>Upload File from Device</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                            <input
                              type="radio"
                              name="uploadMethod"
                              checked={uploadMethod === 'url'}
                              onChange={() => setUploadMethod('url')}
                              className="accent-[#0ea5e9]"
                            />
                            <span>Paste Cloudinary / Web URL</span>
                          </label>
                        </div>

                        {uploadMethod === 'file' ? (
                          <div className="border-2 border-dashed border-slate-700 hover:border-[#0ea5e9] bg-slate-900/50 rounded-xl p-6 text-center transition-all">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              id="imageUploadInput"
                            />
                            <label htmlFor="imageUploadInput" className="cursor-pointer flex flex-col items-center">
                              <Upload className="w-10 h-10 text-[#0ea5e9] mb-3 animate-bounce" />
                              <span className="font-bold text-white mb-1">Click to browse image file</span>
                              <span className="text-xs text-slate-400 mb-3">Supports JPG, PNG, WEBP, GIF</span>
                              {fileName && (
                                <span className="text-xs bg-[#0ea5e9]/20 text-[#0ea5e9] px-3 py-1 rounded-full font-mono">
                                  Selected: {fileName}
                                </span>
                              )}
                            </label>
                          </div>
                        ) : (
                          <input
                            type="url"
                            placeholder="https://res.cloudinary.com/..."
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] text-sm font-mono"
                          />
                        )}
                      </div>

                      {uploadSuccess && (
                        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
                          <Check className="w-5 h-5 shrink-0" />
                          <span>{uploadSuccess}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-slate-700 text-white font-bold rounded-xl shadow-lg shadow-[#0ea5e9]/20 hover:shadow-[#0ea5e9]/40 transition-all flex items-center justify-center gap-2"
                      >
                        {isUploading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <PlusCircle className="w-5 h-5" />
                        )}
                        <span>{isUploading ? 'Publishing straight to website...' : 'Add Design to Website'}</span>
                      </button>
                    </form>
                  </div>

                  {/* Upload Video Section */}
                  <div className="bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                      <VideoIcon className="w-5 h-5 text-[#ef4444]" />
                      <span>Add New YouTube Animation</span>
                    </div>

                    <form onSubmit={handleAddVideo} className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Video Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Chrono Link: Cinematic Trailer"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ef4444] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">YouTube Video URL</label>
                        <input
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoUrlInput}
                          onChange={(e) => setVideoUrlInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ef4444] text-sm font-mono"
                        />
                        <p className="text-xs text-slate-400 mt-1.5">
                          We will automatically generate the video thumbnail from the YouTube link!
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Custom Thumbnail URL (Optional)</label>
                        <input
                          type="url"
                          placeholder="Leave empty for automatic YouTube thumbnail"
                          value={videoThumbInput}
                          onChange={(e) => setVideoThumbInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#ef4444] text-sm font-mono"
                        />
                      </div>

                      {videoSuccess && (
                        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
                          <Check className="w-5 h-5 shrink-0" />
                          <span>{videoSuccess}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isVideoUploading}
                        className="w-full py-3.5 bg-[#ef4444] hover:bg-[#dc2626] disabled:bg-slate-700 text-white font-bold rounded-xl shadow-lg shadow-[#ef4444]/20 hover:shadow-[#ef4444]/40 transition-all flex items-center justify-center gap-2"
                      >
                        {isVideoUploading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <PlusCircle className="w-5 h-5" />
                        )}
                        <span>{isVideoUploading ? 'Publishing straight to website...' : 'Add Video to Website'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Tab 2: Manage Catalog */}
              {activeTab === 'manage' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-[#020617] p-4 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-300">
                      Here you can review and delete any existing items from your website. Changes reflect instantly on the live site.
                    </p>
                    <button
                      onClick={handleResetDefaults}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-semibold transition-all shrink-0"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset to Original Defaults</span>
                    </button>
                  </div>

                  {/* Our Designs List */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <ImageIcon className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Our Designs ({designsList.length})</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {designsList.map((item) => (
                        <div key={item.id} className="bg-[#020617] rounded-xl overflow-hidden border border-white/10 group relative aspect-square">
                          <img src={item.url} alt="Design" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <button
                              onClick={() => handleDelete(item.id, 'designs')}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-transform hover:scale-110"
                              title="Delete item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animated Images List */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <ImageIcon className="w-5 h-5 text-[#0ea5e9]" />
                      <span>Animated Images ({animatedList.length})</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {animatedList.map((item) => (
                        <div key={item.id} className="bg-[#020617] rounded-xl overflow-hidden border border-white/10 group relative aspect-square">
                          <img src={item.url} alt="Animated" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <button
                              onClick={() => handleDelete(item.id, 'animated')}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-transform hover:scale-110"
                              title="Delete item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Videos List */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <VideoIcon className="w-5 h-5 text-[#ef4444]" />
                      <span>Latest Animations ({videosList.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {videosList.map((item) => (
                        <div key={item.id} className="bg-[#020617] rounded-xl overflow-hidden border border-white/10 flex items-center gap-4 p-3 group relative">
                          <img src={item.thumbnailUrl} alt={item.title} className="w-24 h-16 object-cover rounded-lg bg-black shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                            <p className="text-xs text-slate-400 truncate font-mono mt-1">{item.videoUrl}</p>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id, 'videos')}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-transform hover:scale-110 shrink-0"
                            title="Delete video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Live Auto-Publishing & Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div className="bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-6 h-6 text-[#0ea5e9]" />
                      <span>Live Auto-Publishing Engine</span>
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-3xl">
                      You mentioned: <strong className="text-[#0ea5e9]">"when i upload, it should go straight to the website i dont want to copy the code and paste it in github"</strong>. 
                      <br /><br />
                      This publishing engine solves that exact problem! Choose one of the automatic publishing modes below. Once configured, every time you click "Add Design", the portal will push the update straight to your live website or GitHub repository behind the scenes instantly.
                    </p>

                    <form onSubmit={handleSaveSettings} className="space-y-8">
                      {/* Mode selection cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Mode 1: Cloud Sync */}
                        <label className={`p-5 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                          syncSettings.mode === 'cloud'
                            ? 'bg-[#0ea5e9]/10 border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/20'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-70'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 font-bold text-white">
                                <Cloud className="w-5 h-5 text-[#0ea5e9]" />
                                <span>Instant Cloud Sync</span>
                              </div>
                              <input
                                type="radio"
                                name="syncMode"
                                checked={syncSettings.mode === 'cloud'}
                                onChange={() => setSyncSettings({ ...syncSettings, mode: 'cloud' })}
                                className="accent-[#0ea5e9]"
                              />
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <strong>Recommended!</strong> Uploads go straight to a live cloud database (JSONBin) instantly. Whenever any visitor opens your website, they see the new designs immediately without touching GitHub.
                            </p>
                          </div>
                          <span className="mt-4 inline-block text-xs font-bold text-[#0ea5e9] bg-[#0ea5e9]/20 px-2.5 py-1 rounded w-fit">
                            Zero GitHub Setup Required
                          </span>
                        </label>

                        {/* Mode 2: GitHub API Push */}
                        <label className={`p-5 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                          syncSettings.mode === 'github'
                            ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-70'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 font-bold text-white">
                                <Globe className="w-5 h-5 text-purple-400" />
                                <span>GitHub API Direct Push</span>
                              </div>
                              <input
                                type="radio"
                                name="syncMode"
                                checked={syncSettings.mode === 'github'}
                                onChange={() => setSyncSettings({ ...syncSettings, mode: 'github' })}
                                className="accent-purple-500"
                              />
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Uploads use the official GitHub REST API to automatically commit and push the updated files directly to your repository behind the scenes.
                            </p>
                          </div>
                          <span className="mt-4 inline-block text-xs font-bold text-purple-400 bg-purple-500/20 px-2.5 py-1 rounded w-fit">
                            Requires GitHub PAT & Repo
                          </span>
                        </label>

                        {/* Mode 3: Local Browser Mode */}
                        <label className={`p-5 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                          syncSettings.mode === 'local'
                            ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/20'
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-70'
                        }`}>
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 font-bold text-white">
                                <Laptop className="w-5 h-5 text-amber-400" />
                                <span>Local Browser Mode</span>
                              </div>
                              <input
                                type="radio"
                                name="syncMode"
                                checked={syncSettings.mode === 'local'}
                                onChange={() => setSyncSettings({ ...syncSettings, mode: 'local' })}
                                className="accent-amber-500"
                              />
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Uploads are saved instantly to your personal browser's local storage. Great for showcasing designs on your personal iPad or laptop during client meetings.
                            </p>
                          </div>
                          <span className="mt-4 inline-block text-xs font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded w-fit">
                            Private Showcase Mode
                          </span>
                        </label>
                      </div>

                      {/* Dynamic Configuration Fields */}
                      {syncSettings.mode === 'cloud' && (
                        <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                            <Cloud className="w-4 h-4 text-[#0ea5e9]" />
                            <span>Cloud Sync Database Configuration (JSONBin.io)</span>
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            We have provided a free simulated / public cloud bin out-of-the-box so it works instantly! If you want your own private cloud database, you can create a free account at JSONBin.io and paste your Master Key and Bin ID below.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">JSONBin Bin ID</label>
                              <input
                                type="text"
                                value={syncSettings.cloudBinId}
                                onChange={(e) => setSyncSettings({ ...syncSettings, cloudBinId: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">JSONBin Master Key (Optional)</label>
                              <input
                                type="password"
                                placeholder="X-Master-Key (leave blank for demo bin)"
                                value={syncSettings.cloudApiKey}
                                onChange={(e) => setSyncSettings({ ...syncSettings, cloudApiKey: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {syncSettings.mode === 'github' && (
                        <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4 text-purple-400" />
                            <span>GitHub API Direct Auto-Committer Configuration</span>
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            To allow the portal to commit directly to your GitHub repository, generate a Personal Access Token (classic) with `repo` permissions in your GitHub Developer Settings.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">GitHub Repository</label>
                              <input
                                type="text"
                                placeholder="e.g. myusername/sky-creatives"
                                value={syncSettings.githubRepo}
                                onChange={(e) => setSyncSettings({ ...syncSettings, githubRepo: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">Target File Path</label>
                              <input
                                type="text"
                                value={syncSettings.githubPath}
                                onChange={(e) => setSyncSettings({ ...syncSettings, githubPath: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">Personal Access Token</label>
                              <input
                                type="password"
                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                value={syncSettings.githubToken}
                                onChange={(e) => setSyncSettings({ ...syncSettings, githubToken: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsSuccess && (
                        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
                          <Check className="w-5 h-5 shrink-0" />
                          <span>{settingsSuccess}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl shadow-lg shadow-[#0ea5e9]/20 hover:shadow-[#0ea5e9]/40 transition-all text-sm"
                      >
                        Save Publishing Settings
                      </button>
                    </form>

                    {/* Hard Backup & Snippets Section (Collapsible/Secondary) */}
                    <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white text-base">Manual Code Export & Hard Backup</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            Just in case you ever want to download a hard backup of your catalog or copy HTML snippets directly.
                          </p>
                        </div>
                        <button
                          onClick={handleDownloadJson}
                          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all text-xs"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Backup JSON</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-200">"Our Designs" Snippet</label>
                            <button
                              onClick={() => handleCopySnippet(snippets.designsHtml, 'designs')}
                              className="text-[#0ea5e9] hover:underline text-xs font-semibold flex items-center gap-1"
                            >
                              {copiedType === 'designs' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedType === 'designs' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <textarea
                            readOnly
                            value={snippets.designsHtml}
                            rows={4}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-200">"Animated Images" Snippet</label>
                            <button
                              onClick={() => handleCopySnippet(snippets.animatedHtml, 'animated')}
                              className="text-[#0ea5e9] hover:underline text-xs font-semibold flex items-center gap-1"
                            >
                              {copiedType === 'animated' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedType === 'animated' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <textarea
                            readOnly
                            value={snippets.animatedHtml}
                            rows={4}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-slate-200">"Latest Animations" Snippet</label>
                            <button
                              onClick={() => handleCopySnippet(snippets.videosHtml, 'videos')}
                              className="text-[#0ea5e9] hover:underline text-xs font-semibold flex items-center gap-1"
                            >
                              {copiedType === 'videos' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedType === 'videos' ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <textarea
                            readOnly
                            value={snippets.videosHtml}
                            rows={4}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: How It Works */}
              {activeTab === 'help' && (
                <div className="bg-[#020617] p-8 rounded-2xl border border-white/10 shadow-xl max-w-4xl mx-auto space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <HelpCircle className="w-7 h-7 text-[#0ea5e9]" />
                      <span>How the Sky Creatives Live Auto-Publishing Works</span>
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base">
                      You specifically requested: <strong className="text-[#0ea5e9]">"when i upload, it should go straight to the website i dont want to copy the code and paste it in github"</strong>. Here is exactly how we built this portal to achieve that for you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                      <div className="w-10 h-10 bg-[#0ea5e9]/20 text-[#0ea5e9] rounded-lg flex items-center justify-center font-bold text-lg">
                        1
                      </div>
                      <h4 className="text-lg font-bold text-white">Instant Cloud Sync Mode</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        When you upload an image, it is pushed straight to a live cloud database. Any visitor who opens your website instantly fetches the latest catalog from the cloud. You never have to touch GitHub!
                      </p>
                    </div>

                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                      <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center font-bold text-lg">
                        2
                      </div>
                      <h4 className="text-lg font-bold text-white">GitHub API Direct Push</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        If you prefer your actual GitHub repository files to be updated, the portal connects directly to the official GitHub API. When you upload, it commits and pushes the new code directly to your repo behind the scenes!
                      </p>
                    </div>

                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                      <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-bold text-lg">
                        3
                      </div>
                      <h4 className="text-lg font-bold text-white">Direct Device Uploads</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        You can upload image files directly from your computer, tablet, or phone camera roll. The portal converts them and adds them to your old designs instantly.
                      </p>
                    </div>

                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                      <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold text-lg">
                        4
                      </div>
                      <h4 className="text-lg font-bold text-white">Automatic YouTube Thumbnails</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        When you paste a YouTube link for your 3D animations, our portal extracts the video ID and automatically fetches the official high-quality thumbnail from YouTube.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-xl flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Pro-Tip for Studio Managers</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        You can bookmark this website on your mobile device or tablet. Whenever you finish rendering a new 3D design or branding package, you can upload it here instantly to showcase to clients during meetings!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
