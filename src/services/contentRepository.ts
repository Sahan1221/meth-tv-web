import { 
  Program, 
  DhammaEvent, 
  EventPhoto, 
  NewsArticle, 
  SiteSettings, 
  PublicationStatus,
  DonationCampaign,
  DonationIntent,
  DayakathwayaCategory,
  DayakathwayaOpportunity,
  DayakathwayaRequest
} from '../types';
import { 
  initialPrograms, 
  initialEvents, 
  initialNews, 
  initialSiteSettings,
  initialDonationCampaigns,
  initialDonationIntents,
  initialDayakathwayaCategories,
  initialDayakathwayaOpportunities,
  initialDayakathwayaRequests
} from './initialData';

const STORAGE_KEYS = {
  PROGRAMS: 'methtv_programs_v1',
  EVENTS: 'methtv_events_v1',
  NEWS: 'methtv_news_v1',
  SETTINGS: 'methtv_settings_v1',
  MEDIA: 'methtv_media_v1',
  CAMPAIGNS: 'methtv_campaigns_v1',
  DONATIONS: 'methtv_donations_v1',
  DAYAKATHWAYA_CATEGORIES: 'methtv_dayakathwaya_categories_v1',
  DAYAKATHWAYA_OPPORTUNITIES: 'methtv_dayakathwaya_opportunities_v1',
  DAYAKATHWAYA_REQUESTS: 'methtv_dayakathwaya_requests_v1',
};

// Custom event to sync data across all components instantaneously
const REPOSITORY_CHANGE_EVENT = 'methtv_repository_change';

export function notifyRepositoryChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(REPOSITORY_CHANGE_EVENT));
  }
}

