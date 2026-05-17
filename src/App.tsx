import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinemaLoader } from './components/CinemaLoader';
import { Starfield } from './components/Starfield';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { ContactFooter } from './components/ContactFooter';
import { Modal } from './components/Modal';
import { AdminPortal } from './components/AdminPortal';
import { mediaStore } from './data/mediaStore';
import { DesignItem, VideoItem } from './data/initialData';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState<string | null>(null);

  // Catalog State
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [animated, setAnimated] = useState<DesignItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const loadCatalog = () => {
    setDesigns(mediaStore.getDesigns());
    setAnimated(mediaStore.getAnimated());
    setVideos(mediaStore.getVideos());
  };

  useEffect(() => {
    // 1. Initial local load for instant rendering
    loadCatalog();

    // 2. Pull latest from live Cloud / JSONBin asynchronously
    mediaStore.fetchLatestFromLive().then((updated) => {
      if (updated) {
        loadCatalog();
      }
    });

    // 3. Listen for live publishing sync events
    const handleSync = () => {
      loadCatalog();
    };
    window.addEventListener('sky_creatives_cloud_sync', handleSync);
    return () => window.removeEventListener('sky_creatives_cloud_sync', handleSync);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-[#0ea5e9] selection:text-white">
      {/* Cinematic Intro Loader */}
      <CinemaLoader />

      {/* IMAX 3D Starfield Background */}
      <Starfield />

      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Hero Section */}
      <Hero />

      {/* Portfolio Section 1: Our Designs */}
      <GallerySection
        id="portfolio"
        title="Our Designs"
        items={designs}
        onSelectImg={(url) => setSelectedImgUrl(url)}
      />

      {/* Portfolio Section 2: Animated Images */}
      <GallerySection
        title="Animated Images"
        items={animated}
        onSelectImg={(url) => setSelectedImgUrl(url)}
      />

      {/* Videos Section: Latest Animations */}
      <VideoSection items={videos} />

      {/* Contact Section & Footer */}
      <ContactFooter />

      {/* Fullscreen Image Modal */}
      <Modal
        imgUrl={selectedImgUrl}
        onClose={() => setSelectedImgUrl(null)}
      />

      {/* Admin Portal / Dashboard */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onUpdateCatalog={loadCatalog}
        isLoggedIn={isAdminLoggedIn}
        setIsLoggedIn={setIsAdminLoggedIn}
      />
    </div>
  );
};

export default App;
