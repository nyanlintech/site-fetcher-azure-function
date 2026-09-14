# site-fetcher-azure-function

Azure Function that hits a rotating list of URLs on an hourly cron.

## Why

[Supabase's free tier pauses a project](https://supabase.com/docs/guides/platform/upgrading-to-pro#pausing) after a week of no activity. This function pings the site (which talks to Supabase) once an hour to simulate real traffic, so the backing project never goes idle long enough to get paused.

## How it works

- `src/functions/siteFetcher.js` — timer-triggered function, runs on schedule `0 0 * * * *` (top of every hour, UTC).
- Each run picks one random URL from a list and does a plain `fetch`, logging the response status.
- The URL list comes from the `SITE_URLS` app setting (comma-separated). Falls back to a hardcoded default list in the code if unset.

## Local dev

```bash
npm install
func start
```

## Deploy

```bash
func azure functionapp publish <function-app-name>
```

Update the URL list without redeploying:

```bash
az functionapp config appsettings set \
  --name <function-app-name> \
  --resource-group <resource-group> \
  --settings "SITE_URLS=https://example.com,https://example.org"
```
