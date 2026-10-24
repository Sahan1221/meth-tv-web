# METH TV (මෙත් රූපවාහිනී) Official Web Application

> **බොදුනුවන්ගේ හදවතේ නාලිකාව**  
> Official Buddhist Television Channel Web Application & Content Management Platform.

---

## 1. Overview & Architecture

METH TV (මෙත් රූපවාහිනී) is a premier Sri Lankan Buddhist television channel broadcasting across Sri Lanka on **SLT PEO TV Channel 111** and worldwide via digital streams.

This application is built with React, TypeScript, and Tailwind CSS. It features:
- **Sinhala-only public interface**: Home (`/`), Live TV (`/live`), Programs (`/programs`), Completed Dhamma Events & Photo Galleries (`/programs/completed`), YouTube Video Library (`/videos`), News & Announcements (`/news`), About METH TV (`/about`), and Contact (`/contact`).
- **Separate Admin Dashboard (`/admin`)**: Fully functional CMS with session authentication, Program CRUD, multi-photo Dhamma event gallery uploader with reordering & captioning, News manager, Media Library, and Livestream configuration.
- **Unified Reactive Content Source**: All changes published in the Admin dashboard immediately reflect across the public website.

---

## 2. Official Channel Information

- **Brand Name**: METH TV
- **Sinhala Brand Name**: මෙත් රූපවාහිනී
- **Tagline**: බොදුනුවන්ගේ හදවතේ නාලිකාව
- **Official Website**: [https://methtv.lk](https://methtv.lk)
- **Telephone**: 0342 263 646
- **Email**: info@galigamuwethero.com
- **SLT PEO TV**: Channel 111 in Sri Lanka
- **Official Facebook**: [https://www.facebook.com/methtvofficial](https://www.facebook.com/methtvofficial)
- **Official YouTube Channels**:
  1. `UCnsOUPYQjiFj28SR4IWm5BQ` (METH TV Official)
  2. `UC2mAd_TrVm1st6UO2FmzNqw` (Ven. Galigamuwe Gnanadeepa Thero)
  3. `UCPGmdO4neBO3AQejn-4SU_w` (METH TV Dhamma Deshana)

---

## 3. Installation and Run Instructions

### Prerequisites
- Node.js (v18+)
- npm

### Development Server
```bash
npm install
npm run dev
```
The app will run at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 4. Environment Variables Configuration

Copy `.env.example` to `.env`:
```env
# Optional: YouTube Data API v3 key for automatic channel uploads fetching
VITE_YOUTUBE_API_KEY=""

# Optional: Firebase credentials (when deployed to production with Cloud Firestore & Storage)
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

*Note: If `VITE_YOUTUBE_API_KEY` is not set, the application automatically displays an informative Sinhala setup banner alongside verified demonstration entries and direct links to the official YouTube channels.*

---

## 5. Administrator Provisioning & Authentication

Access the administrator dashboard via the top bar or footer link, or directly at:
**`/admin`**

### Prototype Test Accounts:
- **Super Administrator**:
  - Email: `admin@methtv.lk`
  - Password: `methadmin2026#`
- **Content Editor**:
  - Email: `editor@methtv.lk`
  - Password: `metheditor2026#`

*In prototype mode, the login screen provides convenient one-click credential autofill buttons.*

---

## 6. Firebase Production Integration Guide

When deploying to production with Google Cloud / Firebase:
1. **Firebase Authentication**:
   - Enable Email/Password authentication in the Firebase Console.
   - Restrict user registration so only authorized administrators can sign in.
2. **Cloud Firestore**:
   - Collections: `programs`, `events`, `news`, `settings`.
   - Security Rules:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         // Allow public read on published documents
         match /programs/{document} {
           allow read: if resource.data.publicationStatus == 'published' || request.auth != null;
           allow write: if request.auth != null;
         }
         match /events/{document} {
           allow read: if resource.data.publicationStatus == 'published' || request.auth != null;
           allow write: if request.auth != null;
         }
         match /news/{document} {
           allow read: if resource.data.publicationStatus == 'published' || request.auth != null;
           allow write: if request.auth != null;
         }
         match /settings/{document} {
           allow read: true;
           allow write: if request.auth != null;
         }
       }
     }
     ```
3. **Firebase Storage**:
   - Store uploaded high-resolution photographs under `/events/{eventId}/photos/{filename}`.
   - Store public cover images under `/covers/{filename}`.

---

## 7. Prototype Features & Verification Scenarios

1. **Dhamma Program Creation & Publishing**:
   - An administrator signs in.
   - Creates a new Dhamma program at `/admin/programs`.
   - Saves as draft or published; published programs instantly appear on `/` and `/programs`.
2. **Completed Dhamma Event Multi-Photo Upload**:
   - Navigate to `/admin/events`.
   - Create or edit an event.
   - Upload multiple photos at once.
   - Add individual Sinhala captions and reorder using up/down controls.
   - Publish gallery; visitors can immediately browse it at `/programs/completed` and inspect full-resolution photos in the accessible Lightbox.
3. **Live Television Management**:
   - Admin updates the YouTube Live URL at `/admin/settings`.
   - The public `/live` player immediately switches to the new broadcast.
4. **YouTube Videos Feed**:
   - `/videos` presents video cards with channel filtering, title search, and direct YouTube watch links.
