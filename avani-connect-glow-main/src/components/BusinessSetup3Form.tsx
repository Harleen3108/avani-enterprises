import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Send, Check, Loader2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackLead } from "@/lib/leadTracking";
import { getBackendUrl } from "@/lib/api";
import { countryCodes } from "@/components/RegistrationForm";

/**
 * BusinessSetup3Form — the shared lead form used on blog, service, city,
 * comparison and product pages.
 *
 * WHAT CHANGED AND WHY
 * --------------------
 * 1. The "LIMITED TIME OFFER / ₹999 → ₹0 / 100% OFF / Limited slots — claim
 *    yours before it's gone!" banner is gone. It was manufactured scarcity for
 *    a free consultation, which is not scarce, and it was the most
 *    trust-damaging element on a site trying to build credibility for a brand
 *    nobody has heard of yet. Honest framing costs nothing and converts better
 *    with the considered buyers this site is aimed at.
 *
 * 2. The form was seven fields plus a notes box. Every field costs completions,
 *    so it is now four: name, phone, service, and an optional email. City and
 *    free-text requirements are gathered on the call, where they are cheap.
 *
 * 3. Dark theme to match the rest of the site — the white card was the only
 *    light surface on the page and read as an embedded advert.
 *
 * The submit path is unchanged (POST /submit-form) but now also sends the page
 * the lead came from, so the notification email says where it originated.
 * generate_lead fires only on a confirmed submission.
 */

// Every service we actually sell, so a lead arrives pre-qualified instead of
// needing a call just to find out what they want.
const SERVICES = [
  "Web / App Development",
  "SEO",
  "Google & Meta Ads",
  "Social Media Marketing",
  "AI Chatbot / Voice Agent",
  "AI Automation & Agents",
  "AI Video / Content",
  "CRM / ERP / Business OS",
  "E-commerce",
  "Podcast Production",
  "Business / Financial Consulting",
  "Something else",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(4, "Phone number is too short").max(20, "Phone number is too long"),
  service: z.string().trim().min(1, "Please choose what you need"),
  // Optional — a phone number is enough to start a conversation.
  email: z.string().trim().email("That email does not look right").max(255).optional().or(z.literal("")),
});
type FormShape = z.infer<typeof schema>;

const GOLD = "#D4A017";

