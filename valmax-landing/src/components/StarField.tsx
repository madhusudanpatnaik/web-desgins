import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface StarFieldProps {
  count?: number;
  className?: string;
  ring?: boolean;
  ringCount?: number;
  ringRadiusFactor?: number;
  ringBandWidth?: number;
}

// Simple Box-Muller transform for normal distribution
function randomGaussian(mean = 0, stdev = 1) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

export const StarField: React.FC<StarFieldProps> = ({
  count = 600,
  className = "absolute inset-0 pointer-events-none",
  ring = false,
  ringCount = 240,
  ringRadiusFactor = 0.36,
  ringBandWidth = 52,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bgStars: any[] = [];
    let ringStars: any[] = [];

    const buildStars = (width: number, height: number) => {
      bgStars = [];
      for (let i = 0; i < count; i++) {
        const p = Math.random();
        let r = 0;
        if (p < 0.65) r = 0.25 + Math.random() * 0.25;
        else if (p < 0.92) r = 0.50 + Math.random() * 0.30;
        else r = 0.80 + Math.random() * 0.50;

        bgStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          opacity: 0.2 + Math.random() * 0.75,
          speed: 0.4 + Math.random() * 1.2,
          offset: Math.random() * Math.PI * 2,
        });
      }

      if (ring) {
        ringStars = [];
        const cx = width / 2;
        const cy = height / 2;
        const ringR = Math.min(width, height) * ringRadiusFactor;
        const half = ringBandWidth / 2;

        for (let i = 0; i < ringCount * 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radialOffset = randomGaussian(0, half * 0.65);
          const dist = ringR + radialOffset;

          const p = Math.random();
          let r = 0;
          if (p < 0.70) r = 0.15 + Math.random() * 0.15;
          else if (p < 0.93) r = 0.30 + Math.random() * 0.20;
          else r = 0.50 + Math.random() * 0.20;

          ringStars.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            r,
            opacity: 0.25 + Math.random() * 0.55,
            speed: 0.3 + Math.random() * 1.0,
            offset: Math.random() * Math.PI * 2,
            radialOffset,
          });
        }
      }
    };

    const draw = (t: number) => {
      const time = t * 0.001;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw BG stars
      for (const star of bgStars) {
        const alpha = star.opacity * (0.55 + 0.45 * Math.sin(time * star.speed + star.offset) * 0.5 + 0.5);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (star.r > 1.1) {
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 4);
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Draw Ring
      if (ring) {
        const cx = w / 2;
        const cy = h / 2;
        const ringR = Math.min(w, h) * ringRadiusFactor;

        // Halo
        const haloGrad = ctx.createRadialGradient(cx, cy, Math.max(0, ringR - ringBandWidth * 4), cx, cy, ringR + ringBandWidth * 4);
        haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        haloGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0.022)');
        haloGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.038)');
        haloGrad.addColorStop(0.58, 'rgba(255, 255, 255, 0.022)');
        haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(cx, cy, ringR + ringBandWidth * 4, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Ring stars
        for (const star of ringStars) {
          const twinkle = 0.55 + 0.45 * Math.sin(time * star.speed + star.offset) * 0.5 + 0.5;
          const falloff = Math.max(0.15, 1 - Math.abs(star.radialOffset) / (ringBandWidth * 0.65));
          const alpha = star.opacity * twinkle * falloff;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          if (star.r > 1.0) {
            const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 5);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * 5, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === canvas.parentElement) {
          const { width, height } = entry.contentRect;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
          buildStars(width, height);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [count, ring, ringCount, ringRadiusFactor, ringBandWidth]);

  return <canvas ref={canvasRef} className={cn(className, "block w-full h-full")} style={{ zIndex: 0 }} />;
};
