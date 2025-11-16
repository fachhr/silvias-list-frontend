import { TalentPoolForm } from '@/components/TalentPoolForm';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{
      background: 'var(--background-gradient)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Join Silvia's List
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90 max-w-2xl mx-auto">
            Connect with top opportunities in Switzerland. Upload your CV and join our exclusive talent pool.
          </p>
        </header>

        {/* Main Form */}
        <main>
          <TalentPoolForm />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-white opacity-75">
          <p>&copy; {new Date().getFullYear()} Silvia's List. All rights reserved.</p>
          <p className="mt-2">
            <a href="/terms" className="text-white hover:text-white underline hover:opacity-100">Terms & Conditions</a>
            {' • '}
            <a href="mailto:contact@silviaslist.com" className="text-white hover:text-white underline hover:opacity-100">Contact</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
