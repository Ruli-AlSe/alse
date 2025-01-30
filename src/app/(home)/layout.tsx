import { Navbar } from '@/components/navigation/navbar';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white dark:from-dark-blue from-80% to-95% to-blue-100 dark:to-light-blue">
      <Navbar />
      {children}
    </div>
  );
}
