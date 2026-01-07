import React, { useState } from 'react';
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
    if (user && currentPage === 'practice-detail') return <PracticeAreaDetail area={selectedArea} onBack={() => navigateTo('dashboard')} />;
    if (user && currentPage !== 'dashboard' && currentPage !== 'practice-detail') {
        // Handle other pages if user is logged in but browsing (like terms)
    }

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
      />
      {renderContent()}
    </div>
  );
}