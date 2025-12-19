import {
  Mail,
  Instagram,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-8 mb-6">
            Contact & Official Updates
          </h1>
          <p className="text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed">
            IIITians Network is built for visibility, coordination, and
            collaboration across all IIITs. Reach us through official
            channels or apply for recruitment and verified updates.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* EMAIL */}
          <div className="group border rounded-2xl p-6 transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-indigo-600" />
              <h2 className="text-lg font-semibold">
                Official Email
              </h2>
            </div>
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              Formal communication, partnerships, and verification
              requests.
            </p>
            <a
              href="mailto:contact@iiitians.network"
              className="text-indigo-600 font-medium hover:underline break-all"
            >
              contact@iiitians.network
            </a>
          </div>

          {/* INSTAGRAM */}
          <div className="group border rounded-2xl p-6 transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Instagram className="text-pink-600" />
              <h2 className="text-lg font-semibold">
                Instagram
              </h2>
            </div>
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              Announcements, highlights, events, and community
              engagement.
            </p>
            <a
              href="https://instagram.com/iiitians_network"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              @iiitians_network
            </a>
          </div>

          {/* INFO */}
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">
              Transparency Note
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This platform is publicly accessible and informational.
              There is no user login or profile system. Administrative
              actions and updates are managed internally by the core
              team.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 border rounded-3xl p-8 sm:p-12 bg-black text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Recruitment & Verified IIIT Updates
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Want to contribute to IIITians Network or receive official
              updates? Submit the form below. Every response is manually
              reviewed by the admin team.
            </p>

            <a
              href="https://forms.gle/YOUR_FORM_LINK"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                bg-white text-black
                px-7 py-3 rounded-lg
                font-semibold
                hover:bg-gray-200 transition
              "
            >
              Open Application Form
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
