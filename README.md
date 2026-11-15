# CALISTHENICS OS — GitHub Pages frontend

This is the real hosted frontend. GitHub Pages serves `index.html`, `css/style.css`, `js/app.js` and `js/config.js`. **No Apps Script HTML files**.

## Setup
1. Upload the contents of this folder to your public GitHub repository root.
2. GitHub Settings > Pages > Deploy from branch > main / root.
3. Deploy the private `.gs` backend from the **separate private ZIP** to Apps Script, run `setupCalisthenicsOS()`, and configure Script Property `BRIDGE_SECRET`.
4. Deploy the Cloudflare Worker in the **third ZIP**. Set Worker secrets `GAS_URL` (Apps Script `/exec` URL), `BRIDGE_SECRET` (same value), and `FRONTEND_ORIGIN` (`https://fazleyabdulaziz-beep.github.io`).
5. Put the public Worker URL in `js/config.js` and commit it. Worker URL is not a secret.
6. Open `https://fazleyabdulaziz-beep.github.io/Calisthenics-OS/`.

## Important
The proxy is required because Google Apps Script ContentService does not support arbitrary browser CORS headers. Do not use a public JSONP workaround for username/password authentication.

**Security caveats:** This is a small-group starter, not a security-audited production service. Apps Script salted SHA-256 is not a slow password KDF; consider an external auth service before a broad public launch. Google Apps Script and Cloudflare free services have limits. The Worker validates browser origins, but Origin is not an authentication mechanism: the private bridge secret protects the backend and user sessions protect user data. Change the default admin password.
