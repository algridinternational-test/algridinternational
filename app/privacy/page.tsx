import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { LocalizedText } from "../components/LocalizedText";
import { socialImage } from "../seo";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Algrid International handles information shared through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy — Algrid International", url: "/privacy", images: [socialImage] },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="editorial-page legal-page">
      <SiteHeader />
      <article>
        <header className="editorial-hero">
          <p className="editorial-kicker"><LocalizedText en="Legal / Last updated 3 August 2026" ms="Perundangan / Dikemas kini 3 Ogos 2026" /></p>
          <h1><LocalizedText en="Privacy, in plain language." ms="Privasi, dalam bahasa yang mudah." /></h1>
          <p className="editorial-intro">
            <LocalizedText en="This notice explains what happens when you contact Algrid International through this website." ms="Notis ini menerangkan apa yang berlaku apabila anda menghubungi Algrid International melalui laman web ini." />
          </p>
        </header>
        <div className="legal-copy">
          <section>
            <h2><LocalizedText en="Information you choose to share" ms="Maklumat yang anda pilih untuk dikongsi" /></h2>
            <p>
              <LocalizedText en="The project form securely submits the details you provide to our email service. We use that information to respond to your enquiry, assess project fit and continue the conversation you requested. The website does not create a marketing profile from your enquiry." ms="Borang projek menghantar butiran yang anda berikan dengan selamat kepada perkhidmatan e-mel kami. Kami menggunakan maklumat itu untuk menjawab pertanyaan anda, menilai kesesuaian projek dan meneruskan perbualan yang anda minta. Laman web ini tidak mencipta profil pemasaran daripada pertanyaan anda." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Website data" ms="Data laman web" /></h2>
            <p>
              <LocalizedText en="This version of the website does not use advertising trackers or an analytics product. Our hosting provider may process limited technical logs needed to deliver, secure and maintain the site, such as IP address, request time, device information and requested pages." ms="Versi laman web ini tidak menggunakan penjejak pengiklanan atau produk analitik. Penyedia pengehosan kami mungkin memproses log teknikal terhad yang diperlukan untuk menyampaikan, melindungi dan menyelenggara laman, seperti alamat IP, masa permintaan, maklumat peranti dan halaman yang diminta." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Sharing and retention" ms="Perkongsian dan penyimpanan" /></h2>
            <p>
              <LocalizedText en="We do not sell personal information. Information may be handled by service providers that support email, hosting or project delivery, only where needed for those functions. Enquiries are retained only while they are relevant to the conversation, a resulting business relationship or applicable record-keeping obligations." ms="Kami tidak menjual maklumat peribadi. Maklumat mungkin dikendalikan oleh penyedia perkhidmatan yang menyokong e-mel, pengehosan atau penyampaian projek, hanya apabila diperlukan untuk fungsi tersebut. Pertanyaan disimpan hanya selagi relevan kepada perbualan, hubungan perniagaan yang terhasil atau kewajipan penyimpanan rekod yang berkenaan." />
            </p>
          </section>
          <section>
            <h2><LocalizedText en="Your choices" ms="Pilihan anda" /></h2>
            <p>
              <LocalizedText en={<>You may ask what information we hold about you, request a correction or deletion, or withdraw from a conversation by emailing <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>. Some information may need to be retained where required by law or legitimate business records.</>} ms={<>Anda boleh bertanya maklumat yang kami simpan tentang anda, meminta pembetulan atau pemadaman, atau menarik diri daripada perbualan melalui e-mel <a href="mailto:social@algridinternational.com">social@algridinternational.com</a>. Sesetengah maklumat mungkin perlu disimpan jika dikehendaki undang-undang atau rekod perniagaan yang sah.</>} />
            </p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
