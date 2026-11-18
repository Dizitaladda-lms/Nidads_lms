# Lead delivery

Configure these server-side environment variables in `.env.local` and in the deployment environment:

```env
CRM_API_URL="https://your-crm-lead-endpoint"
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/your-deployment-id/exec"
```

Deploy the Google Apps Script as a web app and use its `/exec` URL. Keep both URLs server-side; do not prefix them with `NEXT_PUBLIC_`.

The enquiry API sends each lead to every configured destination. Delivery to one destination is enough for the submission to succeed, so the other destination acts as a fallback if it is unavailable. If both are unavailable or reject the lead, the API returns an error and the form can be retried. Each destination request times out after 10 seconds.
