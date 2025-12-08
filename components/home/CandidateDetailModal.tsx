'use client';

import React from 'react';
import { Candidate } from '@/types/talentPool';
import { Badge, Button } from '@/components/ui';
import { WORK_ELIGIBILITY_OPTIONS } from '@/lib/constants';
import {
    X,
    MapPin,
    Calendar,
    Clock,
    Briefcase,
    DollarSign,
    GraduationCap,
    Globe,
    FileCheck,
    Layers,
    Quote,
    User
} from 'lucide-react';

interface CandidateDetailModalProps {
    candidate: Candidate | null;
    isOpen: boolean;
    onClose: () => void;
    onRequestIntroduction?: (candidateId: string) => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
    candidate,
    isOpen,
    onClose,
    onRequestIntroduction
}) => {
    if (!isOpen || !candidate) return null;

    // Map work eligibility value to display label
    const getWorkPermitLabel = (value: string | undefined): string => {
        if (!value) return 'Not specified';
        const option = WORK_ELIGIBILITY_OPTIONS.find(opt => opt.value === value);
        return option?.label || value;
    };

    // Format salary range
    const formatSalary = (min: number, max: number): string => {
        const formatNum = (n: number) => n >= 1000 ? `${Math.round(n / 1000)}k` : n.toString();
        return `CHF ${formatNum(min)} - ${formatNum(max)}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                    <div className="flex items-center gap-3">
                        <Badge style="gold">{candidate.id}</Badge>
                        <Badge style="blue">{candidate.seniority}</Badge>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[var(--bg-surface-2)] transition-colors"
                    >
                        <X className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Role Title */}
                    <div>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            {candidate.role}
                        </h2>
                    </div>

                    {/* Key Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <MapPin className="w-4 h-4 text-[var(--gold)]" />
                            <span>{candidate.cantons.join(', ') || 'Flexible'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <Briefcase className="w-4 h-4 text-[var(--gold)]" />
                            <span>{candidate.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <Clock className="w-4 h-4 text-[var(--gold)]" />
                            <span>{candidate.availability}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <Calendar className="w-4 h-4 text-[var(--gold)]" />
                            <span>{candidate.entryDate}</span>
                        </div>
                    </div>

                    {/* Key Achievement / Highlight */}
                    {candidate.highlight && (
                        <div className="relative p-4 rounded-lg bg-[var(--gold-dim)] border border-[var(--gold-border)]">
                            <Quote className="absolute top-3 left-3 w-5 h-5 text-[var(--gold)] opacity-50" />
                            <p className="pl-8 text-sm italic text-[var(--text-primary)]">
                                {candidate.highlight}
                            </p>
                        </div>
                    )}

                    {/* Skills / Core Competencies */}
                    {candidate.skills && candidate.skills.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                                Core Competencies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, idx) => (
                                    <Badge key={idx} style="default">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Functional Expertise */}
                    {candidate.functionalExpertise && candidate.functionalExpertise.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                Functional Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.functionalExpertise.map((exp, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                    >
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--bg-surface-2)]">
                        {/* Education */}
                        {candidate.education && (
                            <div className="flex items-start gap-3">
                                <GraduationCap className="w-5 h-5 text-[var(--text-tertiary)] mt-0.5" />
                                <div>
                                    <p className="text-xs text-[var(--text-tertiary)]">Education</p>
                                    <p className="text-sm text-[var(--text-primary)]">{candidate.education}</p>
                                </div>
                            </div>
                        )}

                        {/* Work Eligibility */}
                        {candidate.workPermit && (
                            <div className="flex items-start gap-3">
                                <FileCheck className="w-5 h-5 text-[var(--text-tertiary)] mt-0.5" />
                                <div>
                                    <p className="text-xs text-[var(--text-tertiary)]">Work Eligibility</p>
                                    <p className="text-sm text-[var(--text-primary)]">{getWorkPermitLabel(candidate.workPermit)}</p>
                                </div>
                            </div>
                        )}

                        {/* Salary Range */}
                        <div className="flex items-start gap-3">
                            <DollarSign className="w-5 h-5 text-[var(--text-tertiary)] mt-0.5" />
                            <div>
                                <p className="text-xs text-[var(--text-tertiary)]">Salary Expectation</p>
                                <p className="text-sm text-[var(--text-primary)]">
                                    {formatSalary(candidate.salaryMin, candidate.salaryMax)}
                                </p>
                            </div>
                        </div>

                        {/* Languages */}
                        {candidate.languages && candidate.languages.length > 0 && (
                            <div className="flex items-start gap-3">
                                <Globe className="w-5 h-5 text-[var(--text-tertiary)] mt-0.5" />
                                <div>
                                    <p className="text-xs text-[var(--text-tertiary)]">Languages</p>
                                    <p className="text-sm text-[var(--text-primary)]">
                                        {candidate.languages.join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    {onRequestIntroduction && (
                        <Button
                            variant="primary"
                            icon={User}
                            onClick={() => onRequestIntroduction(candidate.id)}
                        >
                            Request Introduction
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateDetailModal;
