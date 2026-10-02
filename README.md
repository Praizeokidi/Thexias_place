
## Custom waitlist form backend

The prelaunch modal now uses `src/WaitlistForm.jsx` instead of an embedded Google Form. The corresponding Apps Script source is in `backend/Code.gs`.

1. Open the private waitlist spreadsheet and create/open an Apps Script project.
2. Paste the contents of `backend/Code.gs` into `Code.gs`.
3. Deploy it as **Web app** with **Execute as: Me** and access set to **Anyone with the link**.
4. Copy the deployed Web App URL into the deployment environment as:

```bash
VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

5. Redeploy the storefront.

The endpoint writes to the private `Dashboard Data` tab and validates name, contact, interests, and exact item. It never exposes the spreadsheet to the browser. Keep the spreadsheet itself private and do not place OAuth credentials in frontend environment variables.


## End-to-end smoke tests

The Playwright suite covers utility-search dismissal, desktop category navigation, the mobile category accordion, and the product-to-bag checkout handoff. The checkout test checks the WhatsApp recipient and generated item/total message; it does not open WhatsApp or place an order.

Run locally with:

```bash
npm ci
npx playwright install chromium
npm run test:e2e
```

The command starts a local Vite server automatically. GitHub Actions runs the same suite for pull requests and pushes to `main`.
