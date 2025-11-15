import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--light)] rounded-xl shadow-lg p-8 sm:p-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="text-primary hover:text-primary-dark underline text-sm mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
              Terms and Conditions
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2>1. Talent Pool Participation</h2>
            <p>
              By joining Silvia's List talent pool, you agree to allow us to:
            </p>
            <ul>
              <li>Store and process your professional information</li>
              <li>Share your profile with potential employers and clients</li>
              <li>Contact you about relevant job opportunities</li>
              <li>Use AI technology to extract information from your CV</li>
            </ul>

            <h2>2. Data Collection and Use</h2>
            <p>
              We collect and process the following types of information:
            </p>

            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Personal contact details (name, email, phone number, LinkedIn)</li>
              <li>Professional preferences (job types, locations, industries, salary expectations)</li>
              <li>Work availability and capacity</li>
              <li>Your uploaded CV document</li>
            </ul>

            <h3>2.2 Information We Extract</h3>
            <p>
              Using AI-powered CV parsing, we automatically extract:
            </p>
            <ul>
              <li>Education history and qualifications</li>
              <li>Professional work experience</li>
              <li>Skills and competencies (technical, soft, industry-specific)</li>
              <li>Languages and proficiency levels</li>
              <li>Certifications and professional licenses</li>
              <li>Projects and achievements</li>
              <li>Profile picture (if present in your CV)</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>
              Your information is used for the following purposes:
            </p>
            <ul>
              <li>
                <strong>Job Matching:</strong> To identify and match you with suitable job opportunities
              </li>
              <li>
                <strong>Profile Sharing:</strong> To share your profile with potential employers and clients who have relevant positions
              </li>
              <li>
                <strong>Communication:</strong> To contact you about job opportunities, updates, and important information
              </li>
              <li>
                <strong>Service Improvement:</strong> To analyze trends and improve our talent pool platform
              </li>
            </ul>

            <h2>4. Data Storage and Security</h2>
            <h3>4.1 Where We Store Your Data</h3>
            <p>
              Your data is stored securely using Supabase (PostgreSQL database) and Amazon Web Services (AWS) infrastructure, with servers located in Europe to comply with Swiss and EU data protection requirements.
            </p>

            <h3>4.2 Security Measures</h3>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure database access controls</li>
              <li>Regular security updates and monitoring</li>
              <li>Access limited to authorized personnel only</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your profile data as long as you remain in our talent pool. Your data will be retained for:
            </p>
            <ul>
              <li>
                <strong>Active Period:</strong> As long as you're actively seeking opportunities (indefinitely, until you request deletion)
              </li>
              <li>
                <strong>After Deletion Request:</strong> Up to 30 days for backup and system cleanup purposes
              </li>
            </ul>

            <h2>6. Your Rights (GDPR & Swiss Data Protection)</h2>
            <p>
              Under the General Data Protection Regulation (GDPR) and Swiss Federal Act on Data Protection (FADP), you have the following rights:
            </p>

            <h3>6.1 Right to Access</h3>
            <p>
              You can request a copy of all personal data we hold about you.
            </p>

            <h3>6.2 Right to Rectification</h3>
            <p>
              You can request correction of inaccurate or incomplete data.
            </p>

            <h3>6.3 Right to Erasure ("Right to be Forgotten")</h3>
            <p>
              You can request deletion of your profile and all associated data at any time.
            </p>

            <h3>6.4 Right to Data Portability</h3>
            <p>
              You can request your data in a structured, machine-readable format.
            </p>

            <h3>6.5 Right to Object</h3>
            <p>
              You can object to processing of your data for specific purposes.
            </p>

            <h3>6.6 Right to Withdraw Consent</h3>
            <p>
              You can withdraw your consent to data processing at any time.
            </p>

            <p className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <strong>To exercise any of these rights, contact us at:</strong>
              <br />
              Email: <a href="mailto:privacy@silviaslist.com" className="text-primary hover:underline">privacy@silviaslist.com</a>
              <br />
              We will respond to your request within 30 days.
            </p>

            <h2>7. Data Sharing</h2>
            <p>
              We share your profile data with:
            </p>
            <ul>
              <li>
                <strong>Potential Employers:</strong> Companies and organizations with job openings that match your profile
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party services that help us operate our platform (hosting, email, analytics)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our legal rights
              </li>
            </ul>

            <p>
              <strong>We will never:</strong>
            </p>
            <ul>
              <li>Sell your personal data to third parties</li>
              <li>Share your data with unrelated companies for marketing purposes</li>
              <li>Use your data for purposes other than talent matching and related services</li>
            </ul>

            <h2>8. Cookies and Tracking</h2>
            <p>
              Our website uses minimal cookies for:
            </p>
            <ul>
              <li>Session management</li>
              <li>Security and fraud prevention</li>
              <li>Analytics (anonymized)</li>
            </ul>
            <p>
              We do not use tracking cookies for advertising purposes.
            </p>

            <h2>9. AI and Automated Processing</h2>
            <p>
              We use OpenAI's GPT-4 technology to automatically extract information from your CV. This processing:
            </p>
            <ul>
              <li>Is performed to save you time and improve accuracy</li>
              <li>Can be reviewed and corrected by you upon request</li>
              <li>Does not involve automated decision-making that significantly affects you without human review</li>
            </ul>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Significant changes will be communicated via email. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>

            <h2>12. Liability and Disclaimers</h2>
            <ul>
              <li>We make no guarantees about job placement or interview opportunities</li>
              <li>We are not responsible for the hiring decisions of employers</li>
              <li>We strive for accuracy in CV parsing but cannot guarantee 100% accuracy</li>
              <li>You are responsible for ensuring the information you provide is accurate and up-to-date</li>
            </ul>

            <h2>13. Governing Law</h2>
            <p>
              These terms are governed by Swiss law. Any disputes will be resolved in the courts of Switzerland.
            </p>

            <h2>14. Contact Information</h2>
            <p>
              For questions about these terms or our data practices:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@silviaslist.com" className="text-primary hover:underline">
                  privacy@silviaslist.com
                </a>
              </li>
              <li>
                <strong>General Inquiries:</strong>{' '}
                <a href="mailto:contact@silviaslist.com" className="text-primary hover:underline">
                  contact@silviaslist.com
                </a>
              </li>
            </ul>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 my-8">
              <h3 className="text-xl font-semibold mb-2">Data Protection Officer</h3>
              <p>
                If you have concerns about how we handle your personal data, you can also contact the Swiss Federal Data Protection and Information Commissioner (FDPIC):
              </p>
              <p className="mt-2">
                <strong>FDPIC Website:</strong>{' '}
                <a
                  href="https://www.edoeb.admin.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.edoeb.admin.ch
                </a>
              </p>
            </div>

            <h2>15. Acceptance of Terms</h2>
            <p>
              By submitting your profile to Silvia's List, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>

            <p className="text-center mt-12 pt-8 border-t border-gray-200">
              <strong>Thank you for joining Silvia's List!</strong>
              <br />
              We're committed to protecting your privacy and helping you find great opportunities.
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[var(--button-text-on-primary)] bg-primary hover:bg-primary-dark transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
