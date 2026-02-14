#!/usr/bin/env node
/**
 * One-time script to get your Spotify refresh token.
 *
 * 1. Add http://localhost:3001/callback to your Spotify app Redirect URIs:
 *    https://developer.spotify.com/dashboard → Your App → Settings → Redirect URIs
 *
 * 2. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env (no refresh token yet).
 *
 * 3. Run: node scripts/get-spotify-refresh-token.mjs
 *
 * 4. Open http://localhost:3001 in your browser, log in with Spotify, then copy
 *    the refresh token into .env as SPOTIFY_REFRESH_TOKEN.
 *
 * 5. Remove http://localhost:3001/callback from Redirect URIs if you want.
 */

import http from "http";
import https from "https";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const possibleEnvPaths = [
  join(process.cwd(), ".env"),
  join(process.cwd(), ".env.local"),
  join(__dirname, "..", ".env"),
  join(__dirname, "..", ".env.local"),
];

function loadEnv() {
  const env = {};
  let envPath = null;
  for (const p of possibleEnvPaths) {
    if (existsSync(p)) {
      envPath = p;
      break;
    }
  }
  if (!envPath) {
    console.error("No .env file found. Tried:", possibleEnvPaths.join(", "));
    return env;
  }
  let content = readFileSync(envPath, "utf8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (const line of content.split("\n")) {
    const raw = line.trim();
    if (!raw || raw.startsWith("#")) continue;
    const lineWithoutExport = raw.replace(/^export\s+/i, "");
    const m = lineWithoutExport.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      env[m[1]] = val;
    }
  }
  return env;
}

const env = loadEnv();
const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const PORT = 3001;
const redirectUri = `https://www.tsxsanket.in/callback`;
const scopes = ["user-read-currently-playing", "user-read-recently-played"].join(" ");

if (!clientId || !clientSecret) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env");
  const hasId = !!env.SPOTIFY_CLIENT_ID;
  const hasSecret = !!env.SPOTIFY_CLIENT_SECRET;
  console.error(`  SPOTIFY_CLIENT_ID present: ${hasId}`);
  console.error(`  SPOTIFY_CLIENT_SECRET present: ${hasSecret}`);
  console.error("  Use exact names (no extra spaces). .env should be in the project root.");
  process.exit(1);
}

function exchangeCode(code) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }).toString();
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const req = https.request(
      {
        hostname: "accounts.spotify.com",
        path: "/api/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(data || res.statusCode));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  if (url.pathname === "/") {
    const authUrl =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: scopes,
      }).toString();
    res.writeHead(302, { Location: authUrl });
    res.end();
    return;
  }

  if (url.pathname === "/callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<p>Missing <code>code</code> from Spotify. Try again from <a href='/'>/</a>.</p>"
      );
      return;
    }
    try {
      const tokens = await exchangeCode(code);
      const refreshToken = tokens.refresh_token;
      if (!refreshToken) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          "<p>Spotify did not return a refresh_token. Check your app settings and try again.</p>"
        );
        return;
      }
      console.log("\nRefresh token (add this to .env as SPOTIFY_REFRESH_TOKEN):\n");
      console.log(refreshToken);
      console.log("");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Spotify refresh token</title></head>
<body style="font-family: system-ui; max-width: 600px; margin: 2rem auto; padding: 0 1rem;">
  <h1>Refresh token</h1>
  <p>Add this to your <code>.env</code> as <code>SPOTIFY_REFRESH_TOKEN=...</code></p>
  <textarea readonly style="width:100%; height: 80px; font-family: monospace;">${refreshToken}</textarea>
  <p>You can close this tab and stop the script (Ctrl+C).</p>
</body>
</html>`);
      server.close();
    } catch (err) {
      console.error(err);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<p>Error: ${err.message}</p>`);
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT} and log in with Spotify.`);
  console.log(`(Add http://localhost:${PORT}/callback to your app Redirect URIs first.)\n`);
});
