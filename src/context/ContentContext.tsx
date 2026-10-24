import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Program, 
  DhammaEvent, 
  NewsArticle, 
  SiteSettings,
  DonationCampaign,
  DonationIntent,
  DayakathwayaCategory,
  DayakathwayaOpportunity,
  DayakathwayaRequest
} from '../types';
import { contentRepo, subscribeToRepository } from '../services/contentRepository';

interface ContentContextType {
  programs: Program[];
  publishedPrograms: Program[];
  events: DhammaEvent[];
  publishedEvents: DhammaEvent[];
  news: NewsArticle[];
  publishedNews: NewsArticle[];
  campaigns: DonationCampaign[];
  activeCampaigns: DonationCampaign[];
  donations: DonationIntent[];
  dayakathwayaCategories: DayakathwayaCategory[];
  activeDayakathwayaCategories: DayakathwayaCategory[];
  dayakathwayaOpportunities: DayakathwayaOpportunity[];
  publishedOpportunities: DayakathwayaOpportunity[];
  availableOpportunities: DayakathwayaOpportunity[];
  dayakathwayaRequests: DayakathwayaRequest[];
  settings: SiteSettings;
  refreshData: () => void;
  resetAll: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<Program[]>(() => contentRepo.getPrograms());
  const [events, setEvents] = useState<DhammaEvent[]>(() => contentRepo.getEvents());
  const [news, setNews] = useState<NewsArticle[]>(() => contentRepo.getNews());
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => contentRepo.getCampaigns());
  const [donations, setDonations] = useState<DonationIntent[]>(() => contentRepo.getDonations());
  const [dayakathwayaCategories, setDayakathwayaCategories] = useState<DayakathwayaCategory[]>(() => contentRepo.getDayakathwayaCategories());
  const [dayakathwayaOpportunities, setDayakathwayaOpportunities] = useState<DayakathwayaOpportunity[]>(() => contentRepo.getDayakathwayaOpportunities());
  const [dayakathwayaRequests, setDayakathwayaRequests] = useState<DayakathwayaRequest[]>(() => contentRepo.getDayakathwayaRequests());
  const [settings, setSettings] = useState<SiteSettings>(() => contentRepo.getSettings());

  const loadAll = () => {
    setPrograms(contentRepo.getPrograms());
    setEvents(contentRepo.getEvents());
    setNews(contentRepo.getNews());
    setCampaigns(contentRepo.getCampaigns());
    setDonations(contentRepo.getDonations());
    setDayakathwayaCategories(contentRepo.getDayakathwayaCategories());
    setDayakathwayaOpportunities(contentRepo.getDayakathwayaOpportunities());
    setDayakathwayaRequests(contentRepo.getDayakathwayaRequests());
    setSettings(contentRepo.getSettings());
  };

  useEffect(() => {
    // Initial sync
    loadAll();

    // Subscribe to content repository broadcasts
    const unsubscribe = subscribeToRepository(() => {
      loadAll();
    });

    return () => unsubscribe();
  }, []);

  const resetAll = () => {
    contentRepo.resetAllData();
    loadAll();
  };

  const publishedPrograms = programs.filter(p => p.publicationStatus === 'published');
  const publishedEvents = events.filter(e => e.publicationStatus === 'published');
  const publishedNews = news.filter(n => n.publicationStatus === 'published');
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const activeDayakathwayaCategories = dayakathwayaCategories.filter(c => c.isActive);
  const publishedOpportunities = dayakathwayaOpportunities.filter(o => o.publicationStatus === 'published');
  const availableOpportunities = publishedOpportunities.filter(o => o.availability === 'available');

  return (
    <ContentContext.Provider
      value={{
        programs,
        publishedPrograms,
        events,
        publishedEvents,
        news,
        publishedNews,
        campaigns,
        activeCampaigns,
        donations,
        dayakathwayaCategories,
        activeDayakathwayaCategories,
        dayakathwayaOpportunities,
        publishedOpportunities,
        availableOpportunities,
        dayakathwayaRequests,
        settings,
        refreshData: loadAll,
        resetAll,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

