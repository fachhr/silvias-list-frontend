import { Metadata } from 'next';
import CompaniesPage from './CompaniesPage';

export const metadata: Metadata = {
  title: 'Hire Oil & Gas Talent | Silvia\'s List',
  description: 'Access a curated list of pre-vetted oil & gas professionals in Switzerland.',
};

export default function CompaniesRoute() {
  return <CompaniesPage />;
}
