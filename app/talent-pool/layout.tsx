import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Silvia's List - Swiss Tech Talent Pool",
  description: "Browse pre-screened tech professionals in Switzerland. Find your next hire by location, experience level, and salary expectations.",
  openGraph: {
    title: "Silvia's List - Swiss Tech Talent Pool",
    description: "Discover exceptional tech talent in Switzerland. Browse pre-screened professionals ready for their next opportunity.",
    type: 'website',
  },
};

export default function TalentPoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
