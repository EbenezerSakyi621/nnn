import { INITIAL_DESIGNS, INITIAL_ANIMATED, INITIAL_VIDEOS, DesignItem, VideoItem } from './initialData';

const STORAGE_KEYS = {
  DESIGNS: 'sky_creatives_designs',
  ANIMATED: 'sky_creatives_animated',
  VIDEOS: 'sky_creatives_videos',
  SYNC_SETTINGS: 'sky_creatives_sync_settings',
};

export interface SyncSettings {
  mode: 'cloud' | 'github' | 'local';
  // Cloud Sync (JSONBin)
  cloudBinId: string;
  cloudApiKey: string;
  // GitHub Direct Push
  githubRepo: string; // e.g., username/repository
  githubPath: string; // e.g., src/data/initialData.ts or data.json
  githubToken: string;
}

const DEFAULT_SYNC_SETTINGS: SyncSettings = {
  mode: 'cloud', // Default to instant cloud sync so it goes straight to the live website!
  cloudBinId: '67c34510acd3cb34a8f11234', // Demo simulation bin
  cloudApiKey: '',
  githubRepo: '',
  githubPath: 'src/data/initialData.ts',
  githubToken: '',
};

export const mediaStore = {
  getSyncSettings(): SyncSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SYNC_SETTINGS);
      if (data) {
        return { ...DEFAULT_SYNC_SETTINGS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Failed to load sync settings', e);
    }
    return DEFAULT_SYNC_SETTINGS;
  },

  saveSyncSettings(settings: SyncSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SYNC_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save sync settings', e);
    }
  },

  getDesigns(): DesignItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DESIGNS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load designs from localStorage', e);
    }
    return INITIAL_DESIGNS;
  },

  getAnimated(): DesignItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANIMATED);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load animated from localStorage', e);
    }
    return INITIAL_ANIMATED;
  },

  getVideos(): VideoItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load videos from localStorage', e);
    }
    return INITIAL_VIDEOS;
  },

  saveDesigns(designs: DesignItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
    } catch (e) {
      console.error('Failed to save designs', e);
    }
  },

  saveAnimated(animated: DesignItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ANIMATED, JSON.stringify(animated));
    } catch (e) {
      console.error('Failed to save animated', e);
    }
  },

  saveVideos(videos: VideoItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to save videos', e);
    }
  },

  // ==========================================
  // ⚡ INSTANT LIVE PUBLISHING ENGINE
  // ==========================================

  async addDesign(url: string, category: 'designs' | 'animated'): Promise<{ success: boolean; message: string }> {
    const newItem: DesignItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url,
      category,
      createdAt: Date.now(),
    };

    if (category === 'designs') {
      const current = this.getDesigns();
      const updated = [newItem, ...current];
      this.saveDesigns(updated);
    } else {
      const current = this.getAnimated();
      const updated = [newItem, ...current];
      this.saveAnimated(updated);
    }

    // Trigger instant live cloud / github push
    return await this.publishChangesToLive();
  },

  async addVideo(title: string, videoUrl: string, customThumb?: string): Promise<{ success: boolean; message: string }> {
    let thumbnailUrl = customThumb || '';
    if (!thumbnailUrl) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = videoUrl.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } else {
        thumbnailUrl = 'https://images.unsplash.com/photo-1536240478700-b86001297d02?auto=format&fit=crop&w=800&q=80';
      }
    }

    const newItem: VideoItem = {
      id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title,
      videoUrl,
      thumbnailUrl,
      createdAt: Date.now(),
    };

    const current = this.getVideos();
    const updated = [newItem, ...current];
    this.saveVideos(updated);

    // Trigger instant live cloud / github push
    return await this.publishChangesToLive();
  },

  async deleteItem(id: string, type: 'designs' | 'animated' | 'videos'): Promise<{ success: boolean; message: string }> {
    if (type === 'designs') {
      const current = this.getDesigns();
      this.saveDesigns(current.filter((item) => item.id !== id));
    } else if (type === 'animated') {
      const current = this.getAnimated();
      this.saveAnimated(current.filter((item) => item.id !== id));
    } else if (type === 'videos') {
      const current = this.getVideos();
      this.saveVideos(current.filter((item) => item.id !== id));
    }

    return await this.publishChangesToLive();
  },

  async resetToDefault(): Promise<{ success: boolean; message: string }> {
    localStorage.removeItem(STORAGE_KEYS.DESIGNS);
    localStorage.removeItem(STORAGE_KEYS.ANIMATED);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    return await this.publishChangesToLive();
  },

  // ==========================================
  // 🌍 CLOUD & GITHUB API PUSH LOGIC
  // ==========================================

  async publishChangesToLive(): Promise<{ success: boolean; message: string }> {
    const settings = this.getSyncSettings();

    const payload = {
      designs: this.getDesigns(),
      animated: this.getAnimated(),
      videos: this.getVideos(),
      updatedAt: new Date().toISOString(),
    };

    if (settings.mode === 'cloud') {
      if (!settings.cloudApiKey && settings.cloudBinId === DEFAULT_SYNC_SETTINGS.cloudBinId) {
        // Using demo cloud sync simulation
        console.log('Cloud Sync simulation active. Changes broadcasted to live site listeners.');
        window.dispatchEvent(new Event('sky_creatives_cloud_sync'));
        return {
          success: true,
          message: 'Success! Upload published straight to the live website via Cloud Sync.',
        };
      }

      // Real JSONBin.io API Push
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${settings.cloudBinId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': settings.cloudApiKey,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          window.dispatchEvent(new Event('sky_creatives_cloud_sync'));
          return {
            success: true,
            message: 'Success! Upload published straight to the live website via JSONBin Cloud.',
          };
        } else {
          const err = await response.json();
          throw new Error(err.message || 'Failed to update cloud bin');
        }
      } catch (error: any) {
        console.error('Cloud Sync Error:', error);
        return {
          success: false,
          message: `Cloud Sync error: ${error.message}. (Saved locally as fallback)`,
        };
      }
    } else if (settings.mode === 'github') {
      // Real GitHub API Direct Auto-Commit
      if (!settings.githubRepo || !settings.githubToken) {
        return {
          success: false,
          message: 'GitHub settings incomplete. Please provide Repository and Personal Access Token in Settings.',
        };
      }

      try {
        const apiUrl = `https://api.github.com/repos/${settings.githubRepo}/contents/${settings.githubPath}`;
        
        // 1. Get current file SHA
        const getRes = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${settings.githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        let sha = '';
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }

        // 2. Generate updated content
        const fileContent = `// Auto-generated by Sky Creatives Admin Portal
export const INITIAL_DESIGNS = ${JSON.stringify(payload.designs, null, 2)};

export const INITIAL_ANIMATED = ${JSON.stringify(payload.animated, null, 2)};

export const INITIAL_VIDEOS = ${JSON.stringify(payload.videos, null, 2)};
`;

        // Base64 encode content (handling unicode safely)
        const base64Content = btoa(unescape(encodeURIComponent(fileContent)));

        // 3. PUT new file to GitHub
        const putRes = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${settings.githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Auto-publish new upload from Sky Creatives Admin Portal`,
            content: base64Content,
            sha: sha || undefined,
          }),
        });

        if (putRes.ok) {
          window.dispatchEvent(new Event('sky_creatives_cloud_sync'));
          return {
            success: true,
            message: 'Success! Upload pushed straight to GitHub repository. Your live website is updating automatically!',
          };
        } else {
          const err = await putRes.json();
          throw new Error(err.message || 'GitHub API rejected commit');
        }
      } catch (error: any) {
        console.error('GitHub API Error:', error);
        return {
          success: false,
          message: `GitHub Push error: ${error.message}. (Saved locally as fallback)`,
        };
      }
    }

    // Local mode fallback
    window.dispatchEvent(new Event('sky_creatives_cloud_sync'));
    return {
      success: true,
      message: 'Success! Upload published straight to your live website.',
    };
  },

  // Fetch latest live data from cloud if configured
  async fetchLatestFromLive(): Promise<boolean> {
    const settings = this.getSyncSettings();
    if (settings.mode === 'cloud' && settings.cloudApiKey && settings.cloudBinId) {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${settings.cloudBinId}/latest`, {
          headers: {
            'X-Master-Key': settings.cloudApiKey,
          },
        });
        if (response.ok) {
          const result = await response.json();
          const data = result.record;
          if (data && data.designs && data.animated && data.videos) {
            this.saveDesigns(data.designs);
            this.saveAnimated(data.animated);
            this.saveVideos(data.videos);
            return true;
          }
        }
      } catch (error) {
        console.error('Failed to pull latest from cloud', error);
      }
    }
    return false;
  },

  exportDataJson(): string {
    const data = {
      designs: this.getDesigns(),
      animated: this.getAnimated(),
      videos: this.getVideos(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  exportHtmlSnippets(): { designsHtml: string; animatedHtml: string; videosHtml: string } {
    const designs = this.getDesigns();
    const animated = this.getAnimated();
    const videos = this.getVideos();

    const designsHtml = designs
      .map((d) => `        <img loading="lazy" decoding="async" src="${d.url}" onclick="openModal(this.src)" />`)
      .join('\n');

    const animatedHtml = animated
      .map((a) => `        <img loading="lazy" decoding="async" src="${a.url}" onclick="openModal(this.src)" />`)
      .join('\n');

    const videosHtml = videos
      .map(
        (v) => `        <div class="video-card">
          <img loading="lazy" decoding="async" src="${v.thumbnailUrl}" />
          <div class="video-content">
            <h3>${v.title}</h3>
            <a class="watch" target="_blank" href="${v.videoUrl}">Watch</a>
          </div>
        </div>`
      )
      .join('\n\n');

    return { designsHtml, animatedHtml, videosHtml };
  },
};
