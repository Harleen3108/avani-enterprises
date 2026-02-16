// src/components/RegistrationForm.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send, User, Mail, Phone, Briefcase, ChevronDown } from "lucide-react";

const services = [
  "Web Development",
  "Social Media Management",
  "AI Automation",
  "Google Ads & Meta Ads",
];

// Country codes array - सभी major countries के codes
const countryCodes = [
  { value: "+93", label: "+93 (Afghanistan)" },
  { value: "+355", label: "+355 (Albania)" },
  { value: "+213", label: "+213 (Algeria)" },
  { value: "+376", label: "+376 (Andorra)" },
  { value: "+244", label: "+244 (Angola)" },
  { value: "+1-268", label: "+1-268 (Antigua and Barbuda)" },
  { value: "+54", label: "+54 (Argentina)" },
  { value: "+374", label: "+374 (Armenia)" },
  { value: "+297", label: "+297 (Aruba)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+43", label: "+43 (Austria)" },
  { value: "+994", label: "+994 (Azerbaijan)" },
  { value: "+1-242", label: "+1-242 (Bahamas)" },
  { value: "+973", label: "+973 (Bahrain)" },
  { value: "+880", label: "+880 (Bangladesh)" },
  { value: "+1-246", label: "+1-246 (Barbados)" },
  { value: "+375", label: "+375 (Belarus)" },
  { value: "+32", label: "+32 (Belgium)" },
  { value: "+501", label: "+501 (Belize)" },
  { value: "+229", label: "+229 (Benin)" },
  { value: "+1-441", label: "+1-441 (Bermuda)" },
  { value: "+975", label: "+975 (Bhutan)" },
  { value: "+591", label: "+591 (Bolivia)" },
  { value: "+387", label: "+387 (Bosnia and Herzegovina)" },
  { value: "+267", label: "+267 (Botswana)" },
  { value: "+55", label: "+55 (Brazil)" },
  { value: "+246", label: "+246 (British Indian Ocean Territory)" },
  { value: "+1-284", label: "+1-284 (British Virgin Islands)" },
  { value: "+673", label: "+673 (Brunei)" },
  { value: "+359", label: "+359 (Bulgaria)" },
  { value: "+226", label: "+226 (Burkina Faso)" },
  { value: "+257", label: "+257 (Burundi)" },
  { value: "+855", label: "+855 (Cambodia)" },
  { value: "+237", label: "+237 (Cameroon)" },
  { value: "+1", label: "+1 (Canada)" },
  { value: "+238", label: "+238 (Cape Verde)" },
  { value: "+1-345", label: "+1-345 (Cayman Islands)" },
  { value: "+236", label: "+236 (Central African Republic)" },
  { value: "+235", label: "+235 (Chad)" },
  { value: "+56", label: "+56 (Chile)" },
  { value: "+86", label: "+86 (China)" },
  { value: "+61", label: "+61 (Christmas Island)" },
  { value: "+61", label: "+61 (Cocos Islands)" },
  { value: "+57", label: "+57 (Colombia)" },
  { value: "+269", label: "+269 (Comoros)" },
  { value: "+682", label: "+682 (Cook Islands)" },
  { value: "+506", label: "+506 (Costa Rica)" },
  { value: "+385", label: "+385 (Croatia)" },
  { value: "+53", label: "+53 (Cuba)" },
  { value: "+599", label: "+599 (Curaçao)" },
  { value: "+357", label: "+357 (Cyprus)" },
  { value: "+420", label: "+420 (Czech Republic)" },
  { value: "+243", label: "+243 (Democratic Republic of the Congo)" },
  { value: "+45", label: "+45 (Denmark)" },
  { value: "+253", label: "+253 (Djibouti)" },
  { value: "+1-767", label: "+1-767 (Dominica)" },
  { value: "+1-809", label: "+1-809 (Dominican Republic)" },
  { value: "+670", label: "+670 (East Timor)" },
  { value: "+593", label: "+593 (Ecuador)" },
  { value: "+20", label: "+20 (Egypt)" },
  { value: "+503", label: "+503 (El Salvador)" },
  { value: "+240", label: "+240 (Equatorial Guinea)" },
  { value: "+291", label: "+291 (Eritrea)" },
  { value: "+372", label: "+372 (Estonia)" },
  { value: "+251", label: "+251 (Ethiopia)" },
  { value: "+500", label: "+500 (Falkland Islands)" },
  { value: "+298", label: "+298 (Faroe Islands)" },
  { value: "+679", label: "+679 (Fiji)" },
  { value: "+358", label: "+358 (Finland)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+689", label: "+689 (French Polynesia)" },
  { value: "+241", label: "+241 (Gabon)" },
  { value: "+220", label: "+220 (Gambia)" },
  { value: "+995", label: "+995 (Georgia)" },
  { value: "+49", label: "+49 (Germany)" },
  { value: "+233", label: "+233 (Ghana)" },
  { value: "+350", label: "+350 (Gibraltar)" },
  { value: "+30", label: "+30 (Greece)" },
  { value: "+299", label: "+299 (Greenland)" },
  { value: "+1-473", label: "+1-473 (Grenada)" },
  { value: "+1-671", label: "+1-671 (Guam)" },
  { value: "+502", label: "+502 (Guatemala)" },
  { value: "+44-1481", label: "+44-1481 (Guernsey)" },
  { value: "+224", label: "+224 (Guinea)" },
  { value: "+245", label: "+245 (Guinea-Bissau)" },
  { value: "+592", label: "+592 (Guyana)" },
  { value: "+509", label: "+509 (Haiti)" },
  { value: "+504", label: "+504 (Honduras)" },
  { value: "+852", label: "+852 (Hong Kong)" },
  { value: "+36", label: "+36 (Hungary)" },
  { value: "+354", label: "+354 (Iceland)" },
  { value: "+91", label: "+91 (India)" },
  { value: "+62", label: "+62 (Indonesia)" },
  { value: "+98", label: "+98 (Iran)" },
  { value: "+964", label: "+964 (Iraq)" },
  { value: "+353", label: "+353 (Ireland)" },
  { value: "+44-1624", label: "+44-1624 (Isle of Man)" },
  { value: "+972", label: "+972 (Israel)" },
  { value: "+39", label: "+39 (Italy)" },
  { value: "+225", label: "+225 (Ivory Coast)" },
  { value: "+1-876", label: "+1-876 (Jamaica)" },
  { value: "+81", label: "+81 (Japan)" },
  { value: "+44-1534", label: "+44-1534 (Jersey)" },
  { value: "+962", label: "+962 (Jordan)" },
  { value: "+7", label: "+7 (Kazakhstan)" },
  { value: "+254", label: "+254 (Kenya)" },
  { value: "+686", label: "+686 (Kiribati)" },
  { value: "+383", label: "+383 (Kosovo)" },
  { value: "+965", label: "+965 (Kuwait)" },
  { value: "+996", label: "+996 (Kyrgyzstan)" },
  { value: "+856", label: "+856 (Laos)" },
  { value: "+371", label: "+371 (Latvia)" },
  { value: "+961", label: "+961 (Lebanon)" },
  { value: "+266", label: "+266 (Lesotho)" },
  { value: "+231", label: "+231 (Liberia)" },
  { value: "+218", label: "+218 (Libya)" },
  { value: "+423", label: "+423 (Liechtenstein)" },
  { value: "+370", label: "+370 (Lithuania)" },
  { value: "+352", label: "+352 (Luxembourg)" },
  { value: "+853", label: "+853 (Macau)" },
  { value: "+389", label: "+389 (Macedonia)" },
  { value: "+261", label: "+261 (Madagascar)" },
  { value: "+265", label: "+265 (Malawi)" },
  { value: "+60", label: "+60 (Malaysia)" },
  { value: "+960", label: "+960 (Maldives)" },
  { value: "+223", label: "+223 (Mali)" },
  { value: "+356", label: "+356 (Malta)" },
  { value: "+692", label: "+692 (Marshall Islands)" },
  { value: "+222", label: "+222 (Mauritania)" },
  { value: "+230", label: "+230 (Mauritius)" },
  { value: "+262", label: "+262 (Mayotte)" },
  { value: "+52", label: "+52 (Mexico)" },
  { value: "+691", label: "+691 (Micronesia)" },
  { value: "+373", label: "+373 (Moldova)" },
  { value: "+377", label: "+377 (Monaco)" },
  { value: "+976", label: "+976 (Mongolia)" },
  { value: "+382", label: "+382 (Montenegro)" },
  { value: "+1-664", label: "+1-664 (Montserrat)" },
  { value: "+212", label: "+212 (Morocco)" },
  { value: "+258", label: "+258 (Mozambique)" },
  { value: "+95", label: "+95 (Myanmar)" },
  { value: "+264", label: "+264 (Namibia)" },
  { value: "+674", label: "+674 (Nauru)" },
  { value: "+977", label: "+977 (Nepal)" },
  { value: "+31", label: "+31 (Netherlands)" },
  { value: "+687", label: "+687 (New Caledonia)" },
  { value: "+64", label: "+64 (New Zealand)" },
  { value: "+505", label: "+505 (Nicaragua)" },
  { value: "+227", label: "+227 (Niger)" },
  { value: "+234", label: "+234 (Nigeria)" },
  { value: "+683", label: "+683 (Niue)" },
  { value: "+672", label: "+672 (Norfolk Island)" },
  { value: "+850", label: "+850 (North Korea)" },
  { value: "+1-670", label: "+1-670 (Northern Mariana Islands)" },
  { value: "+47", label: "+47 (Norway)" },
  { value: "+968", label: "+968 (Oman)" },
  { value: "+92", label: "+92 (Pakistan)" },
  { value: "+680", label: "+680 (Palau)" },
  { value: "+970", label: "+970 (Palestine)" },
  { value: "+507", label: "+507 (Panama)" },
  { value: "+675", label: "+675 (Papua New Guinea)" },
  { value: "+595", label: "+595 (Paraguay)" },
  { value: "+51", label: "+51 (Peru)" },
  { value: "+63", label: "+63 (Philippines)" },
  { value: "+64", label: "+64 (Pitcairn Islands)" },
  { value: "+48", label: "+48 (Poland)" },
  { value: "+351", label: "+351 (Portugal)" },
  { value: "+1-787", label: "+1-787 (Puerto Rico)" },
  { value: "+974", label: "+974 (Qatar)" },
  { value: "+242", label: "+242 (Republic of the Congo)" },
  { value: "+262", label: "+262 (Réunion)" },
  { value: "+40", label: "+40 (Romania)" },
  { value: "+7", label: "+7 (Russia)" },
  { value: "+250", label: "+250 (Rwanda)" },
  { value: "+590", label: "+590 (Saint Barthélemy)" },
  { value: "+290", label: "+290 (Saint Helena)" },
  { value: "+1-869", label: "+1-869 (Saint Kitts and Nevis)" },
  { value: "+1-758", label: "+1-758 (Saint Lucia)" },
  { value: "+590", label: "+590 (Saint Martin)" },
  { value: "+508", label: "+508 (Saint Pierre and Miquelon)" },
  { value: "+1-784", label: "+1-784 (Saint Vincent and the Grenadines)" },
  { value: "+685", label: "+685 (Samoa)" },
  { value: "+378", label: "+378 (San Marino)" },
  { value: "+239", label: "+239 (Sao Tome and Principe)" },
  { value: "+966", label: "+966 (Saudi Arabia)" },
  { value: "+221", label: "+221 (Senegal)" },
  { value: "+381", label: "+381 (Serbia)" },
  { value: "+248", label: "+248 (Seychelles)" },
  { value: "+232", label: "+232 (Sierra Leone)" },
  { value: "+65", label: "+65 (Singapore)" },
  { value: "+1-721", label: "+1-721 (Sint Maarten)" },
  { value: "+421", label: "+421 (Slovakia)" },
  { value: "+386", label: "+386 (Slovenia)" },
  { value: "+677", label: "+677 (Solomon Islands)" },
  { value: "+252", label: "+252 (Somalia)" },
  { value: "+27", label: "+27 (South Africa)" },
  { value: "+82", label: "+82 (South Korea)" },
  { value: "+211", label: "+211 (South Sudan)" },
  { value: "+34", label: "+34 (Spain)" },
  { value: "+94", label: "+94 (Sri Lanka)" },
  { value: "+249", label: "+249 (Sudan)" },
  { value: "+597", label: "+597 (Suriname)" },
  { value: "+47", label: "+47 (Svalbard and Jan Mayen)" },
  { value: "+268", label: "+268 (Swaziland)" },
  { value: "+46", label: "+46 (Sweden)" },
  { value: "+41", label: "+41 (Switzerland)" },
  { value: "+963", label: "+963 (Syria)" },
  { value: "+886", label: "+886 (Taiwan)" },
  { value: "+992", label: "+992 (Tajikistan)" },
  { value: "+255", label: "+255 (Tanzania)" },
  { value: "+66", label: "+66 (Thailand)" },
  { value: "+228", label: "+228 (Togo)" },
  { value: "+690", label: "+690 (Tokelau)" },
  { value: "+676", label: "+676 (Tonga)" },
  { value: "+1-868", label: "+1-868 (Trinidad and Tobago)" },
  { value: "+216", label: "+216 (Tunisia)" },
  { value: "+90", label: "+90 (Turkey)" },
  { value: "+993", label: "+993 (Turkmenistan)" },
  { value: "+1-649", label: "+1-649 (Turks and Caicos Islands)" },
  { value: "+688", label: "+688 (Tuvalu)" },
  { value: "+1-340", label: "+1-340 (U.S. Virgin Islands)" },
  { value: "+256", label: "+256 (Uganda)" },
  { value: "+380", label: "+380 (Ukraine)" },
  { value: "+971", label: "+971 (United Arab Emirates)" },
  { value: "+44", label: "+44 (United Kingdom)" },
  { value: "+1", label: "+1 (United States)" },
  { value: "+598", label: "+598 (Uruguay)" },
  { value: "+998", label: "+998 (Uzbekistan)" },
  { value: "+678", label: "+678 (Vanuatu)" },
  { value: "+379", label: "+379 (Vatican)" },
  { value: "+58", label: "+58 (Venezuela)" },
  { value: "+84", label: "+84 (Vietnam)" },
  { value: "+681", label: "+681 (Wallis and Futuna)" },
  { value: "+212", label: "+212 (Western Sahara)" },
  { value: "+967", label: "+967 (Yemen)" },
  { value: "+260", label: "+260 (Zambia)" },
  { value: "+263", label: "+263 (Zimbabwe)" },
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15),
  service: z.array(z.string()).min(1, "Please select at least one service"),
  businessCategory: z.string().max(1000).optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to continue"),
});

