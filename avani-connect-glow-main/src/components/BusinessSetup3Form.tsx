import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  User, Mail, MapPin, Phone, ChevronDown, Send, Check,
  Sparkles, Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBackendUrl } from "@/lib/api";
import { countryCodes } from "@/components/RegistrationForm";

/**
 * BusinessSetup3Form — a fully redesigned, conversion-focused inquiry form
 * built only for the /businesssetup3 page. Same fields, placeholders,
 * validation and backend (POST /submit-form, source "businesssetup3") as the
 * shared form — but a completely fresh UI (tappable service chips, enlarged
 * offer header, modern inputs). No payment functionality.
 */

const SERVICES = [
  "Web Development",
  "Social Media Management",
  "AI Automation",
  "Google Ads & Meta Ads",
];

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  cityState: z.string().trim().min(2, "City & State must be at least 2 characters").max(200),
  phone: z.string().trim().min(4, "Phone number is too short").max(20, "Phone number is too long"),
  service: z.array(z.string()).min(1, "Please select at least one service"),
  businessCategory: z.string().max(1000).optional(),
  consent: z.boolean().refine((v) => v === true, "You must agree to continue"),
});
type FormShape = z.infer<typeof schema>;

const GOLD = "#D4A017";

export default function BusinessSetup3Form() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState<{
    name: string; email: string; cityState: string; phone: string;
    service: string[]; businessCategory: string; consent: boolean;
  }>({
    name: "", email: "", cityState: "", phone: "",
    service: [], businessCategory: "", consent: false,
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [customService, setCustomService] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormShape, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const set = (k: string, v: string | boolean | string[]) => {
    setData((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof FormShape]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const toggleService = (s: string) => {
    setData((p) => {
      const has = p.service.includes(s);
      return { ...p, service: has ? p.service.filter((x) => x !== s) : [...p.service, s] };
    });
    if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    // Country-specific phone length check (mirrors the shared form)
    const country = countryCodes.find((c) => c.value === countryCode);
    if (country?.digits) {
      const d = country.digits;
      const phone = data.phone || "";
      const valid = Array.isArray(d) ? d.includes(phone.length) : phone.length === d;
      if (!valid) {
        const req = Array.isArray(d) ? d.join(" or ") : d;
        setErrors((p) => ({ ...p, phone: `Phone number must be ${req} digits` }));
        toast({ title: "Invalid Phone Number", description: `Phone number must be ${req} digits for ${country.label}`, variant: "destructive" });
        setIsLoading(false);
        return;
      }
    }

    try {
      // Replace the "Other" marker with the typed custom requirement.
      const finalServices = data.service.flatMap((s) =>
        s === "Other" ? (customService.trim() ? [customService.trim()] : []) : [s]
      );

      const validated = schema.parse({
        name: data.name,
        email: data.email,
        cityState: data.cityState,
        phone: data.phone,
        service: finalServices,
        businessCategory: data.businessCategory,
        consent: data.consent,
      });

      const payload = { ...validated, source: "businesssetup3" };
      const API_BASE = getBackendUrl();
      const response = await fetch(`${API_BASE}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.message || "Something went wrong. Try again.");
        toast({ title: "Submission Failed", description: result?.message || "Please try again.", variant: "destructive" });
        return;
      }

      toast({ title: "Form submitted successfully!", description: "We'll get back to you soon." });
      navigate("/thank-you", { state: { name: validated.name, service: validated.service } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const next: Partial<Record<keyof FormShape, string>> = {};
        error.errors.forEach((err) => {
          const f = err.path[0] as keyof FormShape;
          next[f] = err.message;
        });
        setErrors(next);
      } else {
        setApiError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="b3f">
      <style>{`
        .b3f { background: #fff; border-radius: 22px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); box-shadow: 0 26px 80px rgba(0,0,0,0.14); }
        .b3f * { box-sizing: border-box; }

        /* ── Enlarged offer header ── */
        .b3f-offer { position: relative; background: linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 100%); padding: 20px 22px 18px; text-align: center; border-bottom: 3px solid ${GOLD}; overflow: hidden; }
        .b3f-offer::after { content: ""; position: absolute; top: -40%; left: -30%; width: 70%; height: 180%; background: linear-gradient(90deg, transparent, rgba(212,160,23,0.18), transparent); transform: rotate(18deg); animation: b3fShine 3.6s ease-in-out infinite; }
        @keyframes b3fShine { 0% { left: -40%; } 55%,100% { left: 120%; } }
        .b3f-offer-lab { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px; }
        .b3f-offer-row { display: flex; align-items: center; justify-content: center; gap: 14px; }
        .b3f-old { font-size: 26px; font-weight: 700; color: rgba(255,255,255,0.4); text-decoration: line-through; }
        .b3f-new { font-size: 52px; font-weight: 900; color: #4ADE80; line-height: 1; letter-spacing: -2px; text-shadow: 0 4px 20px rgba(74,222,128,0.35); }
        .b3f-off { background: #DC2626; color: #fff; font-size: 12px; font-weight: 900; letter-spacing: 0.5px; padding: 4px 9px; border-radius: 6px; }
        .b3f-offer-note { color: rgba(255,255,255,0.8); font-size: 12.5px; font-weight: 600; margin-top: 10px; }

        /* ── Body ── */
        .b3f-body { padding: 20px 22px 24px; }
        .b3f-title { font-size: 21px; font-weight: 800; color: #1A1A2E; line-height: 1.15; }
        .b3f-subtitle { font-size: 13px; color: #5F6368; margin: 4px 0 16px; }

        .b3f-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .b3f-field { margin-bottom: 12px; }
        .b3f-label { display: block; font-size: 11.5px; font-weight: 700; color: #1A1A2E; margin-bottom: 6px; letter-spacing: 0.2px; }
        .b3f-input-wrap { position: relative; }
        .b3f-input-wrap > svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: ${GOLD}; pointer-events: none; }
        .b3f-input, .b3f-textarea, .b3f-cc {
          width: 100%; border: 1.5px solid rgba(0,0,0,0.10); background: #FAFAF8; border-radius: 12px;
          font-size: 15px; color: #1A1A2E; font-family: inherit; outline: none; transition: all .18s ease;
        }
        .b3f-input { height: 48px; padding: 0 14px 0 40px; }
        .b3f-textarea { padding: 12px 14px; min-height: 84px; resize: none; }
        .b3f-input:focus, .b3f-textarea:focus, .b3f-cc:focus { border-color: ${GOLD}; background: #fff; box-shadow: 0 0 0 4px rgba(212,160,23,0.12); }
        .b3f-input::placeholder, .b3f-textarea::placeholder { color: #9aa0a6; }

        .b3f-phone { display: flex; gap: 8px; }
        .b3f-cc { width: 104px; flex-shrink: 0; height: 48px; padding: 0 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .b3f-phone .b3f-input-wrap { flex: 1; }

        /* ── Service chips ── */
        .b3f-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .b3f-chip {
          display: inline-flex; align-items: center; gap: 6px; cursor: pointer;
          border: 1.5px solid rgba(0,0,0,0.12); background: #FAFAF8; color: #1A1A2E;
          font-size: 13px; font-weight: 600; padding: 9px 13px; border-radius: 999px;
          transition: all .15s ease; user-select: none;
        }
        .b3f-chip:hover { border-color: ${GOLD}; }
        .b3f-chip.active { background: #1A1A2E; color: #fff; border-color: #1A1A2E; }
        .b3f-chip.active .b3f-tick { color: #4ADE80; }
        .b3f-tick { width: 15px; height: 15px; }

        .b3f-err { color: #DC2626; font-size: 12px; font-weight: 600; margin-top: 5px; }
        .b3f-apierr { color: #DC2626; font-size: 13px; font-weight: 700; text-align: center; margin-top: 6px; }

        .b3f-notes-toggle { background: none; border: none; color: ${GOLD}; font-size: 13px; font-weight: 700; cursor: pointer; padding: 2px 0; display: inline-flex; align-items: center; gap: 4px; }

        .b3f-consent { display: flex; align-items: flex-start; gap: 9px; margin: 14px 0 4px; cursor: pointer; }
        .b3f-consent input { margin-top: 3px; width: 16px; height: 16px; accent-color: ${GOLD}; flex-shrink: 0; cursor: pointer; }
        .b3f-consent span { font-size: 12px; color: #3c4043; line-height: 1.5; font-weight: 500; }

        .b3f-submit {
          width: 100%; margin-top: 14px; border: none; cursor: pointer; border-radius: 14px;
          padding: 16px; font-size: 16px; font-weight: 800; letter-spacing: 0.3px; color: #1A1A2E;
          background: linear-gradient(135deg, ${GOLD} 0%, #E8B830 100%);
          box-shadow: 0 12px 30px rgba(212,160,23,0.35); transition: all .22s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .b3f-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(212,160,23,0.45); }
        .b3f-submit:disabled { opacity: 0.75; cursor: not-allowed; }
        .b3f-spin { animation: b3fSpin 0.9s linear infinite; }
        @keyframes b3fSpin { to { transform: rotate(360deg); } }
        .b3f-trust { text-align: center; font-size: 11.5px; color: #5F6368; margin-top: 10px; font-weight: 600; }

        @media (max-width: 600px) {
          .b3f-offer { padding: 16px 18px 14px; }
          .b3f-new { font-size: 44px; }
          .b3f-old { font-size: 22px; }
          .b3f-body { padding: 18px 16px 20px; }
          .b3f-grid2 { grid-template-columns: 1fr; gap: 0; }
          .b3f-title { font-size: 19px; }
        }
      `}</style>

      {/* Enlarged limited-time offer */}
      <div className="b3f-offer">
        <span className="b3f-offer-lab"><Sparkles size={13} /> Limited Time Offer</span>
        <div className="b3f-offer-row">
          <span className="b3f-old">₹999</span>
          <span className="b3f-new">₹0</span>
          <span className="b3f-off">100% OFF</span>
        </div>
        <p className="b3f-offer-note">Free strategy session — claim your slot before it's gone!</p>
      </div>

      <div className="b3f-body">
        <h3 className="b3f-title">Book Your Free Session</h3>
        <p className="b3f-subtitle">Fill in your details — it takes under 60 seconds.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="b3f-grid2">
            <div className="b3f-field">
              <label className="b3f-label">Full Name</label>
              <div className="b3f-input-wrap">
                <User size={18} />
                <input className="b3f-input" placeholder="Enter name" value={data.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              {errors.name && <p className="b3f-err">{errors.name}</p>}
            </div>

            <div className="b3f-field">
              <label className="b3f-label">Email</label>
              <div className="b3f-input-wrap">
                <Mail size={18} />
                <input className="b3f-input" type="email" placeholder="Enter email address" value={data.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              {errors.email && <p className="b3f-err">{errors.email}</p>}
            </div>
          </div>

          <div className="b3f-field">
            <label className="b3f-label">City & State</label>
            <div className="b3f-input-wrap">
              <MapPin size={18} />
              <input className="b3f-input" placeholder="Enter City & State" value={data.cityState} onChange={(e) => set("cityState", e.target.value)} />
            </div>
            {errors.cityState && <p className="b3f-err">{errors.cityState}</p>}
          </div>

          <div className="b3f-field">
            <label className="b3f-label">Phone Number</label>
            <div className="b3f-phone">
              <select className="b3f-cc" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} aria-label="Country code">
                {countryCodes.map((c) => (
                  <option key={c.value + c.label} value={c.value}>{c.value}</option>
                ))}
              </select>
              <div className="b3f-input-wrap">
                <Phone size={18} />
                <input
                  className="b3f-input"
                  type="tel"
                  placeholder="Mobile no."
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 15))}
                />
              </div>
            </div>
            {errors.phone && <p className="b3f-err">{errors.phone}</p>}
          </div>

          <div className="b3f-field">
            <label className="b3f-label">What do you need? <span style={{ color: GOLD }}>(select all that apply)</span></label>
            <div className="b3f-chips">
              {[...SERVICES, "Other"].map((s) => {
                const active = data.service.includes(s);
                return (
                  <span key={s} className={`b3f-chip${active ? " active" : ""}`} onClick={() => toggleService(s)}>
                    {active && <Check className="b3f-tick" />}
                    {s}
                  </span>
                );
              })}
            </div>
            {data.service.includes("Other") && (
              <div className="b3f-input-wrap" style={{ marginTop: 10 }}>
                <Sparkles size={18} />
                <input className="b3f-input" placeholder="Tell us what you need *" value={customService} onChange={(e) => setCustomService(e.target.value)} />
              </div>
            )}
            {errors.service && <p className="b3f-err">{errors.service}</p>}
          </div>

          <div className="b3f-field" style={{ marginBottom: 8 }}>
            {!showNotes ? (
              <button type="button" className="b3f-notes-toggle" onClick={() => setShowNotes(true)}>+ Add a note (optional)</button>
            ) : (
              <textarea
                className="b3f-textarea"
                placeholder="Describe your business or add any notes (optional)"
                value={data.businessCategory}
                onChange={(e) => set("businessCategory", e.target.value)}
              />
            )}
          </div>

          <label className="b3f-consent">
            <input type="checkbox" checked={data.consent} onChange={(e) => set("consent", e.target.checked)} />
            <span>I agree to receive information regarding my submitted application and updates from Avani Enterprises *</span>
          </label>
          {errors.consent && <p className="b3f-err">{errors.consent}</p>}

          {apiError && <p className="b3f-apierr">{apiError}</p>}

          <button type="submit" className="b3f-submit" disabled={isLoading}>
            {isLoading ? (<><Loader2 size={18} className="b3f-spin" /> Submitting...</>) : (<>Claim My Free Session <Send size={17} /></>)}
          </button>
          <p className="b3f-trust">🔒 100% free · No spam · We reply within 24 hours</p>
        </form>
      </div>
    </div>
  );
}
