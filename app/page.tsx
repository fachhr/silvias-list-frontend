import { TalentPoolForm } from '@/components/TalentPoolForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            Join Silvia's List
          </h1>
          <p className="text-lg sm:text-xl text-[var(--dark-600)] max-w-2xl mx-auto">
            Connect with top opportunities in Switzerland. Upload your CV and join our exclusive talent pool.
          </p>
        </header>

        {/* Main Form */}
        <main>
          <TalentPoolForm />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Silvia's List. All rights reserved.</p>
          <p className="mt-2">
            <a href="/terms" className="hover:text-primary underline">Terms & Conditions</a>
            {' • '}
            <a href="mailto:contact@silviaslist.com" className="hover:text-primary underline">Contact</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