type FormData = z.infer<typeof formSchema>;
interface RegistrationFormProps {
  uniqueConsentId: string;
}

export default function RegistrationForm({ uniqueConsentId }: RegistrationFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<FormData>>({
    name: "",
    email: "",
    phone: "",
    service: [],
    businessCategory: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isServicesOpen, setIsServicesOpen] = useState(true); // mobile ke liye services toggle state

  // input refs
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  const validateField = (field: keyof FormData, value: unknown) => {
    try {
      const fieldSchema = (formSchema as any).shape[field];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    try {
      const validatedData = formSchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service ?? [],
        businessCategory: formData.businessCategory,
        consent: formData.consent,
      });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.message || "Something went wrong. Try again.");
        toast({
          title: "Submission Failed",
          description: result?.message || "Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you soon.",
      });

      navigate("/thank-you", {
        state: { name: validatedData.name, service: validatedData.service },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);

        toast({
          title: "Please check the form",
          description: "Some fields require your attention.",
          variant: "destructive",
        });

        const firstErrorField = error.errors[0]?.path?.[0];
        if (firstErrorField === "name") nameRef.current?.focus();
        else if (firstErrorField === "email") emailRef.current?.focus();
        else if (firstErrorField === "phone") phoneRef.current?.focus();
      } else {
        setApiError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleService = (serviceName: string, force?: boolean) => {
    const current = (formData.service as string[]) ?? [];
    const includes = current.includes(serviceName);

    let next: string[];
    if (typeof force === "boolean") {
      next = force ? (includes ? current : [...current, serviceName]) : current.filter((s) => s !== serviceName);
    } else {
      next = includes ? current.filter((s) => s !== serviceName) : [...current, serviceName];
    }

    setFormData({ ...formData, service: next });
    validateField("service", next);
  };

  return (
    <section id="contact" className="py-16 relative text-sm md:text-base">
      {/* decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/60 via-primary/30 to-primary/60 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-background" />
            </div>

            <div className="relative">
              <div className="bg-gradient-to-b from-card to-background p-4 sm:p-6 pb-3 sm:pb-4 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-base sm:text-lg md:text-3xl font-bold text-foreground mb-1 sm:mb-2"
                >
                  Get Your Free Consultation
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground text-xs sm:text-sm md:text-base"
                >
                  Transform your business with our expert digital solutions
                </motion.p>
              </div>

              {/* Form Container - NO SCROLL, just normal flow */}
              <div className="bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4 md:space-y-5"
                >
                  {/* Name */}
                  <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <Input
                      ref={nameRef}
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        validateField("name", e.target.value);
                      }}
                      className="pl-10 sm:pl-12 bg-background/80 border-border/60 focus:border-primary py-2.5 sm:py-3 text-sm sm:text-base w-full"
                      aria-label="Full name"
                      inputMode="text"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <Input
                      ref={emailRef}
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        validateField("email", e.target.value);
                      }}
                      className="pl-10 sm:pl-12 bg-background/80 border-border/60 focus:border-primary py-2.5 sm:py-3 text-sm sm:text-base w-full"
                      aria-label="Email address"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <div className="w-full sm:w-32 sm:flex-shrink-0">
                      <Select defaultValue="+91">
                        <SelectTrigger className="bg-background/80 border-border/60 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 relative w-full">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <Input
                        ref={phoneRef}
                        type="tel"
                        placeholder="Mobile no."
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          validateField("phone", e.target.value);
                        }}
                        className="pl-10 sm:pl-12 bg-background/80 border-border/60 focus:border-primary py-2.5 sm:py-3 text-sm sm:text-base w-full"
                        aria-label="Phone number"
                        inputMode="tel"
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-xs sm:text-sm -mt-2">{errors.phone}</p>
                  )}

                  {/* Services */}
   {/* Services */}