export default function BusinessSetup3Form({ source = "lead_form" }: { source?: string }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { pathname } = useLocation();

  const [data, setData] = useState({ name: "", phone: "", service: "", email: "" });
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Partial<Record<keyof FormShape, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const set = (k: keyof typeof data, v: string) => {
    setData((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof FormShape]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    // Country-specific phone length check.
    const country = countryCodes.find((c) => c.value === countryCode);
    if (country?.digits) {
      const d = country.digits;
      const valid = Array.isArray(d) ? d.includes(data.phone.length) : data.phone.length === d;
      if (!valid) {
        const req = Array.isArray(d) ? d.join(" or ") : d;
        setErrors((p) => ({ ...p, phone: `Please enter ${req} digits` }));
        setIsLoading(false);
        return;
      }
    }

    try {
      const validated = schema.parse(data);

      const res = await fetch(`${getBackendUrl()}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validated.name,
          email: validated.email || "",
          phone: `${countryCode}${validated.phone}`,
          service: [validated.service],
          services: [validated.service],
          source: source || "lead_form",
          // Where the lead actually came from, for the notification email.
          pagePath: pathname,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        setApiError(result?.message || "Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      // Fires only on a confirmed submission, so GA4 matches the CRM.
      trackLead({ service: validated.service, formName: source || "lead_form" });

      toast({ title: "Thanks — we've got it.", description: "We'll reply within 24 hours." });
      navigate("/thank-you", { state: { name: validated.name, service: [validated.service] } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const next: Partial<Record<keyof FormShape, string>> = {};
        error.errors.forEach((err) => { next[err.path[0] as keyof FormShape] = err.message; });
        setErrors(next);
      } else {
        setApiError("Could not reach the server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="b3f-card">
      <style>{`
        .b3f-card {
          background: #12101A;
          border: 1px solid rgba(212,160,23,0.22);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(0,0,0,0.35);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .b3f-head { padding: 22px 22px 4px; }
        .b3f-title {
          font-family: 'Outfit', sans-serif; font-size: 19px; font-weight: 800;
          color: #fff; margin: 0 0 6px; letter-spacing: -0.01em;
        }
        .b3f-sub { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.62); margin: 0; }
        .b3f-body { padding: 18px 22px 22px; }
        .b3f-field { margin-bottom: 14px; }
        .b3f-label {
          display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px;
          text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 7px;
        }
        .b3f-opt { color: rgba(255,255,255,0.35); font-weight: 500; text-transform: none; letter-spacing: 0; }
        .b3f-input, .b3f-select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
          padding: 13px 14px; font-size: 14.5px; color: #fff;
          font-family: inherit; transition: border-color .18s, background .18s;
          min-height: 46px; /* comfortable tap target on mobile */
        }
        .b3f-input::placeholder { color: rgba(255,255,255,0.3); }
        .b3f-input:focus, .b3f-select:focus {
          outline: none; border-color: ${GOLD}; background: rgba(255,255,255,0.07);
        }
        .b3f-input.err, .b3f-select.err { border-color: #ef4444; }
        .b3f-select { appearance: none; cursor: pointer; padding-right: 38px; }
        .b3f-select option { background: #12101A; color: #fff; }
        .b3f-selwrap { position: relative; }
        .b3f-selwrap svg {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          pointer-events: none; color: rgba(255,255,255,0.4);
        }
        .b3f-phone { display: grid; grid-template-columns: 92px 1fr; gap: 8px; }
        .b3f-cc {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; color: #fff; font-size: 13.5px; padding: 13px 8px;
          font-family: inherit; cursor: pointer; min-height: 46px;
        }
        .b3f-cc option { background: #12101A; }
        .b3f-err { color: #f87171; font-size: 12px; margin-top: 5px; }
        .b3f-btn {
          width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 9px;
          background: ${GOLD}; color: #12101A; border: none; border-radius: 10px;
          padding: 15px 20px; font-size: 15px; font-weight: 800; cursor: pointer;
          font-family: 'Outfit', sans-serif; letter-spacing: -0.01em;
          transition: filter .18s, transform .08s; min-height: 50px; margin-top: 4px;
        }
        .b3f-btn:hover:not(:disabled) { filter: brightness(1.08); }
        .b3f-btn:active:not(:disabled) { transform: translateY(1px); }
        .b3f-btn:disabled { opacity: .65; cursor: wait; }
        .b3f-micro {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          font-size: 11.5px; color: rgba(255,255,255,0.45); margin: 12px 0 0; text-align: center;
        }
        .b3f-api {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5; border-radius: 9px; padding: 10px 12px; font-size: 13px; margin-bottom: 14px;
        }
        @media (max-width: 480px) {
          .b3f-head { padding: 18px 16px 2px; }
          .b3f-body { padding: 16px 16px 18px; }
          .b3f-title { font-size: 17.5px; }
        }
      `}</style>

      {/* Honest header. No countdown, no crossed-out price, no scarcity. */}
      <div className="b3f-head">
        <h3 className="b3f-title">Get Started</h3>
        <p className="b3f-sub">Free consultation, no obligation. We reply within 24 hours.</p>
      </div>

      <div className="b3f-body">
        {apiError && <div className="b3f-api">{apiError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="b3f-field">
            <label className="b3f-label" htmlFor="b3f-name">Your name</label>
            <input
              id="b3f-name"
              className={`b3f-input${errors.name ? " err" : ""}`}
              placeholder="Full name"
              autoComplete="name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
            />
            {errors.name && <p className="b3f-err">{errors.name}</p>}
          </div>

          <div className="b3f-field">
            <label className="b3f-label" htmlFor="b3f-phone">Phone</label>
            <div className="b3f-phone">
              <select
                className="b3f-cc"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country code"
              >
                {countryCodes.map((c) => (
                  <option key={c.value} value={c.value}>{c.value}</option>
                ))}
              </select>
              <input
                id="b3f-phone"
                className={`b3f-input${errors.phone ? " err" : ""}`}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Phone number"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value.replace(/[^\d]/g, ""))}
              />
            </div>
            {errors.phone && <p className="b3f-err">{errors.phone}</p>}
          </div>

          <div className="b3f-field">
            <label className="b3f-label" htmlFor="b3f-service">What do you need?</label>
            <div className="b3f-selwrap">
              <select
                id="b3f-service"
                className={`b3f-select${errors.service ? " err" : ""}`}
                value={data.service}
                onChange={(e) => set("service", e.target.value)}
              >
                <option value="">Choose a service…</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} />
            </div>
            {errors.service && <p className="b3f-err">{errors.service}</p>}
          </div>

          <div className="b3f-field">
            <label className="b3f-label" htmlFor="b3f-email">
              Email <span className="b3f-opt">(optional)</span>
            </label>
            <input
              id="b3f-email"
              className={`b3f-input${errors.email ? " err" : ""}`}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
            {errors.email && <p className="b3f-err">{errors.email}</p>}
          </div>

          <button className="b3f-btn" type="submit" disabled={isLoading}>
            {isLoading
              ? <><Loader2 size={17} className="animate-spin" /> Sending…</>
              : <>Get my free consultation <Send size={16} /></>}
          </button>

          <p className="b3f-micro">
            <Check size={13} color={GOLD} /> No spam · We reply within 24 hours
          </p>
        </form>
      </div>
    </div>
  );
}
