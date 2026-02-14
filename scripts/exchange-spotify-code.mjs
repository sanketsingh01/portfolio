#!/usr/bin/env node
/**
 * One-off: exchange a Spotify authorization code for a refresh token.
 * Use when you were redirected to https://www.tsxsanket.in/callback?code=...
 *
 * 1. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI in .env
 *    (SPOTIFY_REDIRECT_URI must match the redirect URI used when getting the code, e.g. https://www.tsxsanket.in/callback)
 *
 * 2. Run: node scripts/exchange-spotify-code.mjs "PASTE_CODE_HERE"
 *    Or:   npm run spotify-exchange -- "PASTE_CODE_HERE"
 */

import https from "https";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const possibleEnvPaths = [
  join(process.cwd(), ".env"),
  join(process.cwd(), ".env.local"),
  join(__dirname, "..", ".env"),
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
    console.error("No .env file found.");
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

const code = process.argv[2];
if (!code) {
  console.error("Usage: node scripts/exchange-spotify-code.mjs \"YOUR_CODE_FROM_CALLBACK_URL\"");
  process.exit(1);
}

const env = loadEnv();
const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const redirectUri = env.SPOTIFY_REDIRECT_URI || "https://www.tsxsanket.in/callback";

if (!clientId || !clientSecret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env");
  process.exit(1);
}

const body = new URLSearchParams({
  grant_type: "authorization_code",
  code: code.trim(),
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
        const json = JSON.parse(data);
        if (json.refresh_token) {
          console.log("\nAdd this to .env as SPOTIFY_REFRESH_TOKEN=\n");
          console.log(json.refresh_token);
          console.log("");
          return;
        }
        console.error("Response:", json.error_description || json.error || data);
      } catch {
        console.error("Response:", data);
      }
      process.exit(1);
    });
  }
);
req.on("error", (e) => {
  console.error(e);
  process.exit(1);
});
req.write(body);
req.end();
