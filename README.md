
## Private submissions dashboard

The waitlist spreadsheet now includes a simplified `Dashboard Data` tab with these columns:

`Submitted | Name | Contact | Interest | Exact item | Status | Notes`

The custom JSX dashboard is available at `/#admin`. It is intentionally not linked in the public navbar. To connect live rows without exposing Google credentials, configure a private read-only JSON endpoint in `.env`:

```bash
VITE_ADMIN_DATA_URL=https://your-private-endpoint.example/data
```

The endpoint should return either an array of rows or `{ "rows": [...] }`, using fields such as `submitted`, `name`, `contact`, `interest`, `item`, and `status`. Do not put OAuth tokens or service-account keys in frontend environment variables.
