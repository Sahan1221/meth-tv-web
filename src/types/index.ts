/**
 * METH TV (මෙත් රූපවාහිනී) - Data Models and Type Definitions
 */

export type ProgramCategory = 
  | 'ධර්ම දේශනා'
  | 'භාවනා වැඩසටහන්'
  | 'ධර්ම සාකච්ඡා'
  | 'විශේෂ පෝය විකාශ'
  | 'පිරිත් දේශනා'
  | 'ළමා හා යොවුන් වැඩසටහන්';

export type ProgramStatus = 'upcoming' | 'completed' | 'cancelled';
export type PublicationStatus = 'published' | 'draft';

export interface Program {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  coverImage: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "ප.ව. 07:00"
  venue: string;
  status: ProgramStatus;
  youtubeUrl?: string;
  isFeatured: boolean;
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EventPhoto {
  id: string;
  eventId: string;
  imageUrl: string;
  storagePath?: string;
  caption?: string;
  altText?: string;
  displayOrder: number;
  uploadedAt: string;
}

export interface DhammaEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string; // YYYY-MM-DD
  venue: string;
  coverImage: string;
  relatedProgramId?: string;
  photos: EventPhoto[];
  publicationStatus: PublicationStatus;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  publicationDate: string; // YYYY-MM-DD
  eventDate?: string;
  relatedProgramId?: string;
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  livestreamUrl: string; // e.g. YouTube video URL or ID
  livestreamTitle: string;
  isLiveActive: boolean;
  youtubeChannelIds: string[];
  contactTelephone: string;
  contactEmail: string;
  contactAddress: string;
  peoTvChannel: string;
  facebookUrl: string;
  websiteUrl: string;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  videoUrl: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'editor';
}

// ----------------- DONATIONS -----------------

export type CampaignStatus = 'active' | 'completed' | 'draft' | 'inactive';

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount?: number;
  startDate?: string;
  endDate?: string;
  status: CampaignStatus;
  paymentInstructions?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type DonationStatus = 'නව ඉල්ලීම' | 'සමාලෝචනය වෙමින් පවතී' | 'තහවුරු කර ඇත' | 'අවලංගු කර ඇත';
export type PaymentStatus = 'නොගෙවූ' | 'සත්‍යාපනය වෙමින් පවතී' | 'ගෙවා ඇත';

export interface DonationIntent {
  id: string;
  referenceNumber: string;
  donorName: string;
  telephone: string;
  email?: string;
  purpose: string;
  campaignId?: string;
  campaignTitle?: string;
  intendedAmount: number;
  message?: string;
  status: DonationStatus;
  paymentStatus: PaymentStatus;
  adminNotes?: string;
  createdAt: string;
}

// ----------------- DAYAKATHWAYA (SPONSORSHIPS) -----------------

export interface DayakathwayaCategory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export type OpportunityAvailability = 'available' | 'reserved' | 'completed';
export type ContributionMode = 'නියමිත මුදල' | 'සාකච්ඡා කර තීරණය කිරීම' | 'කැමැත්ත පරිදි';

export interface DayakathwayaOpportunity {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryTitle?: string;
  relatedProgramId?: string;
  eventDate?: string;
  venue?: string;
  contributionMode: ContributionMode;
  suggestedAmount?: number;
  availability: OpportunityAvailability;
  publicationStatus: PublicationStatus;
  instructions?: string;
  maxSponsors?: number;
  currentSponsorsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type SponsorshipRequestStatus = 
  | 'නව ඉල්ලීම'
  | 'සමාලෝචනය වෙමින් පවතී'
  | 'වැඩිදුර තොරතුරු අවශ්‍යයි'
  | 'අනුමත කර ඇත'
  | 'තහවුරු කර ඇත'
  | 'සම්පූර්ණ කර ඇත'
  | 'අවලංගු කර ඇත';

export interface DayakathwayaRequest {
  id: string;
  referenceNumber: string;
  applicantName: string;
  telephone: string;
  email?: string;
  categoryId: string;
  categoryTitle: string;
  opportunityId?: string;
  opportunityTitle?: string;
  proposedAmount?: number;
  agreedAmount?: number;
  preferredDate?: string;
  message?: string;
  preferredContactMethod: 'දුරකථන ඇමතුම්' | 'WhatsApp' | 'විද්‍යුත් තැපෑල';
  consent: boolean;
  requestStatus: SponsorshipRequestStatus;
  paymentStatus: PaymentStatus;
  adminNotes?: string;
  statusHistory?: Array<{ status: SponsorshipRequestStatus; timestamp: string; note?: string }>;
  createdAt: string;
  updatedAt: string;
}

