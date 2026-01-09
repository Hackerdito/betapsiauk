import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DemoSection from './components/DemoSection';
import FloatingCTA from './components/FloatingCTA';
import SubscriptionPage from './components/SubscriptionPage';
import Dashboard from './components/Dashboard';
import PracticeAreaDetail from './components/PracticeAreaDetail';
import TermsPage from './components/TermsPage';

export type Page = 'home' | 'subscription' | 'dashboard' | 'terms' | 'practice-detail';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [monthlyUsageSeconds, setMonthlyUsageSeconds] = useState(0);

  // Handle monthly time logic
  useEffect(() => {
    const checkMonthlyReset = () => {
      const now = new Date();
      const currentMonthYear = `${now.getMonth()}-${now.getFullYear()}`;
      const lastReset = localStorage.getItem('psia_last_reset_month');
      const storedUsage = localStorage.getItem('psia_monthly_usage');

      if (lastReset !== currentMonthYear) {
        localStorage.setItem('psia_last_reset_month', currentMonthYear);
        localStorage.setItem('psia_monthly_usage', '0');
        setMonthlyUsageSeconds(0);
      } else if (storedUsage) {
        setMonthlyUsageSeconds(parseInt(storedUsage, 10));
      }
    };

    checkMonthlyReset();
  }, []);

  const handleTick = useCallback(() => {
    setMonthlyUsageSeconds((prev) => {
      const newVal = prev + 1;
      localStorage.setItem('psia_monthly_usage', newVal.toString());
      return newVal;
    });
  }, []);

  const navigateTo = (page: Page, data?: any) => {
    if (page === 'practice-detail' && data) {
      setSelectedArea(data);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderContent = () => {
    if (user && currentPage === 'dashboard') return <Dashboard onSelectArea={(area) => navigateTo('practice-detail', area)} />;
    if (user && currentPage === 'practice-detail') return (
      <PracticeAreaDetail 
        area={selectedArea} 
        onBack={() => navigateTo('dashboard')} 
        isUserLoggedIn={!!user}
        monthlyUsageSeconds={monthlyUsageSeconds}
        onTick={handleTick}
      />
    );

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Features onNavigate={navigateTo} />
            <DemoSection />
            <FloatingCTA onNavigate={navigateTo} />
          </>
        );
      case 'subscription':
        return <SubscriptionPage onNavigate={navigateTo} />;
      case 'terms':
        return <TermsPage onNavigate={navigateTo} />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen w-full relative pt-[72px] bg-[#1A2232]">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        user={user} 
        onLogout={handleLogout}
        onLogin={handleLogin}
        monthlyUsageSeconds={monthlyUsageSeconds}
      />
      {renderContent()}
    </div>
  );
}