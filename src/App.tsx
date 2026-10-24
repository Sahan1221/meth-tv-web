/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LivePage } from './pages/LivePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { NewsPage } from './pages/NewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DonationsPage } from './pages/DonationsPage';
import { DayakathwayaPage } from './pages/DayakathwayaPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminDonations } from './pages/admin/AdminDonations';
import { AdminDayakathwaya } from './pages/admin/AdminDayakathwaya';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Routing state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  // Admin tab state
  const [adminTab, setAdminTab] = useState<string>('overview');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', route);
      } catch {
        // Fallback for sandboxed frames
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check if current route is admin
  const isAdminRoute = currentRoute.startsWith('/admin');

  // Handle Admin Interface
  if (isAdminRoute) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center text-[#650F18]">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#9C1C24] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold">පරිපාලක පද්ධතිය පූරණය වෙමින් පවතී...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setAdminTab('overview')}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onTabChange={(tab) => setAdminTab(tab)}
        onNavigateHome={() => navigate('/')}
      >
        {adminTab === 'overview' && (
          <AdminDashboard onNavigateTab={(tab) => setAdminTab(tab)} />
        )}
        {adminTab === 'programs' && <AdminPrograms />}
        {adminTab === 'events' && (
          <AdminEvents
            onViewPublicEvent={(eventId) => navigate(`/events/${eventId}`)}
          />
        )}
        {adminTab === 'donations' && <AdminDonations />}
        {adminTab === 'dayakathwaya' && <AdminDayakathwaya />}
        {adminTab === 'news' && <AdminNews />}
        {adminTab === 'media' && <AdminMediaLibrary />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Handle Public Interface
  const renderPublicPage = () => {
    if (currentRoute === '/') {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentRoute === '/live') {
      return <LivePage onNavigate={navigate} />;
    }
    // Unified Programs & Media Hub
    if (currentRoute === '/programs') {
      return <ProgramsPage onNavigate={navigate} initialTab="schedule" />;
    }
    if (currentRoute === '/videos') {
      return <ProgramsPage onNavigate={navigate} initialTab="videos" />;
    }
    if (currentRoute === '/programs/completed') {
      return <ProgramsPage onNavigate={navigate} initialTab="galleries" />;
    }
    if (currentRoute.startsWith('/events/')) {
      const eventId = currentRoute.replace('/events/', '');
      return <EventDetailPage eventId={eventId} onNavigate={navigate} />;
    }
    // Philanthropy Suite
    if (currentRoute === '/dayakathwaya') {
      return <DayakathwayaPage onNavigate={navigate} />;
    }
    if (currentRoute === '/donations') {
      return <DonationsPage onNavigate={navigate} />;
    }
    // News & Network
    if (currentRoute === '/news') {
      return <NewsPage />;
    }
    if (currentRoute === '/about') {
      return <AboutPage />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }

    // Default fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#2B2526] selection:bg-[#9C1C24] selection:text-white">
      {/* Main Public Header */}
      <Header currentRoute={currentRoute} onNavigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* Main Public Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </AuthProvider>
  );
}
