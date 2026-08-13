# WhatsApp Automation — Avani Enterprises

Meta WhatsApp Cloud API automation running inside the **existing** Avani backend.
No new server, no new hosting cost, no new npm dependency.

When a customer messages or calls the business WhatsApp number, the backend
replies, sends the company/services catalogue PDF, and answers questions about
what Avani does.

---

## 1. Where this lives

```
Customer
  ↓ WhatsApp
Meta Cloud API
  ↓ webhook (HTTPS POST)
Render  ·  Avani-enterprises-backend-pure-bc  ·  /api/webhooks/whatsapp
  ↓
services/whatsapp/*  →  Graph API  →  Customer
```

The public site (Vercel) and admin panel (Vercel) are **untouched**. The webhook
must be a public HTTPS URL that Meta can reach, which the Vercel frontends are
not suited to — the Render backend already is.

### Files

| File | Role |
|---|---|
| `routes/whatsapp.js` | Webhook: GET verification, POST intake, signature check |
| `routes/whatsappAdmin.js` | Admin API (JWT-protected): settings, catalogue upload, test sends |
| `services/whatsapp/config.js` | Environment reading, phone masking, readiness reporting |
| `services/whatsapp/whatsappClient.js` | The only module that calls Meta's Graph API |
| `services/whatsapp/inboundMessage.js` | Incoming message → reply + catalogue |
| `services/whatsapp/inboundCall.js` | Incoming WhatsApp call → reply + catalogue |
| `services/whatsapp/queryProcessor.js` | `processCustomerQuery(message, context)` |
| `services/whatsapp/aiService.js` | `generateResponse(message, context)` — provider abstraction |
| `services/whatsapp/knowledgeBase.js` | Business content: services, FAQs, copy |
| `services/whatsapp/catalogue.js` | Resolves the PDF + resend policy |
| `services/whatsapp/idempotency.js` | Duplicate-webhook protection |
| `models/WhatsAppContact.js` | Who has messaged us, and whether they have the catalogue |
| `models/WhatsAppEvent.js` | Processed event ids (TTL 3 days) |
| `models/WhatsAppSetting.js` | Admin overrides (catalogue URL, copy, kill switches) |

Two lines were added to `index.js` to mount the routers, plus the `/api/health`
route. Nothing existing was changed.

### Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/webhooks/whatsapp` | verify token | Meta subscription handshake |
| `POST` | `/api/webhooks/whatsapp` | app-secret signature | Event intake |
| `GET` | `/api/webhooks/whatsapp/status` | public | Booleans: what is configured |
| `GET` | `/api/health` | public | `{"status":"ok","service":"avani-whatsapp"}` + readiness |
| `GET/PUT` | `/admin/whatsapp/settings` | JWT | Read / change settings |
| `POST` | `/admin/whatsapp/catalogue` | JWT | Upload a new catalogue PDF |
| `POST` | `/admin/whatsapp/test-message` | JWT | Send a test text |
| `POST` | `/admin/whatsapp/test-catalogue` | JWT | Send greeting + catalogue |
| `POST` | `/admin/whatsapp/preview-reply` | JWT | Dry-run the reply engine, sends nothing |
| `GET` | `/admin/whatsapp/contacts` | JWT | Conversation list |
| `GET/POST` | `/admin/whatsapp/calling` | JWT | Read / enable WhatsApp calling |
| `POST` | `/admin/whatsapp/refresh` | JWT | Clear settings + knowledge caches |

---

## 2. Environment variables

Full annotated list: [`.env.example`](.env.example). **You add these yourself** —
locally in `.env`, and on Render in Environment. Nothing is hardcoded.

**Minimum to receive messages:**

```
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_VERIFY_TOKEN=
META_GRAPH_API_VERSION=v23.0
```

**To send the catalogue:**

```
CATALOGUE_PDF_URL=
```

**Recommended once wiring works** (rejects forged webhooks with 401):

```
META_APP_SECRET=
```

**Development safety net** — while non-empty, the backend will only ever send to
these numbers, so a stray webhook from a real customer cannot be answered by a
half-finished bot. **Leave empty in production:**

```
WHATSAPP_ALLOWED_NUMBERS=919876543210,919812345678
```

**AI (optional).** Leave `AI_PROVIDER=none` and the FAQ engine answers
everything:

```
AI_PROVIDER=anthropic        # none | anthropic | openai | gemini
AI_API_KEY=
AI_MODEL=                    # optional override
```

Generate a verify token with:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

---

## 3. Running locally

```bash
cd Avani-enterprises-backend-pure-bc
npm install
cp .env.example .env      # then fill it in
npm run dev               # nodemon, port 5001
```

Confirm it is up and see what it thinks is configured:

```bash
curl http://localhost:5001/api/health
curl http://localhost:5001/api/webhooks/whatsapp/status
```

