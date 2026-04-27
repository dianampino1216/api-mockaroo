# api-mockaroo

Mock REST API deployed on Vercel. Serves static JSON data for events, leads, and programs.

## Endpoints

| Method | Path            | Description            |
|--------|-----------------|------------------------|
| GET    | `/api/events`   | Returns all events     |
| GET    | `/api/leads`    | Returns all leads      |
| GET    | `/api/programs` | Returns all programs   |

## Authentication

The API is protected by an `API_KEY` environment variable. Every request must include the key in the `X-Api-Key` header.

```
X-Api-Key: the-secret-key
```

If `API_KEY` is not set, the API is open (useful for local development).

### Setting the key in Vercel

1. Go to the project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Navigate to **Settings → Environment Variables**.
3. Add `API_KEY` with the secret value and save.
4. Redeploy for the change to take effect.

## Usage

```bash
# Without auth (API_KEY not set)
curl https://api-mockaroo.vercel.app/api/events

# With auth
curl https://api-mockaroo.vercel.app/api/events \
  -H "X-Api-Key: the-secret-key"
```

## Error responses

| Status | Meaning                              |
|--------|--------------------------------------|
| 401    | Missing or invalid `X-Api-Key`       |
| 405    | HTTP method not allowed (only GET)   |
| 500    | Failed to load the JSON data file    |

## Local development

```bash
npm i -g vercel
vercel dev
```

Optionally set the key locally:

```bash
API_KEY=the-secret-key vercel dev
```
