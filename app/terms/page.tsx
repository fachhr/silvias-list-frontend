'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('');
  const [tocOpen, setTocOpen] = useState(false);

  const sections = [
    { id: 'section-1', title: 'Talent Pool Participation', number: 1 },
    { id: 'section-2', title: 'Data Collection and Use', number: 2 },
    { id: 'section-3', title: 'How We Use Your Data', number: 3 },
    { id: 'section-4', title: 'Data Storage and Security', number: 4 },
    { id: 'section-5', title: 'Data Retention', number: 5 },
    { id: 'section-6', title: 'Your Rights (GDPR & Swiss)', number: 6 },
    { id: 'section-7', title: 'Data Sharing', number: 7 },
    { id: 'section-8', title: 'Cookies and Tracking', number: 8 },
    { id: 'section-9', title: 'AI and Automated Processing', number: 9 },
    { id: 'section-10', title: "Children's Privacy", number: 10 },
    { id: 'section-11', title: 'Changes to Terms', number: 11 },
    { id: 'section-12', title: 'Liability and Disclaimers', number: 12 },
    { id: 'section-13', title: 'Governing Law', number: 13 },
    { id: 'section-14', title: 'Contact Information', number: 14 },
    { id: 'section-15', title: 'Acceptance of Terms', number: 15 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--light)] border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="lg:hidden text-primary hover:text-primary-dark font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Contents
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
                Contents
              </h2>
              <nav className="space-y-1">
                {sections.map(({ id, title, number }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all ${
                      activeSection === id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:text-[var(--foreground)] hover:bg-gray-50'
                    }`}
                  >
                    <span className="opacity-60 mr-2">{number}.</span>
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Table of Contents - Mobile */}
          {tocOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setTocOpen(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-[var(--light)] shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Contents</h2>
                  <button onClick={() => setTocOpen(false)} className="text-gray-500 hover:text-[var(--foreground)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="space-y-1">
                  {sections.map(({ id, title, number }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all ${
                        activeSection === id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-600 hover:text-[var(--foreground)] hover:bg-gray-50'
                      }`}
                    >
                      <span className="opacity-60 mr-2">{number}.</span>
                      {title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-[var(--light)] rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12">
              {/* Title Section */}
              <div className="mb-12 pb-8 border-b border-gray-200">
                <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
                  Terms and Conditions
                </h1>
                <p className="text-gray-600 text-lg">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Content */}
              <div className="space-y-16">
                {/* Section 1 */}
                <section id="section-1" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">1</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Talent Pool Participation
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        By joining Silvia's List talent pool, you agree to allow us to:
                      </p>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Store and process your professional information</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Share your profile with potential employers and clients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Contact you about relevant job opportunities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Use AI technology to extract information from your CV</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="section-2" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">2</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Data Collection and Use
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6 text-base">
                        We collect and process the following types of information:
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                            2.1 Information You Provide
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Personal contact details (name, email, phone number, LinkedIn)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Professional preferences (job types, locations, industries, salary expectations)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Work availability and capacity</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Your uploaded CV document</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                            2.2 Information We Extract
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4 text-base">
                            Using AI-powered CV parsing, we automatically extract:
                          </p>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Education history and qualifications</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Professional work experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Skills and competencies (technical, soft, industry-specific)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Languages and proficiency levels</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Certifications and professional licenses</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Projects and achievements</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Profile picture (if present in your CV)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="section-3" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">3</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        How We Use Your Data
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        Your information is used for the following purposes:
                      </p>
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Job Matching:</strong> To identify and match you with suitable job opportunities
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Profile Sharing:</strong> To share your profile with potential employers and clients who have relevant positions
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Communication:</strong> To contact you about job opportunities, updates, and important information
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Service Improvement:</strong> To analyze trends and improve our talent pool platform
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section id="section-4" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">4</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                        Data Storage and Security
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                            4.1 Where We Store Your Data
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-base">
                            Your data is stored securely using Supabase (PostgreSQL database) and Amazon Web Services (AWS) infrastructure, with servers located in Europe to comply with Swiss and EU data protection requirements.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                            4.2 Security Measures
                          </h3>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Encrypted data transmission (HTTPS/TLS)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Secure database access controls</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Regular security updates and monitoring</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>Access limited to authorized personnel only</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="section-5" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">5</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Data Retention
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        We retain your profile data as long as you remain in our talent pool. Your data will be retained for:
                      </p>
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Active Period:</strong> As long as you're actively seeking opportunities (indefinitely, until you request deletion)
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">After Deletion Request:</strong> Up to 30 days for backup and system cleanup purposes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section id="section-6" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">6</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Your Rights (GDPR & Swiss Data Protection)
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6 text-base">
                        Under the General Data Protection Regulation (GDPR) and Swiss Federal Act on Data Protection (FADP), you have the following rights:
                      </p>

                      <div className="space-y-5">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.1 Right to Access
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can request a copy of all personal data we hold about you.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.2 Right to Rectification
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can request correction of inaccurate or incomplete data.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.3 Right to Erasure ("Right to be Forgotten")
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can request deletion of your profile and all associated data at any time.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.4 Right to Data Portability
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can request your data in a structured, machine-readable format.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.5 Right to Object
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can object to processing of your data for specific purposes.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                            6.6 Right to Withdraw Consent
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            You can withdraw your consent to data processing at any time.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 bg-primary/5 border-l-4 border-primary rounded-r-lg p-5">
                        <p className="text-[var(--foreground)] font-semibold mb-2">
                          To exercise any of these rights, contact us at:
                        </p>
                        <p className="text-gray-700 mb-1">
                          Email: <a href="mailto:privacy@silviaslist.com" className="text-primary hover:text-primary-dark underline font-medium">privacy@silviaslist.com</a>
                        </p>
                        <p className="text-gray-600 text-sm mt-3">
                          We will respond to your request within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section id="section-7" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">7</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Data Sharing
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        We share your profile data with:
                      </p>
                      <div className="space-y-4 mb-6">
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Potential Employers:</strong> Companies and organizations with job openings that match your profile
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Service Providers:</strong> Third-party services that help us operate our platform (hosting, email, analytics)
                          </p>
                        </div>
                        <div className="border-l-4 border-primary/30 pl-4 py-2">
                          <p className="text-gray-700">
                            <strong className="text-[var(--foreground)]">Legal Requirements:</strong> When required by law or to protect our legal rights
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <p className="text-[var(--foreground)] font-semibold mb-3">We will never:</p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                            <span>Sell your personal data to third parties</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                            <span>Share your data with unrelated companies for marketing purposes</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                            <span>Use your data for purposes other than talent matching and related services</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section id="section-8" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">8</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Cookies and Tracking
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        Our website uses minimal cookies for:
                      </p>
                      <ul className="space-y-3 text-gray-700 mb-4">
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Session management</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Security and fraud prevention</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Analytics (anonymized)</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-base">
                        We do not use tracking cookies for advertising purposes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 9 */}
                <section id="section-9" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">9</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        AI and Automated Processing
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        We use OpenAI's GPT-4 technology to automatically extract information from your CV. This processing:
                      </p>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Is performed to save you time and improve accuracy</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Can be reviewed and corrected by you upon request</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>Does not involve automated decision-making that significantly affects you without human review</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 10 */}
                <section id="section-10" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">10</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Children's Privacy
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 11 */}
                <section id="section-11" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">11</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Changes to Terms
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-base">
                        We may update these terms from time to time. Significant changes will be communicated via email. Continued use of our services after changes constitutes acceptance of the new terms.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 12 */}
                <section id="section-12" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">12</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Liability and Disclaimers
                      </h2>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span>We make no guarantees about job placement or interview opportunities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span>We are not responsible for the hiring decisions of employers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span>We strive for accuracy in CV parsing but cannot guarantee 100% accuracy</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span>You are responsible for ensuring the information you provide is accurate and up-to-date</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 13 */}
                <section id="section-13" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">13</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Governing Law
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-base">
                        These terms are governed by Swiss law. Any disputes will be resolved in the courts of Switzerland.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 14 */}
                <section id="section-14" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">14</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Contact Information
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4 text-base">
                        For questions about these terms or our data practices:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-600">Privacy Inquiries</p>
                            <a href="mailto:privacy@silviaslist.com" className="text-primary hover:text-primary-dark font-medium">
                              privacy@silviaslist.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-600">General Inquiries</p>
                            <a href="mailto:contact@silviaslist.com" className="text-primary hover:text-primary-dark font-medium">
                              contact@silviaslist.com
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                          Data Protection Officer
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          If you have concerns about how we handle your personal data, you can also contact the Swiss Federal Data Protection and Information Commissioner (FDPIC):
                        </p>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <a
                            href="https://www.edoeb.admin.ch"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark font-medium text-sm"
                          >
                            www.edoeb.admin.ch
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 15 */}
                <section id="section-15" className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">15</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        Acceptance of Terms
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-base">
                        By submitting your profile to Silvia's List, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Closing Section */}
                <div className="mt-16 pt-8 border-t-2 border-gray-200">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                      Thank you for joining Silvia's List!
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We're committed to protecting your privacy and helping you find great opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-12 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-base font-medium text-[var(--button-text-on-primary)] bg-primary hover:bg-primary-dark transition-all shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