`status` returns booleans only — never a token.

---

## 4. Testing the webhook locally

Meta can only call a public HTTPS URL, so a tunnel is required for local work.

**cloudflared** (no account needed):

```bash
cloudflared tunnel --url http://localhost:5001
# → https://random-words-1234.trycloudflare.com
```

**ngrok:**

```bash
ngrok http 5001
# → https://abcd-1234.ngrok-free.app
```

Your callback URL is that host plus `/api/webhooks/whatsapp`.

> The tunnel URL changes every restart on the free tier, and Meta must be
> re-pointed each time. For anything beyond a first test, deploy to Render and
> use the stable URL.

Verify the GET handshake yourself before handing the URL to Meta:

```bash
curl "http://localhost:5001/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=12345"
# → 12345          (correct token)
# → 403            (wrong token)
```

---

## 5. Deploying to Render

The existing paid Render web service hosts this. There is nothing new to
create.

1. Commit and push to `main`.
2. Render auto-deploys the backend service.
3. Dashboard → your backend service → **Environment** → add the variables from
   section 2 → **Save**. Render restarts the service.
4. Confirm:

```bash
curl https://avani-enterprises.onrender.com/api/health
```

`whatsapp.accessTokenConfigured`, `verifyTokenConfigured` and
`catalogueConfigured` should all be `true`.

Your webhook callback URL is:

```
https://avani-enterprises.onrender.com/api/webhooks/whatsapp
```

Substitute your custom domain (e.g. `https://api.avanienterprises.in/...`) if
one is pointed at this service.

> **Render free-tier note:** free instances sleep after inactivity and a cold
> start can exceed Meta's webhook timeout, causing retries. This is on a **paid**
> instance, which does not sleep — one of the reasons to reuse it rather than
> add a second service.

---

## 6. Meta webhook configuration

In the **new** Meta app created for WhatsApp automation — *not* the Social CRM
app, and *not* the production WhatsApp Business Account:

1. **WhatsApp → Configuration → Webhook → Edit**
2. **Callback URL:** `https://avani-enterprises.onrender.com/api/webhooks/whatsapp`
3. **Verify token:** exactly the value of `WHATSAPP_VERIFY_TOKEN`
4. **Verify and save.** Meta sends the GET handshake; the log shows
   `✅ WhatsApp webhook verified by Meta.`
5. **Manage** the subscribed fields and tick:
   - **`messages`** — required. Incoming messages and delivery statuses.
   - **`calls`** — only if you want WhatsApp call handling (section 8).

If verification fails: the token does not match, the service is still deploying,
or the URL is missing `/api/webhooks/whatsapp`.

---

## 7. Testing

### Incoming messages

The Meta **test number can only exchange messages with the recipient numbers you
registered** in WhatsApp → API Setup. Add your own number there first.

From a registered number, message the test number:

| You send | You get |
|---|---|
| `Hi` | Greeting + catalogue PDF |
| `Do you develop websites?` | "Yes. Avani Enterprises provides website and web application development services…" |
| `Do you provide AI integration?` | "Yes. We provide AI development, AI integration and AI automation solutions." |
| `I want to build an ERP` | "Yes, we can develop custom ERP solutions. Please share your requirements…" |
| `send catalogue` | Catalogue again, regardless of the resend window |
| a photo / voice note | Polite acknowledgement (or the catalogue if they are new) |
| `stop` | Opt-out confirmation; no further automated messages |

Render logs show one line per message:

```
💬 WhatsApp text from 91******10 (Soham)
↩️ Replied to 91******10 [intent=service:website source=knowledge]
```

Phone numbers are masked in logs by design.

### Without using a phone

Dry-run the reply engine — sends nothing, costs nothing:

```bash
curl -X POST https://avani-enterprises.onrender.com/admin/whatsapp/preview-reply \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"message":"do you build mobile apps?"}'
```

Send a real test message to a specific number:

```bash
curl -X POST https://avani-enterprises.onrender.com/admin/whatsapp/test-catalogue \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"to":"919876543210"}'
```

> Outside a 24-hour customer service window, Meta only allows **template**
> messages. A test send to someone who has not messaged you recently will fail
> with error `131047`. That is Meta's policy, not a bug — message the number
> from your phone first, then test.

---

## 8. WhatsApp calling — what works and what does not

**This is not telephony.** The WhatsApp Business Calling API is WebRTC voice
inside WhatsApp. Signalling arrives as a webhook; answering a call means
terminating DTLS/SRTP and replying to an SDP offer.

**This backend has no media stack, so it never answers a call.** It detects the
incoming call, hangs up cleanly, and sends the caller a WhatsApp message plus
the catalogue — which is the flow you asked for:

```
Customer calls  →  Meta calls webhook  →  identify caller
                →  reject the call  →  send message  →  send catalogue
```

