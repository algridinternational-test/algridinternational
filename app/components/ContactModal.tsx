"use client";

import {
  type FormEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { SiteLanguage } from "./useSiteLanguage";

const apacCountries = [
  "Australia",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "China",
  "Fiji",
  "Hong Kong",
  "India",
  "Indonesia",
  "Japan",
  "Laos",
  "Macau",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "New Zealand",
  "Pakistan",
  "Papua New Guinea",
  "Philippines",
  "Singapore",
  "South Korea",
  "Sri Lanka",
  "Taiwan",
  "Thailand",
  "Timor-Leste",
  "Vietnam",
  "Other APAC market",
];

const copy = {
  en: {
    eyebrow: "CONTACT / SECURE ENQUIRY",
    title: "Tell us what you’re building.",
    intro:
      "Share the essentials. A senior Algrid team member will review your enquiry and respond within two business days.",
    name: "Name",
    email: "Work email",
    phone: "Phone number",
    country: "APAC country or market",
    company: "Company name (optional)",
    challenge: "How can we help?",
    challengePlaceholder: "Briefly describe the opportunity, challenge or product you want to build.",
    selectCountry: "Select your market",
    submit: "Send enquiry",
    submitting: "Sending enquiry…",
    close: "Close contact form",
    privacy:
      "Your information is used only to review and respond to this enquiry.",
    success: "Thank you. Your enquiry has been received.",
    error:
      "We could not send your enquiry. Please email social@algridinternational.com.",
  },
  ms: {
    eyebrow: "HUBUNGI / PERTANYAAN SELAMAT",
    title: "Ceritakan apa yang ingin anda bina.",
    intro:
      "Kongsikan maklumat penting. Pasukan kanan Algrid akan meneliti pertanyaan anda dan membalas dalam dua hari bekerja.",
    name: "Nama",
    email: "E-mel kerja",
    phone: "Nombor telefon",
    country: "Negara atau pasaran APAC",
    company: "Nama syarikat (pilihan)",
    challenge: "Bagaimana kami boleh membantu?",
    challengePlaceholder: "Terangkan secara ringkas peluang, cabaran atau produk yang ingin anda bina.",
    selectCountry: "Pilih pasaran anda",
    submit: "Hantar pertanyaan",
    submitting: "Menghantar pertanyaan…",
    close: "Tutup borang hubungi",
    privacy:
      "Maklumat anda hanya digunakan untuk meneliti dan membalas pertanyaan ini.",
    success: "Terima kasih. Pertanyaan anda telah diterima.",
    error:
      "Pertanyaan tidak dapat dihantar. Sila e-mel social@algridinternational.com.",
  },
};

type ContactModalProps = {
  language: SiteLanguage;
  onClose: () => void;
};

export function ContactModal({ language, onClose }: ContactModalProps) {
  const labels = copy[language];
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href]',
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-modal-backdrop" onMouseDown={closeFromBackdrop}>
      <section
        ref={dialogRef}
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button className="contact-modal-close" type="button" onClick={onClose} aria-label={labels.close}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="contact-modal-copy">
          <p>{labels.eyebrow}</p>
          <h2 id={titleId}>{labels.title}</h2>
          <span>{labels.intro}</span>
        </div>
        <form onSubmit={submitEnquiry}>
          <input name="website" className="contact-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input name="projectType" type="hidden" value="Website contact enquiry" />
          <input name="timeline" type="hidden" value="To be discussed" />
          <input name="preferredLanguage" type="hidden" value={language === "ms" ? "Bahasa Melayu" : "English"} />
          <div className="contact-modal-fields">
            <label>
              <span>{labels.name} *</span>
              <input ref={firstFieldRef} name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>{labels.email} *</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>{labels.phone} *</span>
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
            </label>
            <label>
              <span>{labels.country} *</span>
              <select name="country" defaultValue="" required>
                <option value="" disabled>{labels.selectCountry}</option>
                {apacCountries.map((country) => <option key={country}>{country}</option>)}
              </select>
            </label>
            <label className="contact-modal-company">
              <span>{labels.company}</span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label className="contact-modal-message">
              <span>{labels.challenge} *</span>
              <textarea name="challenge" rows={4} placeholder={labels.challengePlaceholder} minLength={10} required />
            </label>
          </div>
          <button className="contact-submit" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? labels.submitting : labels.submit}
            <span aria-hidden="true">+</span>
          </button>
          <p className="contact-modal-privacy">{labels.privacy}</p>
          <p className={`contact-modal-status contact-modal-status-${status}`} role="status" aria-live="polite">
            {status === "success" ? labels.success : status === "error" ? labels.error : ""}
          </p>
        </form>
      </section>
    </div>
  );
}
