import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_SRC = "https://stream.mux.com/rfmAy41mljxrk4K28xbeP6bt7UOMsf6d6Ce7C7Ul4vs.m3u8";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Imperative attributes for iOS and autoplay reliability
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    let hls: Hls | null = null;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn("Video play blocked", error);
      }
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      video.src = VIDEO_SRC;
      video.addEventListener("loadedmetadata", playVideo);
    } else if (Hls.isSupported()) {
      // Use HLS.js for non-native browsers
      hls = new Hls({ enableWorker: true });
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
    } else {
      // Fallback
      video.src = VIDEO_SRC;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener("loadedmetadata", playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