`WHATSAPP_CALL_ACTION=ignore` lets the call ring out instead and replies once
Meta reports it terminated.

### Required extra configuration

**Calling is DISABLED by default on every WhatsApp number, test numbers
included. No call webhook fires until you enable it.**

```bash
curl -X POST https://avani-enterprises.onrender.com/admin/whatsapp/calling \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"enabled":true}'
```

Then confirm:

```bash
curl https://avani-enterprises.onrender.com/admin/whatsapp/calling \
  -H "Authorization: Bearer <ADMIN_JWT>"
```

You must also tick the **`calls`** webhook field in Meta's Configuration screen
(section 6) — subscribing to `messages` alone delivers no call events.

### Limitations to know before relying on it

- **Test numbers:** inbound calling works, but only from the recipient numbers
  registered in the App Dashboard — the same restriction as messages.
- **Graph API version:** requires `META_GRAPH_API_VERSION=v23.0` or newer.
- **Messaging after a missed call is allowed.** A user calling the business
  opens (or refreshes) the 24-hour customer service window whether or not the
  call is answered, so the free-form reply is permitted without a template.
- **Business-initiated calling** (us calling them) is restricted in several
  countries and requires per-user call permission. Not implemented; not needed
  for this flow.
- **Two payload shapes on one field.** Inbound calls arrive as `value.calls[]`;
  progress for calls the business places arrives as `value.statuses[]` with
  `type: "call"` — same `calls` field. Both are handled.

### Normal telephone calls — deliberately not built

A phone call to a mobile or landline is a completely separate integration:

```
Normal phone call → telephony provider (Exotel/Twilio/Plivo)
                  → their incoming-call webhook → caller number
                  → WhatsApp API → send catalogue
```

No telephony provider is installed and no code is shared with the WhatsApp
calling path, so the two cannot get tangled when that phase begins. The reusable
piece is already there: `sendCatalogueTo(number)` in
`services/whatsapp/inboundMessage.js`.

---

## 9. Managing the catalogue

Precedence, highest first:

1. `catalogueMediaId` in the settings document (admin panel)
2. `cataloguePdfUrl` in the settings document (admin panel)
3. `CATALOGUE_MEDIA_ID` environment variable
4. `CATALOGUE_PDF_URL` environment variable

**Phase 1 (env var).** Host the PDF anywhere publicly reachable over HTTPS and
set `CATALOGUE_PDF_URL`. Meta downloads it server-side, so it cannot sit behind
authentication or a login.

**Admin upload (no redeploy).** Reuses the Cloudinary account already configured
for newsletter images and CV uploads — `resource_type: "raw"`, exactly as the CV
upload does, because Cloudinary rejects PDFs under the default image type:

```bash
curl -X POST https://avani-enterprises.onrender.com/admin/whatsapp/catalogue \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -F "catalogue=@AVANI-PORTFOLIO.pdf"
```

That stores the new URL and clears any media id, so the upload takes effect on
the next enquiry.

**Adding it to the admin panel UI** (suggested, not built — the brief said not
to build a large panel for this): one page calling `GET /admin/whatsapp/settings`,
a file input posting to `POST /admin/whatsapp/catalogue`, and a "send test"
button hitting `POST /admin/whatsapp/test-catalogue`. It would follow the same
axios + JWT pattern as `NewsletterManagement.jsx`.

**Resend policy.** `CATALOGUE_RESEND_HOURS` (default 168 = one week) stops the
same person getting the PDF repeatedly. An explicit "send catalogue" always
overrides it.

---

## 10. Changing what the bot says

Everything the bot says is data, not code: `services/whatsapp/knowledgeBase.js`.

Add a service — one entry, and both the rule-based and AI answers pick it up:

```js
{
  id: "devops",
  name: "DevOps & Cloud",
  keywords: ["devops", "aws", "cloud", "deployment", "ci cd"],
  reply: "Yes. We handle cloud infrastructure, deployment pipelines and DevOps.",
}
```

To change content **without a code change**, set `WHATSAPP_KNOWLEDGE_PATH` to a
JSON file of the same shape. It is merged over the defaults, so a file
containing only `{ "services": [...] }` keeps everything else.

---

## 11. Turning on AI

Phase 1 answers from the knowledge base. Point it at a model and it will answer
open-ended questions in its own words instead:

```
AI_PROVIDER=anthropic
AI_API_KEY=sk-ant-...
```

That is the whole switch-on. `services/whatsapp/aiService.js` supports
`anthropic`, `openai` and `gemini`; adding a provider is one entry in its
`PROVIDERS` map.

```
Customer message → webhook → queryProcessor → aiService → Graph API → customer
```

What stays deterministic even with AI on, because these drive side effects:
greeting, catalogue requests, opt-out, thanks, and human-handoff.

