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
  const [renewalDate, setRenewalDate] = useState<string | null>(null);

  // Handle monthly time logic with first-use activation
  useEffect(() => {
    const checkRenewal = () => {
      const storedFirstUse = localStorage.getItem('psia_first_use_timestamp');
      const storedUsage = localStorage.getItem('psia_monthly_usage');
      
      if (storedFirstUse) {
        const firstUseDate = new Date(parseInt(storedFirstUse, 10));
        const now = new Date();
        
        // Calculate next renewal date (same day next month)
        let nextRenewal = new Date(firstUseDate);
        nextRenewal.setMonth(nextRenewal.getMonth() + 1);
        
        // If we passed the renewal date, reset
        if (now >= nextRenewal) {
          // Update first use to "today" to start the new cycle
          localStorage.setItem('psia_first_use_timestamp', now.getTime().toString());
          localStorage.setItem('psia_monthly_usage', '0');
          setMonthlyUsageSeconds(0);
          
          const newRenewal = new Date(now);
          newRenewal.setMonth(newRenewal.getMonth() + 1);
          setRenewalDate(newRenewal.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }));
        } else {
          setMonthlyUsageSeconds(storedUsage ? parseInt(storedUsage, 10) : 0);
          setRenewalDate(nextRenewal.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }));
        }
      } else {
        setMonthlyUsageSeconds(storedUsage ? parseInt(storedUsage, 10) : 0);
      }
    };

    checkRenewal();
    const interval = setInterval(checkRenewal, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleTick = useCallback(() => {
    // Set first use timestamp if it doesn't exist (this is the "click first widget" trigger)
    if (!localStorage.getItem('psia_first_use_timestamp')) {
      const now = new Date();
      localStorage.setItem('psia_first_use_timestamp', now.getTime().toString());
      
      const nextRenewal = new Date(now);
      nextRenewal.setMonth(nextRenewal.getMonth() + 1);
      setRenewalDate(nextRenewal.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }));
    }

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
        renewalDate={renewalDate}
      />
      {renderContent()}
    </div>
  );
}