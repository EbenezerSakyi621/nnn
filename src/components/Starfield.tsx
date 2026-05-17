import React, { useEffect, useRef } from 'react';

export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      z: number;
    }

    const stars: Star[] = [];
    const numStars = 400;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = '#000814';
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= 2;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }

        const k = 128.0 / star.z;
        const px = (star.x - width / 2) * k + width / 2;
        const py = (star.y - height / 2) * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3;
          ctx.fillStyle = 'white';
          ctx.fillRect(px, py, size, size);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#000814' }}
    />
  );
};
