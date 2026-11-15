# Cloudflare Worker API proxy

Deploy `worker.js` to Cloudflare Workers (free tier subject to quotas).

Set three Worker environment **secrets/variables** (never in GitHub):
- `GAS_URL` = deployed Google Apps Script Web App URL ending `/exec`
- `BRIDGE_SECRET` = exactly the same long random secret as Apps Script Script Properties
- `FRONTEND_ORIGIN` = `https://fazleyabdulaziz-beep.github.io` (no trailing slash)

Deploy the Worker, then copy its public HTTPS URL to the GitHub frontend `js/config.js`.

Apps Script's JSON responses can redirect to googleusercontent.com; the Worker follows the redirect server-side. Test registration, login, and routines before sharing publicly.
