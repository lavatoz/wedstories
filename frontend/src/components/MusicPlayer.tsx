import { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import type { MusicData } from '../types';
import { getFile } from '../utils/indexedDb';

interface MusicPlayerProps {
  music?: MusicData;
}

export default function MusicPlayer({ music }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    
    const loadAudio = async () => {
      if (music?.enabled) {
        if (music.url) {
          setAudioUrl(music.url);
        } else if (music.audioId) {
          try {
            const file = await getFile(music.audioId);
            if (file) {
              objectUrl = URL.createObjectURL(file);
              setAudioUrl(objectUrl);
            }
          } catch (e) {
            console.error("Failed to load audio from IndexedDB:", e);
          }
        }
      } else {
        setAudioUrl(null);
        setIsPlaying(false);
      }
    };

    loadAudio();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [music?.enabled, music?.audioId]);

  useEffect(() => {
    if (audioRef.current && music?.volume !== undefined) {
      audioRef.current.volume = isMuted ? 0 : music.volume;
    }
  }, [music?.volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  if (!music?.enabled || !audioUrl) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button 
        onClick={togglePlay}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
          ${isPlaying ? 'bg-[var(--color-wed-gold)] text-white scale-100' : 'bg-white text-[var(--color-wed-gold)] scale-90 hover:scale-100'}
        `}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <div className="relative">
            <Pause size={24} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 flex gap-0.5 h-3">
              <span className="w-0.5 bg-white animate-[bounce_1s_infinite] rounded-full"></span>
              <span className="w-0.5 bg-white animate-[bounce_1.2s_infinite] rounded-full" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-0.5 bg-white animate-[bounce_0.8s_infinite] rounded-full" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        ) : (
          <Music size={24} />
        )}
      </button>
    </>
  );
}
