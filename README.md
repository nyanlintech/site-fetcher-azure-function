# site-fetcher-azure-function

Azure Function that pings the Supabase Postgres DB on a cron to keep the project from pausing.

## Why

[Supabase's free tier pauses a project](https://supabase.com/docs/guides/platform/free-project-pausing) after a week of no activity. This function runs a trivial query against the DB every 5 minutes to simulate real traffic, so the backing project never goes idle long enough to get paused.

## How it works

- `src/functions/dbKeepWarm.js` — timer-triggered function, runs every 5 minutes (`0 */5 * * * *`).
  - Runs `SELECT 1` directly against Postgres via the `DATABASE_URL` app setting.

## Local dev

```bash
npm install
func start
```

## Deploy

```bash
func azure functionapp publish <function-app-name>
```

Set the DB connection string (same one the backend uses, `postgresql://` form):

```bash
az functionapp config appsettings set \
  --name <function-app-name> \
  --resource-group <resource-group> \
  --settings "DATABASE_URL=postgresql://user:password@host:5432/dbname"
```