export function subscribeToRepository(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(REPOSITORY_CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(REPOSITORY_CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

class ContentRepository {
  // Programs
  getPrograms(onlyPublished = false): Program[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      if (!data) {
        this.savePrograms(initialPrograms);
        return onlyPublished ? initialPrograms.filter(p => p.publicationStatus === 'published') : initialPrograms;
      }
      const parsed: Program[] = JSON.parse(data);
      return onlyPublished ? parsed.filter(p => p.publicationStatus === 'published') : parsed;
    } catch {
      return onlyPublished ? initialPrograms.filter(p => p.publicationStatus === 'published') : initialPrograms;
    }
  }

  getProgramById(id: string): Program | undefined {
    return this.getPrograms().find(p => p.id === id);
  }

  savePrograms(programs: Program[]): void {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    notifyRepositoryChange();
  }

  createProgram(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program {
    const programs = this.getPrograms();
    const newProgram: Program = {
      ...program,
      id: `prog-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    programs.unshift(newProgram);
    this.savePrograms(programs);
    return newProgram;
  }

  updateProgram(id: string, updates: Partial<Program>): Program | null {
    const programs = this.getPrograms();
    const index = programs.findIndex(p => p.id === id);
    if (index === -1) return null;

    programs[index] = {
      ...programs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.savePrograms(programs);
    return programs[index];
  }

  deleteProgram(id: string): boolean {
    const programs = this.getPrograms();
    const filtered = programs.filter(p => p.id !== id);
    if (filtered.length !== programs.length) {
      this.savePrograms(filtered);
      return true;
    }
    return false;
  }

  toggleProgramPublication(id: string): Program | null {
    const program = this.getProgramById(id);
    if (!program) return null;
    const newStatus: PublicationStatus = program.publicationStatus === 'published' ? 'draft' : 'published';
    return this.updateProgram(id, { publicationStatus: newStatus });
  }

  // Events & Photo Galleries
  getEvents(onlyPublished = false): DhammaEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (!data) {
        this.saveEvents(initialEvents);
        return onlyPublished ? initialEvents.filter(e => e.publicationStatus === 'published') : initialEvents;
      }
      const parsed: DhammaEvent[] = JSON.parse(data);
      return onlyPublished ? parsed.filter(e => e.publicationStatus === 'published') : parsed;
    } catch {
      return onlyPublished ? initialEvents.filter(e => e.publicationStatus === 'published') : initialEvents;
    }
  }

  getEventById(id: string): DhammaEvent | undefined {
    return this.getEvents().find(e => e.id === id);
  }

  saveEvents(events: DhammaEvent[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    notifyRepositoryChange();
  }

  createEvent(event: Omit<DhammaEvent, 'id' | 'photos' | 'createdAt' | 'updatedAt'>, initialPhotos: Omit<EventPhoto, 'id' | 'eventId' | 'uploadedAt'>[] = []): DhammaEvent {
    const events = this.getEvents();
    const eventId = `event-${Date.now()}`;
    const photos: EventPhoto[] = initialPhotos.map((p, index) => ({
      ...p,
      id: `photo-${Date.now()}-${index}`,
      eventId,
      uploadedAt: new Date().toISOString(),
    }));

    const newEvent: DhammaEvent = {
      ...event,
      id: eventId,
      photos,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    events.unshift(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<DhammaEvent>): DhammaEvent | null {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;

    events[index] = {
      ...events[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveEvents(events);
    return events[index];
  }

  deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    if (filtered.length !== events.length) {
      this.saveEvents(filtered);
      return true;
    }
    return false;
  }

  toggleEventPublication(id: string): DhammaEvent | null {
    const event = this.getEventById(id);
    if (!event) return null;
    const newStatus: PublicationStatus = event.publicationStatus === 'published' ? 'draft' : 'published';
    return this.updateEvent(id, { publicationStatus: newStatus });
  }

  // Manage Photos inside an Event Gallery
  addPhotosToEvent(eventId: string, newPhotos: Array<{ imageUrl: string; caption?: string; altText?: string }>): DhammaEvent | null {
    const event = this.getEventById(eventId);
    if (!event) return null;

    const currentMaxOrder = event.photos.reduce((max, p) => Math.max(max, p.displayOrder || 0), 0);
    const photosToAdd: EventPhoto[] = newPhotos.map((p, idx) => ({
      id: `photo-${Date.now()}-${idx}`,
      eventId,
      imageUrl: p.imageUrl,
      caption: p.caption || '',
      altText: p.altText || event.title,
      displayOrder: currentMaxOrder + idx + 1,
      uploadedAt: new Date().toISOString(),
    }));

    const updatedPhotos = [...event.photos, ...photosToAdd];
    return this.updateEvent(eventId, { photos: updatedPhotos });
  }

  removePhotoFromEvent(eventId: string, photoId: string): DhammaEvent | null {
    const event = this.getEventById(eventId);
    if (!event) return null;

    const updatedPhotos = event.photos.filter(p => p.id !== photoId);
    return this.updateEvent(eventId, { photos: updatedPhotos });
  }

  updatePhotoInEvent(eventId: string, photoId: string, updates: Partial<EventPhoto>): DhammaEvent | null {
    const event = this.getEventById(eventId);
    if (!event) return null;

    const updatedPhotos = event.photos.map(p => {
      if (p.id === photoId) {
        return { ...p, ...updates };
      }
      return p;
    });

    return this.updateEvent(eventId, { photos: updatedPhotos });
  }

  reorderPhotosInEvent(eventId: string, photoIdsInNewOrder: string[]): DhammaEvent | null {
    const event = this.getEventById(eventId);
    if (!event) return null;

    const photoMap = new Map(event.photos.map(p => [p.id, p]));
    const reordered: EventPhoto[] = [];

    photoIdsInNewOrder.forEach((id, index) => {
      const photo = photoMap.get(id);
      if (photo) {
        reordered.push({
          ...photo,
          displayOrder: index + 1,
        });
      }
    });

    return this.updateEvent(eventId, { photos: reordered });
  }

  // News Articles
  getNews(onlyPublished = false): NewsArticle[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (!data) {
        this.saveNews(initialNews);
        return onlyPublished ? initialNews.filter(n => n.publicationStatus === 'published') : initialNews;
      }
      const parsed: NewsArticle[] = JSON.parse(data);
      return onlyPublished ? parsed.filter(n => n.publicationStatus === 'published') : parsed;
    } catch {
      return onlyPublished ? initialNews.filter(n => n.publicationStatus === 'published') : initialNews;
    }
  }

  getNewsById(id: string): NewsArticle | undefined {
    return this.getNews().find(n => n.id === id);
  }

  saveNews(news: NewsArticle[]): void {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    notifyRepositoryChange();
  }

  createNews(article: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>): NewsArticle {
    const news = this.getNews();
    const newArticle: NewsArticle = {
      ...article,
      id: `news-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    news.unshift(newArticle);
    this.saveNews(news);
    return newArticle;
  }

  updateNews(id: string, updates: Partial<NewsArticle>): NewsArticle | null {
    const news = this.getNews();
    const index = news.findIndex(n => n.id === id);
    if (index === -1) return null;

    news[index] = {
      ...news[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveNews(news);
    return news[index];
  }

  deleteNews(id: string): boolean {
    const news = this.getNews();
    const filtered = news.filter(n => n.id !== id);
    if (filtered.length !== news.length) {
      this.saveNews(filtered);
      return true;
    }
    return false;
  }

  toggleNewsPublication(id: string): NewsArticle | null {
    const article = this.getNewsById(id);
    if (!article) return null;
    const newStatus: PublicationStatus = article.publicationStatus === 'published' ? 'draft' : 'published';
    return this.updateNews(id, { publicationStatus: newStatus });
  }

  // ----------------- DONATION CAMPAIGNS -----------------
  getCampaigns(onlyActive = false): DonationCampaign[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (!data) {
        this.saveCampaigns(initialDonationCampaigns);
        return onlyActive ? initialDonationCampaigns.filter(c => c.status === 'active') : initialDonationCampaigns;
      }
      const parsed: DonationCampaign[] = JSON.parse(data);
      return onlyActive ? parsed.filter(c => c.status === 'active') : parsed;
    } catch {
      return onlyActive ? initialDonationCampaigns.filter(c => c.status === 'active') : initialDonationCampaigns;
    }
  }

  getCampaignById(id: string): DonationCampaign | undefined {
    return this.getCampaigns().find(c => c.id === id);
  }

  saveCampaigns(campaigns: DonationCampaign[]): void {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    notifyRepositoryChange();
  }

  createCampaign(campaign: Omit<DonationCampaign, 'id' | 'createdAt' | 'updatedAt'>): DonationCampaign {
    const campaigns = this.getCampaigns();
    const newCampaign: DonationCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    campaigns.unshift(newCampaign);
    this.saveCampaigns(campaigns);
    return newCampaign;
  }

  updateCampaign(id: string, updates: Partial<DonationCampaign>): DonationCampaign | null {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;

    campaigns[index] = {
      ...campaigns[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveCampaigns(campaigns);
    return campaigns[index];
  }

  deleteCampaign(id: string): boolean {
    const campaigns = this.getCampaigns();
    const filtered = campaigns.filter(c => c.id !== id);
    if (filtered.length !== campaigns.length) {
      this.saveCampaigns(filtered);
      return true;
    }
    return false;
  }

  // ----------------- DONATION INTENTS -----------------
  getDonations(): DonationIntent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      if (!data) {
        this.saveDonations(initialDonationIntents);
        return initialDonationIntents;
      }
      return JSON.parse(data);
    } catch {
      return initialDonationIntents;
    }
  }

  saveDonations(donations: DonationIntent[]): void {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
    notifyRepositoryChange();
  }

  createDonationIntent(intent: Omit<DonationIntent, 'id' | 'referenceNumber' | 'createdAt'>): DonationIntent {
    const donations = this.getDonations();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newIntent: DonationIntent = {
      ...intent,
      id: `don-${Date.now()}`,
      referenceNumber: `METH-DON-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
    };
    donations.unshift(newIntent);
    this.saveDonations(donations);
    return newIntent;
  }

  updateDonation(id: string, updates: Partial<DonationIntent>): DonationIntent | null {
    const donations = this.getDonations();
    const index = donations.findIndex(d => d.id === id);
    if (index === -1) return null;

    donations[index] = {
      ...donations[index],
      ...updates,
    };
    this.saveDonations(donations);
    return donations[index];
  }

  deleteDonation(id: string): boolean {
    const donations = this.getDonations();
    const filtered = donations.filter(d => d.id !== id);
    if (filtered.length !== donations.length) {
      this.saveDonations(filtered);
      return true;
    }
    return false;
  }

  // ----------------- DAYAKATHWAYA CATEGORIES -----------------
  getDayakathwayaCategories(onlyActive = false): DayakathwayaCategory[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAYAKATHWAYA_CATEGORIES);
      if (!data) {
        this.saveDayakathwayaCategories(initialDayakathwayaCategories);
        return onlyActive ? initialDayakathwayaCategories.filter(c => c.isActive) : initialDayakathwayaCategories;
      }
      const parsed: DayakathwayaCategory[] = JSON.parse(data);
      const sorted = parsed.sort((a, b) => a.displayOrder - b.displayOrder);
      return onlyActive ? sorted.filter(c => c.isActive) : sorted;
    } catch {
      return onlyActive ? initialDayakathwayaCategories.filter(c => c.isActive) : initialDayakathwayaCategories;
    }
  }

  saveDayakathwayaCategories(categories: DayakathwayaCategory[]): void {
    localStorage.setItem(STORAGE_KEYS.DAYAKATHWAYA_CATEGORIES, JSON.stringify(categories));
    notifyRepositoryChange();
  }

  createDayakathwayaCategory(category: Omit<DayakathwayaCategory, 'id'>): DayakathwayaCategory {
    const categories = this.getDayakathwayaCategories();
    const newCat: DayakathwayaCategory = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    categories.push(newCat);
    this.saveDayakathwayaCategories(categories);
    return newCat;
  }

  updateDayakathwayaCategory(id: string, updates: Partial<DayakathwayaCategory>): DayakathwayaCategory | null {
    const categories = this.getDayakathwayaCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;

    categories[index] = {
      ...categories[index],
      ...updates,
    };
    this.saveDayakathwayaCategories(categories);
    return categories[index];
  }

  deleteDayakathwayaCategory(id: string): boolean {
    const categories = this.getDayakathwayaCategories();
    const filtered = categories.filter(c => c.id !== id);
    if (filtered.length !== categories.length) {
      this.saveDayakathwayaCategories(filtered);
      return true;
    }
    return false;
  }

  // ----------------- DAYAKATHWAYA OPPORTUNITIES -----------------
  getDayakathwayaOpportunities(onlyPublished = false, onlyAvailable = false): DayakathwayaOpportunity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAYAKATHWAYA_OPPORTUNITIES);
      if (!data) {
        this.saveDayakathwayaOpportunities(initialDayakathwayaOpportunities);
        let list = initialDayakathwayaOpportunities;
        if (onlyPublished) list = list.filter(o => o.publicationStatus === 'published');
        if (onlyAvailable) list = list.filter(o => o.availability === 'available');
        return list;
      }
      let parsed: DayakathwayaOpportunity[] = JSON.parse(data);
      if (onlyPublished) parsed = parsed.filter(o => o.publicationStatus === 'published');
      if (onlyAvailable) parsed = parsed.filter(o => o.availability === 'available');
      return parsed;
    } catch {
      return initialDayakathwayaOpportunities;
    }
  }

  getOpportunityById(id: string): DayakathwayaOpportunity | undefined {
    return this.getDayakathwayaOpportunities().find(o => o.id === id);
  }

  saveDayakathwayaOpportunities(opportunities: DayakathwayaOpportunity[]): void {
    localStorage.setItem(STORAGE_KEYS.DAYAKATHWAYA_OPPORTUNITIES, JSON.stringify(opportunities));
    notifyRepositoryChange();
  }

  createDayakathwayaOpportunity(opp: Omit<DayakathwayaOpportunity, 'id' | 'createdAt' | 'updatedAt'>): DayakathwayaOpportunity {
    const opps = this.getDayakathwayaOpportunities();
    const newOpp: DayakathwayaOpportunity = {
      ...opp,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    opps.unshift(newOpp);
    this.saveDayakathwayaOpportunities(opps);
    return newOpp;
  }

  updateDayakathwayaOpportunity(id: string, updates: Partial<DayakathwayaOpportunity>): DayakathwayaOpportunity | null {
    const opps = this.getDayakathwayaOpportunities();
    const index = opps.findIndex(o => o.id === id);
    if (index === -1) return null;

    opps[index] = {
      ...opps[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveDayakathwayaOpportunities(opps);
    return opps[index];
  }

  deleteDayakathwayaOpportunity(id: string): boolean {
    const opps = this.getDayakathwayaOpportunities();
    const filtered = opps.filter(o => o.id !== id);
    if (filtered.length !== opps.length) {
      this.saveDayakathwayaOpportunities(filtered);
      return true;
    }
    return false;
  }

  // ----------------- DAYAKATHWAYA REQUESTS -----------------
  getDayakathwayaRequests(): DayakathwayaRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAYAKATHWAYA_REQUESTS);
      if (!data) {
        this.saveDayakathwayaRequests(initialDayakathwayaRequests);
        return initialDayakathwayaRequests;
      }
      return JSON.parse(data);
    } catch {
      return initialDayakathwayaRequests;
    }
  }

  saveDayakathwayaRequests(requests: DayakathwayaRequest[]): void {
    localStorage.setItem(STORAGE_KEYS.DAYAKATHWAYA_REQUESTS, JSON.stringify(requests));
    notifyRepositoryChange();
  }

  createDayakathwayaRequest(req: Omit<DayakathwayaRequest, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'statusHistory'>): DayakathwayaRequest {
    const requests = this.getDayakathwayaRequests();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newReq: DayakathwayaRequest = {
      ...req,
      id: `req-${Date.now()}`,
      referenceNumber: `METH-DYK-2026-${randomSuffix}`,
      statusHistory: [
        { status: req.requestStatus, timestamp: new Date().toISOString(), note: 'වෙබ් අඩවිය ඔස්සේ ඉල්ලීම ඉදිරිපත් කරන ලදී.' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    requests.unshift(newReq);
    this.saveDayakathwayaRequests(requests);
    return newReq;
  }

  updateDayakathwayaRequest(id: string, updates: Partial<DayakathwayaRequest>, note?: string): DayakathwayaRequest | null {
    const requests = this.getDayakathwayaRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index === -1) return null;

    const current = requests[index];
    const history = [...(current.statusHistory || [])];
    if (updates.requestStatus && updates.requestStatus !== current.requestStatus) {
      history.push({
        status: updates.requestStatus,
        timestamp: new Date().toISOString(),
        note: note || `තත්ත්වය ${updates.requestStatus} ලෙස වෙනස් කරන ලදී.`,
      });
    }

    requests[index] = {
      ...current,
      ...updates,
      statusHistory: history,
      updatedAt: new Date().toISOString(),
    };
    this.saveDayakathwayaRequests(requests);
    return requests[index];
  }

  deleteDayakathwayaRequest(id: string): boolean {
    const requests = this.getDayakathwayaRequests();
    const filtered = requests.filter(r => r.id !== id);
    if (filtered.length !== requests.length) {
      this.saveDayakathwayaRequests(filtered);
      return true;
    }
    return false;
  }

  // Site Settings
  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(initialSiteSettings);
        return initialSiteSettings;
      }
      return JSON.parse(data);
    } catch {
      return initialSiteSettings;
    }
  }

  saveSettings(settings: SiteSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    notifyRepositoryChange();
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    this.saveSettings(updated);
    return updated;
  }

  // Reset to seed data
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.DAYAKATHWAYA_CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.DAYAKATHWAYA_OPPORTUNITIES);
    localStorage.removeItem(STORAGE_KEYS.DAYAKATHWAYA_REQUESTS);
    this.savePrograms(initialPrograms);
    this.saveEvents(initialEvents);
    this.saveNews(initialNews);
    this.saveSettings(initialSiteSettings);
    this.saveCampaigns(initialDonationCampaigns);
    this.saveDonations(initialDonationIntents);
    this.saveDayakathwayaCategories(initialDayakathwayaCategories);
    this.saveDayakathwayaOpportunities(initialDayakathwayaOpportunities);
    this.saveDayakathwayaRequests(initialDayakathwayaRequests);
  }

  // Media Library aggregation
  getAllMedia(): Array<{
    id: string;
    imageUrl: string;
    altText: string;
    caption?: string;
    sourceType: 'event' | 'program' | 'news';
    sourceTitle: string;
    sourceId: string;
    date: string;
  }> {
    const media: Array<{
      id: string;
      imageUrl: string;
      altText: string;
      caption?: string;
      sourceType: 'event' | 'program' | 'news';
      sourceTitle: string;
      sourceId: string;
      date: string;
    }> = [];

    // From programs
    this.getPrograms().forEach(p => {
      if (p.coverImage) {
        media.push({
          id: `media-prog-${p.id}`,
          imageUrl: p.coverImage,
          altText: p.title,
          sourceType: 'program',
          sourceTitle: p.title,
          sourceId: p.id,
          date: p.createdAt,
        });
      }
    });

    // From events and event photos
    this.getEvents().forEach(e => {
      if (e.coverImage) {
        media.push({
          id: `media-event-cover-${e.id}`,
          imageUrl: e.coverImage,
          altText: `${e.title} (ප්‍රධාන ඡායාරූපය)`,
          sourceType: 'event',
          sourceTitle: e.title,
          sourceId: e.id,
          date: e.createdAt,
        });
      }
      e.photos?.forEach(photo => {
        media.push({
          id: `media-photo-${photo.id}`,
          imageUrl: photo.imageUrl,
          altText: photo.altText || e.title,
          caption: photo.caption,
          sourceType: 'event',
          sourceTitle: e.title,
          sourceId: e.id,
          date: photo.uploadedAt,
        });
      });
    });

    // From news
    this.getNews().forEach(n => {
      if (n.coverImage) {
        media.push({
          id: `media-news-${n.id}`,
          imageUrl: n.coverImage,
          altText: n.title,
          sourceType: 'news',
          sourceTitle: n.title,
          sourceId: n.id,
          date: n.createdAt,
        });
      }
    });

    return media;
  }
}

export const contentRepo = new ContentRepository();
