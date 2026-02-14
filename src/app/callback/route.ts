import { NextRequest, NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

/**
 * Spotify OAuth callback. Exchange the authorization code for tokens.
 * Redirect URI in Spotify dashboard must match SPOTIFY_REDIRECT_URI (e.g. https://www.tsxsanket.in/callback).
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const errorParam = request.nextUrl.searchParams.get("error");

  if (errorParam) {
    return new NextResponse(htmlPage(`Spotify denied access: ${errorParam}`), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (!code) {
    return new NextResponse(
      htmlPage(
        "Missing <code>code</code>. Visit your Spotify authorize URL first, then you will be redirected here with a code."
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI || "https://www.tsxsanket.in/callback";

  if (!clientId || !clientSecret) {
    return new NextResponse(
      htmlPage("Server: SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not set in .env"),
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  }).toString();

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  const refreshToken = data.refresh_token;

  if (!res.ok || !refreshToken) {
    const msg = data.error_description || data.error || res.statusText || "Token exchange failed";
    return new NextResponse(
      htmlPage(`Could not get refresh token: ${msg}. Check that SPOTIFY_REDIRECT_URI matches the redirect URI in your Spotify app.`),
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  return new NextResponse(
    htmlPage(
      `
  <h1>Refresh token</h1>
  <p>Add this to your <code>.env</code> as <code>SPOTIFY_REFRESH_TOKEN=...</code></p>
  <textarea id="t" readonly style="width:100%; height:80px; font-family:monospace;">${refreshToken}</textarea>
  <p><button onclick="navigator.clipboard.writeText(document.getElementById('t').value)">Copy</button></p>
  <p>You can close this tab after copying. Do not share this token.</p>
`,
      false
    ),
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

function htmlPage(body: string, wrap = true): string {
  const content = wrap
    ? `<h1>Spotify callback</h1><p>${body}</p>`
    : body;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Spotify callback</title></head>
<body style="font-family:system-ui; max-width:600px; margin:2rem auto; padding:0 1rem;">
${content}
</body>
</html>`;
}
