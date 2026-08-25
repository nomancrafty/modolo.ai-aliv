import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ArrowRight, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/useMotion";

/* Copy, fields, consent text, webhook and submit flow are all unchanged.
   Only the presentation is new: a ruled two-column brief instead of a
   centered card. */

const CTA = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    email: "",
    message: "",
    transactionalConsent: false,
    marketingConsent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const ref = useReveal<HTMLDivElement>({ threshold: 0.08, stagger: 45 });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "First name, email, and phone number are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://n8n.srv942069.hstgr.cloud/webhook/082b648b-0108-4b64-8172-ad2ceb309ece", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          transactionalConsent: formData.transactionalConsent,
          marketingConsent: formData.marketingConsent,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Consultation Request Received!",
          description: "We'll be in touch within 24 hours.",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const auditFeatures = [
    "Front-desk performance audit",
    "Google & online visibility analysis",
    "Appointment conversion review",
    "Custom AI growth plan",
  ];

  const trustBadges = [
    "No credit card required",
    "Live in days, not months",
    "No long-term contracts",
  ];

  return (
    <section id="cta" className="band-ink py-[var(--chapter-y)]">
      <div ref={ref} className="shell">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
          {/* ---------- The brief ---------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-8 rv">Book AI Free Consultation</p>

              <h2 className="display-lg text-ink rv-wipe mb-6">
                Discover How Many Patients &amp; Clients You&rsquo;re Losing Right
                Now
              </h2>

              <p className="prose-body rv mb-12">
                In 3 minutes, see exactly where calls, bookings, and follow-ups
                are slipping through the cracks.
              </p>

              <ul className="border-t border-ink mb-12">
                {auditFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="rv flex items-baseline gap-5 py-4 border-b border-rule text-[0.9375rem] text-on-ink"
                  >
                    <Check
                      className="w-4 h-4 text-coral-bright shrink-0 translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+18884872171"
                className="rv inline-flex items-center gap-3 group min-h-[44px] py-2"
              >
                <Phone
                  className="w-4 h-4 text-on-ink-muted group-hover:text-coral-bright transition-colors"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="figure text-xl text-on-ink link-rule">
                  (888) 487-2171
                </span>
              </a>
            </div>
          </div>

          {/* ---------- The form ---------- */}
          <div className="lg:col-span-7">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="rv panel p-[clamp(1.5rem,4vw,3rem)]"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mb-7">
                  <div>
                    <label htmlFor="firstName" className="field-label">
                      First Name <span className="text-coral-ink">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="field-label">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="field"
                    />
                  </div>
                </div>

                <div className="mb-7">
                  <label htmlFor="companyName" className="field-label">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="field"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mb-7">
                  <div>
                    <label htmlFor="phone" className="field-label">
                      Phone Number <span className="text-coral-ink">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      Email <span className="text-coral-ink">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="field"
                      required
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <label htmlFor="message" className="field-label">
                    Write your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="field"
                    rows={4}
                  />
                </div>

                {/* Consent — wording unchanged */}
                <div className="space-y-6 mb-10 pt-8 border-t border-rule">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="transactionalConsent"
                      checked={formData.transactionalConsent}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("transactionalConsent", checked as boolean)
                      }
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-none border-stone-mid data-[state=checked]:bg-coral-ink data-[state=checked]:border-coral-ink data-[state=checked]:text-white relative before:absolute before:content-[''] before:-inset-[13px]"
                    />
                    <label
                      htmlFor="transactionalConsent"
                      className="text-xs text-stone-mid leading-relaxed cursor-pointer"
                    >
                      By checking this box, I consent to receive transactional messages related to my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency may vary. Message &amp; Data rates may apply. Reply HELP for help or STOP to opt-out.
                    </label>
                  </div>

                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("marketingConsent", checked as boolean)
                      }
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-none border-stone-mid data-[state=checked]:bg-coral-ink data-[state=checked]:border-coral-ink data-[state=checked]:text-white relative before:absolute before:content-[''] before:-inset-[13px]"
                    />
                    <label
                      htmlFor="marketingConsent"
                      className="text-xs text-stone-mid leading-relaxed cursor-pointer"
                    >
                      By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message &amp; Data rates may apply. Reply HELP for help or STOP to opt-out.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-ink w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending…" : "Book Now"}</span>
                  {!isSubmitting && (
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                <p className="text-sm text-stone-mid mt-8">
                  No obligation. No pressure. Keep the plan.
                </p>
              </form>
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="panel p-[clamp(1.5rem,4vw,3rem)]"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-8 h-8 shrink-0 bg-coral-ink flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <h3 className="display-sm text-ink">
                    Consultation Request Submitted!
                  </h3>
                </div>
                <p className="prose-body">
                  We&rsquo;ll be in touch within 24 hours with your personalized
                  consultation.
                </p>
              </div>
            )}

            {/* Trust badges */}
            <ul className="flex flex-wrap gap-x-10 gap-y-4 mt-10">
              {trustBadges.map((badge) => (
                <li key={badge} className="rv flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-[5px] h-[5px] rotate-45 bg-coral-bright"
                  />
                  <span className="label text-on-ink-muted">{badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Closing line ---------- */}
        <div className="mt-[clamp(5rem,11vw,9rem)] pt-14 border-t border-ink grid gap-x-16 gap-y-10 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <h3 className="display-md text-on-ink mb-5 rv">
              Ready to Grow Your Medical, Dental or Law Practice?
            </h3>
            <p className="prose-body rv">
              Every day without AI is another day patients and clients book with
              a faster competitor.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <button
              onClick={() => {
                document
                  .querySelector("#cta form")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="btn-ink rv"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
