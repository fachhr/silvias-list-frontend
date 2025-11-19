import { Suspense } from 'react';
import TalentPoolContent from '@/components/talent-pool/TalentPoolContent';
import { Loader2 } from 'lucide-react';

// New Minimal Loading Component
function TalentPoolLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Loading talent pool...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<TalentPoolLoading />}>
      <TalentPoolContent />
    </Suspense>
  );
}