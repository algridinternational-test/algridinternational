import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { LocalizedText } from "../components/LocalizedText";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms for using the Algrid International website.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Website Terms — Algrid International", url: "/terms", images: [socialImage] },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
};

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page legal-page">
      <SiteHeader />
      <article>
        <header className="editorial-hero">
          <p className="editorial-kicker"><LocalizedText en="Legal / Last updated 28 July 2026" ms="Perundangan / Dikemas kini 28 Julai 2026" /></p>
          <h1><LocalizedText en="Website terms." ms="Terma laman web." /></h1>
          <p className="editorial-intro">
            <LocalizedText en="These terms apply when you browse and use the Algrid International website." ms="Terma ini terpakai apabila anda melayari dan menggunakan laman web Algrid International." />
          </p>
        </header>
        <div className="legal-copy">
          <section>
            <h2><LocalizedText en="Information, not professional advice" ms="Maklumat, bukan nasihat profesional" /></h2>
            <p>
              <LocalizedText en="The site provides general information about our approach and capabilities. It is not legal, financial, medical or other regulated professional advice. Project scope, deliverables, fees and responsibilities are agreed separately in writing." ms="Laman ini menyediakan maklumat umum tentang pendekatan dan keupayaan kami. Ia bukan nasihat profesional undang-undang, kewangan, perubatan atau nasihat terkawal lain. Skop projek, hasil kerja, yuran dan tanggungjawab dipersetujui secara berasingan secara bertulis." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Demonstrations and estimates" ms="Demonstrasi dan anggaran" /></h2>
            <p>
              <LocalizedText en="Interactive tools, interface previews, opportunity maps and calculators are illustrative. Their outputs are not forecasts, guarantees or a substitute for analysis using your actual business data. Product build-time ranges are initial planning guides and may change after discovery." ms="Alat interaktif, pratonton antara muka, peta peluang dan kalkulator adalah untuk ilustrasi. Hasilnya bukan ramalan, jaminan atau pengganti analisis menggunakan data perniagaan sebenar anda. Julat masa pembangunan produk ialah panduan perancangan awal dan mungkin berubah selepas fasa penemuan." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Intellectual property" ms="Harta intelek" /></h2>
            <p>
              <LocalizedText en="Unless stated otherwise, the site’s design, text, graphics and original materials belong to Algrid International or are used with permission. You may view and share links to the site, but may not reproduce or commercially reuse its contents without written permission." ms="Melainkan dinyatakan sebaliknya, reka bentuk, teks, grafik dan bahan asal laman ini milik Algrid International atau digunakan dengan kebenaran. Anda boleh melihat dan berkongsi pautan ke laman, tetapi tidak boleh menghasilkan semula atau menggunakan kandungannya secara komersial tanpa kebenaran bertulis." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Availability and third-party links" ms="Ketersediaan dan pautan pihak ketiga" /></h2>
            <p>
              <LocalizedText en="We aim to keep the site accurate and available but cannot promise uninterrupted access or that every item will remain current. External websites and services are governed by their own terms and privacy practices." ms="Kami berusaha memastikan laman ini tepat dan tersedia tetapi tidak dapat menjanjikan akses tanpa gangguan atau setiap perkara sentiasa terkini. Laman dan perkhidmatan luaran tertakluk kepada terma serta amalan privasi mereka sendiri." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Contact" ms="Hubungi" /></h2>
            <p>
              <LocalizedText en={<>Questions about these terms can be sent to <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>.</>} ms={<>Pertanyaan tentang terma ini boleh dihantar kepada <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>.</>} />
            </p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
