import React from 'react';
import { InputSkeleton, TextAreaSkeleton } from './InputSkeleton';
import { CardSkeleton, SimpleCardSkeleton } from './CardSkeleton';

interface FormSkeletonProps {
  /** The section name to determine which skeleton to show */
  sectionName: string;
}

/**
 * Dynamic form skeleton that renders appropriate skeleton based on section type
 */
export const FormSkeleton: React.FC<FormSkeletonProps> = ({ sectionName }) => {
  // Render specific skeleton based on section name
  switch (sectionName) {
    case "Personal Details":
      return <PersonalDetailsSkeleton />;

    case "Education":
      return <CardSkeleton count={1} inputRows={4} />;

    case "Experience":
      return <CardSkeleton count={1} inputRows={5} />;

    case "Review Bullets":
      return <BulletReviewSkeleton />;

    case "Skills":
      return <SkillsSkeleton />;

    case "Certifications & Interests":
      return <CertificationsSkeleton />;

    case "Extracurricular":
      return <CardSkeleton count={1} inputRows={2} />;

    case "Projects":
      return <CardSkeleton count={1} inputRows={3} />;

    case "Preferences":
      return <PreferencesSkeleton />;

    case "Publications & Research":
      return <CardSkeleton count={1} inputRows={3} />;

    case "Teaching Experience":
      return <CardSkeleton count={1} inputRows={4} />;

    case "Grants & Funding":
      return <CardSkeleton count={1} inputRows={4} />;

    case "Conferences":
      return <CardSkeleton count={1} inputRows={3} />;

    case "Terms":
      return <TermsSkeleton />;

    default:
      return <GenericFormSkeleton />;
  }
};

// Specific skeleton components for different sections

const PersonalDetailsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Profile Picture */}
    <div className="flex items-center gap-6">
      <div className="w-32 h-32 bg-[var(--light-800)] rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="h-5 w-48 bg-[var(--light-800)] rounded animate-pulse" />
        <div className="h-10 w-32 bg-[var(--light-800)] rounded-md animate-pulse" />
      </div>
    </div>

    {/* Personal fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
    </div>

    {/* Address section */}
    <div className="space-y-4">
      <div className="h-6 w-32 bg-[var(--light-800)] rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputSkeleton showLabel={false} />
        <InputSkeleton showLabel={false} />
        <InputSkeleton showLabel={false} />
        <InputSkeleton showLabel={false} />
      </div>
    </div>
  </div>
);

const BulletReviewSkeleton: React.FC = () => (
  <div className="space-y-6">
    {Array.from({ length: 2 }).map((_, expIndex) => (
      <div key={expIndex} className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
        <div className="h-6 w-64 bg-[var(--light-800)] rounded animate-pulse mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, bulletIndex) => (
            <div key={bulletIndex} className="space-y-2">
              <div className="h-5 w-40 bg-[var(--light-800)] rounded animate-pulse" />
              <div className="h-20 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SkillsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Languages section */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-32 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <InputSkeleton key={i} />
        ))}
      </div>
    </div>

    {/* Technical Skills */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-40 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputSkeleton showLabel={false} />
            <InputSkeleton showLabel={false} />
          </div>
        ))}
      </div>
    </div>

    {/* Soft Skills */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-32 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputSkeleton showLabel={false} />
            <InputSkeleton showLabel={false} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CertificationsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Certifications Section */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-48 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="h-4 w-full bg-[var(--light-800)] rounded animate-pulse mb-6" />

      {/* Inner certification card */}
      <div className="p-4 bg-[var(--light-800)] rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputSkeleton showLabel={false} />
          <InputSkeleton showLabel={false} />
          <InputSkeleton showLabel={false} />
          <InputSkeleton showLabel={false} />
        </div>
      </div>
    </div>

    {/* Professional Interests Section */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-48 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="h-4 w-full bg-[var(--light-800)] rounded animate-pulse mb-6" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="h-10 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
            <div className="h-10 w-10 bg-[var(--light-800)] rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PreferencesSkeleton: React.FC = () => (
  <div className="space-y-6">
    <SimpleCardSkeleton count={3} />

    {/* Salary range skeleton */}
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-48 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="h-12 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
    </div>
  </div>
);

const TermsSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-[var(--light)] p-6 rounded-xl shadow-sm">
      <div className="h-6 w-40 bg-[var(--light-800)] rounded animate-pulse mb-4" />
      <div className="space-y-3">
        <div className="h-32 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-[var(--light-800)] rounded animate-pulse" />
          <div className="h-5 w-64 bg-[var(--light-800)] rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const GenericFormSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
    </div>
    <TextAreaSkeleton rows={4} />
  </div>
);
