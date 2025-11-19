'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Briefcase, ChevronDown, Mail,
  ArrowRight, DollarSign, Clock, Menu, X, Loader2
} from 'lucide-react';
import { Badge, Button } from '@/components/ui/DesignSystem';
import { AnonymizedTalentProfile, TalentPoolListResponse } from '@/types/talentPool';
import {
  formatSalary,
  formatEntryDate,
  formatYearsExperience,
} from '@/lib/utils/talentPoolHelpers';
import { LOCATION_OPTIONS } from '@/lib/formOptions';

// Constants
const SENIORITY_LEVELS = [
  { label: 'Junior (0-2 years)', value: 'junior' },
  { label: 'Mid-level (3-6 years)', value: 'mid' },
  { label: 'Senior (7+ years)', value: 'senior' },
];

export default function TalentPoolContent() {
  // --- STATE ---
  const [candidates, setCandidates] = useState<AnonymizedTalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCantons, setSelectedCantons] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [salaryMax, setSalaryMax] = useState<number>(250000);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // Map filters to API params
        if (selectedSeniority.length > 0) {
          // API expects single seniority or handled differently, 
          // for now we take the highest level or just pass 'all' if mixed
          // Assuming your API can handle basic filtering, or we filter client side
          params.set('seniority', selectedSeniority[0]);
        }
        if (selectedCantons.length > 0) {
          params.set('cantons', selectedCantons.join(','));
        }

        // We request all and filter text search client side for smoother UI
        params.set('limit', '100');
        params.set('salary_max', salaryMax.toString());

        const res = await fetch(`/api/talent-pool/list?${params.toString()}`);
        const data: TalentPoolListResponse = await res.json();

        if (data.success) {
          setCandidates(data.data.candidates);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the fetch slightly
    const timer = setTimeout(fetchCandidates, 300);
    return () => clearTimeout(timer);
  }, [selectedCantons, selectedSeniority, salaryMax]);

  // --- CLIENT SIDE FILTERING (For Text Search) ---
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      // Text Search (ID, Experience, or raw text if available)
      const searchContent = `${c.talent_id} ${c.seniority_level}`.toLowerCase();
      if (searchTerm && !searchContent.includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [candidates, searchTerm]);

  // --- HANDLERS ---
  const toggleCanton = (code: string) => {
    setSelectedCantons(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleSeniority = (value: string) => {
    setSelectedSeniority(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    );
  };

  const formatCurrency = (val: number | null) => {
    if (!val) return 'N/A';
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumSignificantDigits: 3 }).format(val);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
              <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg font-serif">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">Silvia's<span className="font-light text-slate-500">List</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/join" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">For Talent</Link>
              <div className="h-4 w-px bg-slate-200"></div>
              <Link href="/join">
                <Button variant="primary" icon={ArrowRight}>Join the List</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 shadow-lg">
            <Link href="/join" className="block text-sm font-medium text-slate-600 hover:text-slate-900">For Talent</Link>
            <Link href="/join" className="block w-full"><Button className="w-full">Join the List</Button></Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge style="outline" className="mb-6">Switzerland's #1 Tech Talent Pool</Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Discover exceptional <br className="hidden sm:block" />
            <span className="text-slate-900 underline decoration-slate-300 decoration-4 underline-offset-4">tech talent</span>.
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Browse pre-screened professionals in Zurich, Geneva, and beyond.
            Skip the recruiters and connect directly with candidates ready for their next opportunity.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">

            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all group-hover:border-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Seniority Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Seniority
              </h3>
              <div className="space-y-2.5">
                {SENIORITY_LEVELS.map((level) => (
                  <label key={level.value} className="flex items-center gap-3 group cursor-pointer select-none">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 cursor-pointer transition-colors"
                        checked={selectedSeniority.includes(level.value)}
                        onChange={() => toggleSeniority(level.value)}
                      />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Canton Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Preferred Location
              </h3>
              <div className="flex flex-wrap gap-2">
                {LOCATION_OPTIONS.slice(0, 10).map((canton) => (
                  <button
                    key={canton.value}
                    onClick={() => toggleCanton(canton.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded border transition-all duration-200 ${selectedCantons.includes(canton.value)
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                      }`}
                  >
                    {canton.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Max Budget (CHF)
              </h3>
              <div className="px-1">
                <input
                  type="range"
                  min="80000"
                  max="300000"
                  step="10000"
                  value={salaryMax}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  onChange={(e) => setSalaryMax(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-3 text-xs text-slate-500 font-medium font-mono">
                  <span>80K</span>
                  <span>{salaryMax / 1000}K</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCantons.length > 0 || selectedSeniority.length > 0 || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCantons([]);
                  setSelectedSeniority([]);
                  setSearchTerm('');
                  setSalaryMax(250000);
                }}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1.5 transition-colors border-b border-transparent hover:border-slate-900 pb-0.5 w-max"
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </aside>

          {/* RESULTS GRID */}
          <main className="flex-1">
            <div className="flex justify-between items-end mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Candidates <span className="text-slate-400 font-light ml-2 text-lg">{filteredCandidates.length} results</span>
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="bg-slate-50 rounded-xl border border-slate-200 border-dashed p-16 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No candidates found</h3>
                <p className="text-slate-500 mt-1 text-sm">Adjust your filters to broaden your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.talent_id}
                    className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-400 hover:shadow-md transition-all duration-300 relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                            {candidate.talent_id}
                          </span>
                          <Badge style={candidate.seniority_level === 'senior' ? 'dark' : 'default'}>
                            {candidate.seniority_level || 'Candidate'}
                          </Badge>
                          <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto sm:ml-0">
                            <Clock className="w-3 h-3" /> Added {formatEntryDate(candidate.entry_date)}
                          </span>
                        </div>

                        {/* Role - Using ID/Experience as Title since anonymized */}
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:underline decoration-slate-300 underline-offset-4 decoration-2 transition-all">
                          {formatYearsExperience(candidate.years_of_experience)} Experience
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 mt-4 mb-5">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {candidate.preferred_cantons && candidate.preferred_cantons.length > 0
                              ? candidate.preferred_cantons.slice(0, 3).join(', ')
                              : 'Switzerland'}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span className="font-mono text-slate-700">
                              {candidate.salary_range.min ? formatCurrency(candidate.salary_range.min) : 'Neg.'} – {candidate.salary_range.max ? formatCurrency(candidate.salary_range.max) : 'Neg.'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 min-w-[140px]">
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto text-xs sm:text-sm"
                          onClick={() => setShowContactModal(candidate.talent_id)}
                        >
                          Request Intro
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm font-serif">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm leading-none">Silvia's List</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Tech Recruitment Switzerland</span>
              </div>
            </div>
            <div className="text-sm text-slate-500 flex gap-8">
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
              <a href="mailto:contact@silviaslist.com" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              © {new Date().getFullYear()} Silvia's List.
            </div>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl shadow-slate-200 max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowContactModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Mail className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Request Introduction</h3>
              <p className="text-sm text-slate-500 mt-2">
                Interested in candidate <span className="font-mono bg-slate-100 px-1 rounded text-slate-900">{showContactModal}</span>?
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded border border-slate-200 text-sm text-slate-600 text-center leading-relaxed">
                Please email us at <span className="font-semibold text-slate-900 border-b border-slate-300 pb-0.5">silvia@silviaslist.com</span><br /> quoting the Talent ID above.
              </div>

              <Button className="w-full" variant="primary" onClick={() => {
                navigator.clipboard.writeText('silvia@silviaslist.com');
                alert(`Email copied! Reference ID: ${showContactModal}`);
                setShowContactModal(null);
              }}>
                Copy Email Address
              </Button>

              <button
                onClick={() => setShowContactModal(null)}
                className="w-full text-xs text-slate-400 hover:text-slate-600 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}