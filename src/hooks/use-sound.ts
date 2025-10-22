"use client";

import { useState, useEffect, useCallback } from 'react';

export function useSound(soundUrl: string, volume: number = 1.0) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio is a browser-only API
    const audioInstance = new Audio(soundUrl);
    audioInstance.volume = volume;
    setAudio(audioInstance);

    return () => {
      // Cleanup audio instance
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = '';
      }
    };
  }, [soundUrl, volume]);

  const play = useCallback(() => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Autoplay was prevented.
        console.error("Audio play failed:", error);
      });
    }
  }, [audio]);

  return play;
}