<div className="relative w-full">
  <div className="absolute left-3 top-4 text-muted-foreground z-10 pointer-events-none">
    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
  </div>

  <div className="pl-10 sm:pl-12">
    {/* Heading + Mobile Arrow */}
    <button
      type="button"
      className="flex w-full items-center justify-between mb-2"
      onClick={() => setIsServicesOpen((prev) => !prev)}
    >
      <p className="text-xs sm:text-sm text-muted-foreground text-left">
        Select Service(s) of Interest *
      </p>

      {/* Arrow sirf mobile pe */}
      <ChevronDown
        className={`w-4 h-4 sm:hidden transition-transform ${
          isServicesOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* Services List */}
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${
        !isServicesOpen ? "hidden sm:grid" : ""
      }`}
    >
      {services.map((svc) => {
        const checked = ((formData.service as string[]) ?? []).includes(svc);

        return (
          <div
            key={svc}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none rounded-md p-2.5 sm:p-3 hover:bg-background/60 w-full"
            role="button"
            tabIndex={0}
            onClick={() => toggleService(svc)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleService(svc);
              }
            }}
          >
            {/* Checkbox click parent ko trigger na kare */}
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={checked}
                onCheckedChange={(val) => toggleService(svc, Boolean(val))}
              />
            </div>

            <span className="text-xs sm:text-sm">{svc}</span>
          </div>
        );
      })}
    </div>

    {errors.service && (
      <p className="text-destructive text-xs sm:text-sm mt-1">
        {errors.service}
      </p>
    )}
  </div>