**The FAQ engine remains the fallback.** If the model times out, rate-limits,
errors, or is not configured, the customer still gets a correct answer from the
knowledge base. An AI outage degrades the wording, not the service.

The API key is read server-side and sent in a request header. It is never
logged, never returned by any endpoint, and never exposed to a frontend.

---

## 12. Duplicate protection

Meta retries a webhook on any non-200, on a slow 200, and sometimes for no
visible reason. Every side effect runs behind a one-time claim on Meta's own
message/call id.

**Production path — MongoDB** (already in the project, nothing to set up). The
claim is a unique-index insert, not a read-then-write check, so two concurrent
retries cannot both win. Rows expire after 3 days.

**Fallback — in-process memory.** Used only when Mongo is unreachable. It is
per-process, so it cannot deduplicate across two Render instances. Fine for
local development; the Mongo path is what production uses.

For a call, `connect` and `terminate` share one claim keyed on the **call id**,
so a single call cannot produce two catalogues.

`GET /api/webhooks/whatsapp/status` reports which backend is active.

---

## 13. Message types

Handled as text: `text`, interactive button/list replies, `button`, and captions
on `image` / `video` / `document`.

Handled gracefully (acknowledged, never crashes): `audio`, `sticker`,
`location`, `contacts`, `reaction`, `order`, `system`, `unsupported`, and any
type Meta adds after this was written — the `default` branch names it rather
than throwing.

A brand-new customer who opens with a photo or a voice note still gets the
catalogue: it is their first contact either way.

---

## 14. Security

- Tokens live only in environment variables. Nothing is hardcoded; `.env` is
  gitignored (verified — `.env.example` is the only committed template).
- The access token goes in an `Authorization` header, never a URL, and is never
  logged or returned by any endpoint.
- AI keys are server-side only. The browser never talks to a model.
- Nothing uses `NEXT_PUBLIC_` / `VITE_`.
- `META_APP_SECRET` enables `X-Hub-Signature-256` verification: a bad signature
  is a hard **401**. Set it once the integration works.
- The verify token is compared in constant time.
- Customer phone numbers are **masked in logs** (`91******10`). They are stored
  in the database because a business must be able to call back an enquiry —
  the same posture as the existing `Lead` and `AvaniForm` models.
- Admin routes sit behind the existing JWT middleware.
- Malformed payloads return 200 without processing; unknown webhook objects are
  ignored. Nothing in the pipeline can crash the process.
- Webhook body is capped at 1 MB.

---

## 15. Troubleshooting

| Symptom | Cause |
|---|---|
| Meta verification fails | Token mismatch, service still deploying, or URL missing `/api/webhooks/whatsapp` |
| Webhook 401s | `META_APP_SECRET` does not match the app's secret. Clear it to disable the check while debugging |
| Messages arrive, no reply | Check `/api/health`: `accessTokenConfigured`, `automationEnabled`. Then check `WHATSAPP_ALLOWED_NUMBERS` — a non-empty list blocks everyone else. Log line: `📵 ... (recipient_not_allowed)` |
| Text sends, PDF does not | `catalogueConfigured: false`, or Meta cannot download the URL (must be public HTTPS, no auth). Look for a `failed` delivery status in the logs |
| Error `131047` | Outside the 24-hour customer service window. Have the customer message you first |
| Error `131030` | Recipient is not in the test number's allowed list. Add it in Meta → API Setup |
| Catalogue sent twice | Two Render instances with Mongo unreachable — the in-memory fallback cannot deduplicate across processes. Check `/api/webhooks/whatsapp/status` → `idempotency.backend` |
| No call events at all | Calling not enabled on the number (section 8), or the `calls` webhook field is not ticked |
| AI ignored | `AI_PROVIDER` still `none`, missing `AI_API_KEY`, or `aiEnabled: false` in settings. Failures log `⚠️ AI provider ... failed, falling back to rules` |

---

## 16. Moving to production later

When the real business number replaces the test number:

1. Add the number to the **new** Meta app's WhatsApp Business Account and
   complete verification.
2. Update `WHATSAPP_PHONE_NUMBER_ID` (and `WHATSAPP_BUSINESS_ACCOUNT_ID` if the
   WABA changes) on Render.
3. Swap the temporary access token for a **permanent System User token**
   (Business Settings → System Users), with `whatsapp_business_messaging` and
   `whatsapp_business_management`.
4. **Clear `WHATSAPP_ALLOWED_NUMBERS`** — otherwise real customers are silently
   ignored.
5. Set `META_APP_SECRET`.
6. Re-enable calling on the new number (section 8) — the setting is per number.
7. Submit message templates if you need to start conversations outside the
   24-hour window.

The existing production WhatsApp Business Account and the Social CRM Meta app
are **not touched** by any of this. This integration only ever uses the
credentials in `WHATSAPP_*`.
