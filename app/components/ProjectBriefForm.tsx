"use client";

import { type FormEvent, useState } from "react";
import { useSiteLanguage } from "./useSiteLanguage";

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

const formCopy = {
  en: {
    head: "PROJECT BRIEF / SECURE INTAKE",
    reply: "Typically replies within 2 business days",
    name: "Your name",
    email: "Work email",
    company: "Company (optional)",
    phone: "Phone number",
    country: "APAC country or market",
    project: "What are we building?",
    timeline: "Preferred start",
    challenge: "What are you trying to change or launch?",
    selectCountry: "Select your market",
    selectProject: "Select a project type",
    selectTimeline: "Select a timeframe",
    challengePlaceholder:
      "Share the business context, the friction you see and what a strong outcome would look like.",
    submit: "Send project brief",
    submitting: "Sending brief…",
    privacy:
      "Your details are used only to assess and respond to this enquiry. They are never sold or used for unsolicited marketing.",
    sending: "Sending your project brief securely…",
    success:
      "Thank you. Your brief has been received and our team will reply within two business days.",
    error: "We could not send the form right now. Please email social@algridinternational.com directly.",
    emailLink: "Open email",
  },
  ms: {
    head: "RINGKASAN PROJEK / PENERIMAAN SELAMAT",
    reply: "Biasanya dibalas dalam 2 hari bekerja",
    name: "Nama anda",
    email: "E-mel kerja",
    company: "Syarikat (pilihan)",
    phone: "Nombor telefon",
    country: "Negara atau pasaran APAC",
    project: "Apakah yang ingin dibina?",
    timeline: "Masa mula pilihan",
    challenge: "Apakah yang ingin anda ubah atau lancarkan?",
    selectCountry: "Pilih pasaran anda",
    selectProject: "Pilih jenis projek",
    selectTimeline: "Pilih jangka masa",
    challengePlaceholder:
      "Kongsikan konteks perniagaan, cabaran semasa dan hasil kukuh yang anda sasarkan.",
    submit: "Hantar ringkasan projek",
    submitting: "Menghantar ringkasan…",
    privacy:
      "Maklumat anda hanya digunakan untuk menilai dan membalas pertanyaan ini. Ia tidak dijual atau digunakan untuk pemasaran tanpa diminta.",
    sending: "Menghantar ringkasan projek anda dengan selamat…",
    success:
      "Terima kasih. Ringkasan anda telah diterima dan pasukan kami akan membalas dalam dua hari bekerja.",
    error: "Borang tidak dapat dihantar sekarang. Sila e-mel social@algridinternational.com.",
    emailLink: "Buka e-mel",
  },
};

export function ProjectBriefForm({ className = "" }: { className?: string }) {
  const { language } = useSiteLanguage();
  const labels = formCopy[language];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitProjectBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setMessage(labels.sending);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
      setMessage(labels.success);
    } catch {
      setStatus("error");
      setMessage(labels.error);
    }
  }

  return (
    <div className={`contact-form-shell ${className}`.trim()}>
      <div className="contact-form-head">
        <span>{labels.head}</span>
        <i>{labels.reply}</i>
      </div>
      <form onSubmit={submitProjectBrief}>
        <label className="contact-honeypot" hidden>
          <span>Website</span>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <input
          name="preferredLanguage"
          type="hidden"
          value={language === "ms" ? "Bahasa Melayu" : "English"}
        />
        <div className="contact-fields">
          <label>
            <span>{labels.name} *</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>{labels.email} *</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>{labels.phone} *</span>
            <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+60" required />
          </label>
          <label>
            <span>{labels.country} *</span>
            <select name="country" defaultValue="" required>
              <option value="" disabled>{labels.selectCountry}</option>
              {apacCountries.map((country) => <option key={country}>{country}</option>)}
            </select>
          </label>
          <label>
            <span>{labels.company}</span>
            <input name="company" type="text" autoComplete="organization" />
          </label>
          <label>
            <span>{labels.project} *</span>
            <select name="projectType" defaultValue="" required>
              <option value="" disabled>{labels.selectProject}</option>
              <option>AI &amp; automation system</option>
              <option>Website or software platform</option>
              <option>Brand, packaging or creative system</option>
              <option>Growth and performance engine</option>
              <option>Business or product launch</option>
              <option>Multi-system transformation</option>
              <option>Long-term execution partnership</option>
            </select>
          </label>
          <label>
            <span>{labels.timeline} *</span>
            <select name="timeline" defaultValue="" required>
              <option value="" disabled>{labels.selectTimeline}</option>
              <option>As soon as possible</option>
              <option>Within 30 days</option>
              <option>Within 1–3 months</option>
              <option>Exploring the right approach</option>
            </select>
          </label>
          <label className="contact-message">
            <span>{labels.challenge} *</span>
            <textarea
              name="challenge"
              rows={5}
              minLength={10}
              placeholder={labels.challengePlaceholder}
              required
            />
          </label>
        </div>

        <button className="contact-submit" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? labels.submitting : labels.submit}
          <span aria-hidden="true">+</span>
        </button>
        <p className="contact-privacy">{labels.privacy}</p>
        <p className={`contact-status contact-status-${status}`} role="status" aria-live="polite">
          {message}
          {status === "error" ? (
            <> <a href="mailto:social@algridinternational.com">{labels.emailLink}</a>.</>
          ) : null}
        </p>
      </form>
    </div>
  );
}
