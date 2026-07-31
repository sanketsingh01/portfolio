import { NextResponse } from "next/server";

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const GITHUB_ORIGIN = "https://github.com";
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseContributionMarkup(markup: string): ContributionItem[] {
  const dayRegex =
    /<td\b(?=[^>]*\bdata-date="([^"]+)")(?=[^>]*\bdata-level="([0-4])")(?=[^>]*\bid="([^"]+)")[^>]*><\/td>\s*<tool-tip\b[^>]*\bfor="\3"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  return [...markup.matchAll(dayRegex)].map((match) => {
    const tooltip = match[4].replace(/\s+/g, " ").trim();
    const countMatch = tooltip.match(/^(\d[\d,]*) contribution/);
    const count = countMatch ? Number(countMatch[1].replace(/,/g, "")) : 0;

    return {
      date: match[1],
      count,
      level: Number(match[2]) as ContributionItem["level"],
    };
  });
}

function getDateRange() {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - 1);
  start.setUTCDate(start.getUTCDate() + 1);

  return { start, end };
}

async function fetchContributionYear(username: string, year: number) {
  const params = new URLSearchParams({
    from: `${year}-01-01`,
    to: `${year}-12-31`,
  });

  const response = await fetch(
    `${GITHUB_ORIGIN}/users/${encodeURIComponent(username)}/contributions?${params}`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": "portfolio-contribution-graph",
      },
      next: { revalidate: 60 * 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  return parseContributionMarkup(await response.text());
}

function buildEmptyRange(start: Date, end: Date) {
  const items: ContributionItem[] = [];

  for (let current = start.getTime(); current <= end.getTime(); current += DAY_IN_MS) {
    items.push({
      date: formatDate(new Date(current)),
      count: 0,
      level: 0,
    });
  }

  return items;
}

export async function GET(
  _request: Request,
  context: { params: { username: string } | Promise<{ username: string }> },
) {
  const { username } = await Promise.resolve(context.params);

  if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username)) {
    return NextResponse.json({ error: "Invalid GitHub username" }, { status: 400 });
  }

  const { start, end } = getDateRange();
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  try {
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index,
    );
    const fetched = (await Promise.all(
      years.map((year) => fetchContributionYear(username, year)),
    )).flat();

    const byDate = new Map(fetched.map((item) => [item.date, item]));
    const contributions = buildEmptyRange(start, end).map(
      (item) => byDate.get(item.date) ?? item,
    );
    const totalContributions = contributions.reduce((sum, item) => sum + item.count, 0);

    return NextResponse.json({
      totalContributions,
      contributions,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);

    return NextResponse.json(
      { error: "Could not fetch GitHub contributions" },
      { status: 502 },
    );
  }
}
