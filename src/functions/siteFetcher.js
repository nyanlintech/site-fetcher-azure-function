const { app } = require("@azure/functions");

const DEFAULT_URLS = [
  "https://clinicians-semantic-search.pages.dev/?q=ADHD+specialist&q=works+with+adults",
  "https://clinicians-semantic-search.pages.dev/?q=late+diagnosed+ADHD",
  "https://clinicians-semantic-search.pages.dev/?q=immigrant+experience",
  "https://clinicians-semantic-search.pages.dev/?q=Chronic+Pain+or+Illness",
];

function getUrls() {
  const raw = process.env.SITE_URLS;
  if (!raw) return DEFAULT_URLS;
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

app.timer("siteFetcher", {
  schedule: "0 0 * * * *",
  handler: async (myTimer, context) => {
    const urls = getUrls();
    const url = urls[Math.floor(Math.random() * urls.length)];
    context.log(`Fetching: ${url}`);
    try {
      const res = await fetch(url);
      context.log(`Response: ${res.status} ${res.statusText}`);
    } catch (err) {
      context.error(`Fetch failed for ${url}: ${err.message}`);
    }
  },
});
