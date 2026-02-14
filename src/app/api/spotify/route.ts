import { NextResponse } from "next/server";

// Requires SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.
// In production, set these in your host's environment (e.g. Vercel → Project → Settings → Environment Variables).

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type SpotifyTrack = {
  name: string;
  artists: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
};

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

function trackFromItem(item: {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}, isPlaying: boolean): SpotifyTrack {
  return {
    name: item.name,
    artists: item.artists.map((a) => a.name).join(", "),
    albumArt: item.album?.images?.[0]?.url ?? "",
    url: item.external_urls?.spotify ?? "",
    isPlaying,
  };
}

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: "Spotify not configured" },
      { status: 503 }
    );
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Try currently playing first (204 = nothing playing, no body)
  const nowRes = await fetch(SPOTIFY_NOW_PLAYING, {
    headers,
    cache: "no-store",
  });

  if (nowRes.status === 200) {
    try {
      const data = await nowRes.json();
      if (data?.item) {
        return NextResponse.json(
          trackFromItem(data.item, data.is_playing ?? false),
          { status: 200 }
        );
      }
    } catch {
      // fall through to recently played
    }
  }
  // 204 No Content or no item → fallback to recently played

  // Fallback: recently played
  const recentRes = await fetch(SPOTIFY_RECENTLY_PLAYED, {
    headers,
    cache: "no-store",
  });

  if (!recentRes.ok) {
    return NextResponse.json(
      { error: "Could not fetch Spotify data" },
      { status: 502 }
    );
  }

  let recentData: { items?: { track?: Parameters<typeof trackFromItem>[0] }[] };
  try {
    recentData = await recentRes.json();
  } catch {
    return NextResponse.json(
      { error: "Could not fetch Spotify data" },
      { status: 502 }
    );
  }

  const first = recentData?.items?.[0]?.track;
  if (first) {
    return NextResponse.json(
      trackFromItem(first, false),
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: "No recent tracks" },
    { status: 404 }
  );
}
