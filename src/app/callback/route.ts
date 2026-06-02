import { NextResponse } from "next/server";

/**
 * Spotify OAuth callback placeholder.
 *
 * Refresh tokens must never be generated or displayed by the deployed app.
 * Use `npm run spotify-token` locally to create SPOTIFY_REFRESH_TOKEN.
 */
export async function GET() {
  return new NextResponse(
    htmlPage(
      "Spotify token generation is disabled here. Use the local <code>npm run spotify-token</code> helper instead."
    ),
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

function htmlPage(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Spotify callback disabled</title></head>
<body style="font-family:system-ui; max-width:600px; margin:2rem auto; padding:0 1rem;">
<h1>Spotify callback disabled</h1>
<p>${body}</p>
</body>
</html>`;
}
