"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type SpotifyTrack = {
  name: string;
  artists: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
};

const REFRESH_MS = 30_000; // 30 seconds

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSpotify = React.useCallback(async () => {
    try {
      const res = await fetch("/api/spotify");
      if (!res.ok) {
        setTrack(null);
        setError(res.status === 503);
        return;
      }
      const data: SpotifyTrack = await res.json();
      setTrack(data);
      setError(false);
    } catch {
      setTrack(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpotify();
    const id = setInterval(fetchSpotify, REFRESH_MS);
    return () => clearInterval(id);
  }, [fetchSpotify]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-black/5 dark:bg-white/5 animate-pulse">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-foreground/10 shrink-0" />
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <div className="h-4 w-24 rounded bg-foreground/10" />
          <div className="h-3 w-32 rounded bg-foreground/10" />
        </div>
      </div>
    );
  }

  if (error || !track) {
    return null;
  }

  const label = track.isPlaying ? "Now playing" : "Recently played";

  return (
    <div className="mb-1 sm:mb-2">
      <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-foreground/60 flex gap-2">
        <img src="/assets/spotify.svg" width="14" height="14" alt="Spotify" />
        <strong>{label}</strong>
      </p>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-colors bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
      >
        {track.albumArt ? (
          <Image
            src={track.albumArt}
            alt={track.name}
            width={56}
            height={56}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg shrink-0"
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-foreground/10 shrink-0" />
        )}
        <div className="flex flex-col min-w-0 gap-0.5">
          <span className="text-sm sm:text-base font-medium text-foreground truncate">
            {track.name}
          </span>
          <span className="text-sx sm:text-xs text-foreground/60 truncate">
            {track.artists}
          </span>
        </div>
      </a>
    </div>
  );
}