</div>



                  {/* Business Category */}
                  <div className="relative w-full">
                    <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Business Category / Notes (optional)</label>
                    <textarea
                      ref={notesRef}
                      placeholder="Describe your business or add any notes (optional)"
                      value={formData.businessCategory}
                      onChange={(e) => {
                        setFormData({ ...formData, businessCategory: e.target.value });
                        validateField("businessCategory", e.target.value);
                      }}
                      className="w-full min-h-[100px] sm:min-h-[120px] resize-none p-3 rounded-md bg-background/80 border border-border/60 focus:border-primary text-sm"
                      aria-label="Business category or notes"
                    />
                    {errors.businessCategory && (
                      <p className="text-destructive text-xs sm:text-sm mt-1">{errors.businessCategory}</p>
                    )}
                  </div>

                  {/* Consent */}
                {/* Consent */}
<div className="flex items-start gap-2 sm:gap-3 w-full">
  <Checkbox
    id={uniqueConsentId}
    checked={formData.consent}
    onCheckedChange={(checked) => {
      setFormData({ ...formData, consent: checked as boolean });
      validateField("consent", checked);
    }}
    className="mt-0.5 sm:mt-1 border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent flex-shrink-0"
    aria-describedby="consent-desc"
  />

  {/* YAHAN CHANGE HAI */}
  <label
    htmlFor={uniqueConsentId}
    onClick={(e) => {
      e.preventDefault();          // ⬅️ default label behaviour rok diya
      const next = !formData.consent; // ⬅️ current se ulta state
      setFormData({ ...formData, consent: next });
      validateField("consent", next);
    }}
    className="text-xs sm:text-sm text-muted-foreground leading-relaxed cursor-pointer"
  >
    I agree to receive information regarding my submitted application and updates from Avani Enterprises *
  </label>
</div>
{errors.consent && (
  <p className="text-destructive text-xs sm:text-sm -mt-3">{errors.consent}</p>
)}


                  {/* API ERROR */}
                  {apiError && (
                    <p className="text-destructive text-sm text-center mt-2">{apiError}</p>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full sm:w-[300px]"
                      disabled={isLoading}
                      aria-label="Submit registration form"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 justify-center">
                          Submit
                          <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
