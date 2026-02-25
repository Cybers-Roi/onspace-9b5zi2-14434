# Eventfy Navigation Structure & Linking Map

## Current Status: 17/30 Screens (57% Complete)

---

## 1. TAB NAVIGATION (Bottom Bar)

### Tab 1: FEED (index.tsx) ○
**Current:** ✅ Implemented
**Links to:**
- `/notifications` - Bell icon (top right) ✅
- `/profile` - Avatar (top right) ✅
- `/story-viewer` - Story circles ✅
- `/create-post` - Floating + button ✅
- `/event/[id]` - Event cards ✅
- `/settings` - Via profile menu ✅

**Missing Links:**
- ❌ Filter tabs (LOCAL/NATIONAL/INTERNATIONAL) - needs travel mode integration
- ❌ Organization profiles from event cards
- ❌ QR check-in from registered events

---

### Tab 2: EXPLORE (explore.tsx) △
**Current:** ✅ Implemented
**Links to:**
- `/event/[id]` - Trending events ✅
- `/org/[id]` - Organization cards ✅

**Missing Links:**
- ❌ Advanced search (`/search-results`) - not yet created
- ❌ Skills detail pages
- ❌ Filter results pages

---

### Tab 3: EVENTS (events.tsx) □
**Current:** ✅ Implemented
**Links to:**
- `/event/[id]` - Event cards ✅

**Missing Links:**
- ❌ Create new event (`/create-event`) - EXISTS but not linked
- ❌ Calendar view
- ❌ QR check-in for registered events

---

### Tab 4: PROFILE (profile.tsx) ◇
**Current:** ✅ Implemented
**Links to:**
- `/passport` - Download button ✅

**Missing Links:**
- ❌ Settings (`/settings`) - EXISTS but not linked from profile
- ❌ Edit profile
- ❌ Badge details
- ❌ Skill verification
- ❌ Social connections (`/connections`) - not yet created
- ❌ Certificate viewer (`/verify-cert`) for earned certificates

---

### Tab 5: CHAT (chat.tsx) ◇
**Current:** ✅ Implemented
**Links to:**
- Currently no navigation links

**Missing Links:**
- ❌ User profiles from messages
- ❌ Channel settings
- ❌ Direct messages
- ❌ Team lobby from team channels

---

## 2. AUTHENTICATION FLOW

### Splash (splash.tsx)
**Current:** ✅ Implemented
**Links to:**
- `/auth` - "JOIN THE GAME" button ✅
- `/auth?mode=login` - "I HAVE AN ACCOUNT" button ✅
- `/auth?mode=register&tab=org` - "JOIN AS ORGANIZATION" link ✅

---

### Auth (auth.tsx)
**Current:** ✅ Implemented
**Links to:**
- `/onboarding` - After successful auth ✅

---

### Onboarding (onboarding.tsx)
**Current:** ✅ Implemented
**Links to:**
- `/(tabs)` - After completion ✅

**Missing:**
- ❌ Player number assignment animation (as shown in reference)
- ❌ Dramatic entrance sequence

---

## 3. EVENT SYSTEM

### Event Detail (event/[id].tsx)
**Current:** ✅ Implemented
**Links to:**
- `/org/[id]` - Organizer card ✅
- `/qr-checkin` - EXISTS but not linked ❌
- `/team-lobby` - Team formation button ✅

**Missing Links:**
- ❌ Volunteer mode activation
- ❌ Certificate preview after completion
- ❌ Event chat channel

---

### Create Event (create-event.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Events tab - Add button
- ❌ Profile - If user is organizer
- ❌ Organization dashboard

---

### QR Check-in (qr-checkin.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Event detail page - "CHECK IN" button when at venue
- ❌ My Events - Quick check-in for today's events
- ❌ Notifications - Check-in reminder

---

### Team Lobby (team-lobby.tsx)
**Current:** ✅ Implemented
**Links to:**
- Back to event detail ✅

**Missing Links:**
- ❌ Direct chat with team
- ❌ Team member profiles

---

## 4. ORGANIZATION SYSTEM

### Org Profile (org/[id].tsx)
**Current:** ✅ Implemented
**Links to:**
- `/event/[id]` - Organization events ✅

**Missing Links:**
- ❌ Command center (if user is admin)
- ❌ Recruiter dashboard
- ❌ Org onboarding wizard (new orgs)

---

### Command Center (command-center.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Org profile - Admin button
- ❌ Profile - If user is organizer
- ❌ Direct link from notifications

---

## 5. GAMIFICATION SYSTEM

### Passport (passport.tsx)
**Current:** ✅ Implemented
**Links to:**
- Back to profile ✅
- `/verify-cert` - Certificate codes ❌ Not linked

---

### Scoreboard (scoreboard.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Profile - Stats/Rankings section
- ❌ Event detail - Leaderboard tab
- ❌ Main menu/burger menu

---

### Verify Certificate (verify-cert.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Passport - Earned certificates
- ❌ Share links (public verification)
- ❌ QR scan from certificate

---

## 6. VOLUNTEER/RECRUITER MODES

### Volunteer Mode (volunteer-mode.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Event detail - "VOLUNTEER" button
- ❌ Profile - Mode switcher
- ❌ Notifications - Volunteer assignments

---

### Travel Mode (travel-mode.tsx)
**Current:** ✅ Implemented
**Location:** NOT LINKED ❌

**Should be accessible from:**
- ❌ Feed - "INTERNATIONAL" tab filter
- ❌ Profile - Travel settings
- ❌ Event detail - International events

---

## 7. CONTENT CREATION

### Create Post (create-post.tsx)
**Current:** ✅ Implemented
**Links to:**
- Back to feed ✅

---

### Story Viewer (story-viewer.tsx)
**Current:** ✅ Implemented
**Links to:**
- `/create-post` - "ADD STORY" ✅
- Back to feed ✅

---

## 8. SETTINGS & UTILITIES

### Settings (settings.tsx)
**Current:** ✅ Implemented
**Links to:**
- Logout → `/splash` ✅
- Profile pages ✅

**Missing Links:**
- ❌ Privacy settings
- ❌ Notification preferences
- ❌ Account management

---

### Notifications (notifications.tsx)
**Current:** ✅ Implemented
**Links to:**
- Various destinations based on notification type ✅

---

## 9. MISSING SCREENS (13 Remaining)

### High Priority:
1. **Recruiter Dashboard** - Golden ticket system, talent discovery
2. **Admin God View** - System-wide analytics and controls
3. **Analytics Dashboard** - Organizer metrics
4. **Org Onboarding Wizard** - 5-step setup for new organizations
5. **Advanced Search Results** - Comprehensive search page
6. **User Connections/Social Graph** - Friends, followers, networking

### Medium Priority:
7. **Stories Creation** - Full story composer with filters
8. **Sponsorship Portal** - Sponsor management for organizers
9. **Local Admin Panel** - Regional moderator tools
10. **Certificate Verification Public Page** - Standalone public verification

### Special Features:
11. **Recruiter Mode** - Talent scouting interface
12. **International Event Discovery** - Enhanced travel mode features
13. **Enhanced Onboarding** - Dramatic player number assignment

---

## 10. RECOMMENDED NAVIGATION FIXES

### Priority 1: Critical Links (Implement Immediately)

```typescript
// 1. Add Settings to Profile
// File: app/(tabs)/profile.tsx
// Add button in header or menu for router.push('/settings')

// 2. Add Create Event to Events Tab
// File: app/(tabs)/events.tsx
// Add FAB or header button for router.push('/create-event')

// 3. Add QR Check-in to Event Detail
// File: app/event/[id].tsx
// Add "CHECK IN" button for router.push('/qr-checkin')

// 4. Link Volunteer Mode from Events
// File: app/event/[id].tsx
// Add "VOLUNTEER" button for router.push('/volunteer-mode')

// 5. Link Scoreboard from Profile
// File: app/(tabs)/profile.tsx
// Add leaderboard icon for router.push('/scoreboard')

// 6. Link Verify Cert from Passport
// File: app/passport.tsx
// Add verification button for router.push('/verify-cert')

// 7. Link Travel Mode from Feed
// File: app/(tabs)/index.tsx
// Make "INTERNATIONAL" tab navigate to router.push('/travel-mode')

// 8. Link Command Center from Org Profile
// File: app/org/[id].tsx
// Add admin button for router.push('/command-center')
```

### Priority 2: Navigation Enhancements

```typescript
// 1. Add Global Menu/Drawer
// Access: Settings, Scoreboard, Modes, Help
// Location: Header burger icon

// 2. Add Mode Switcher in Profile
// Toggle between: Participant, Volunteer, Recruiter, Admin
// Updates available features

// 3. Add Quick Actions Menu
// Floating menu with: Check-in, Create, Volunteer, Share
// Location: Long-press on tab bar

// 4. Add Notification Deep Links
// Each notification type navigates to correct screen
// Example: Event reminder → Event detail with check-in ready
```

### Priority 3: User Experience Improvements

```typescript
// 1. Add Breadcrumb Navigation
// Show current location hierarchy
// Example: Home > Events > Event Detail > Team Lobby

// 2. Add Contextual Back Navigation
// Smart back button based on entry point
// Remember previous screen

// 3. Add Shortcut Actions
// Swipe gestures on cards
// Long-press for quick actions
```

---

## 11. COMPLETE NAVIGATION MAP

```
SPLASH
├─→ AUTH (register/login)
    ├─→ ONBOARDING
        └─→ TABS
            ├─→ FEED (index)
            │   ├─→ Notifications
            │   ├─→ Story Viewer
            │   ├─→ Create Post
            │   ├─→ Event Detail
            │   │   ├─→ QR Check-in ❌
            │   │   ├─→ Team Lobby
            │   │   ├─→ Org Profile
            │   │   └─→ Volunteer Mode ❌
            │   └─→ Profile
            │       ├─→ Settings ❌
            │       ├─→ Passport
            │       │   └─→ Verify Cert ❌
            │       └─→ Scoreboard ❌
            │
            ├─→ EXPLORE
            │   ├─→ Event Detail
            │   ├─→ Org Profile
            │   └─→ Search Results ❌
            │
            ├─→ EVENTS
            │   ├─→ Event Detail
            │   ├─→ Create Event ❌
            │   └─→ QR Check-in ❌
            │
            ├─→ PROFILE
            │   ├─→ Passport
            │   ├─→ Settings ❌
            │   ├─→ Scoreboard ❌
            │   └─→ Edit Profile ❌
            │
            └─→ CHAT
                ├─→ User Profiles ❌
                └─→ Team Lobby ❌

ORG PROFILE
├─→ Event Detail
├─→ Command Center ❌
└─→ Recruiter Dashboard ❌

STANDALONE SCREENS
├─→ Travel Mode ❌
├─→ Volunteer Mode ❌
├─→ Verify Cert (public) ❌
└─→ Analytics Dashboard ❌
```

---

## 12. IMPLEMENTATION CHECKLIST

### Phase 1: Fix Existing Links (1-2 hours)
- [ ] Add Settings button to Profile header
- [ ] Add Create Event FAB to Events tab
- [ ] Add QR Check-in to Event Detail (when registered)
- [ ] Add Volunteer Mode to Event Detail
- [ ] Add Scoreboard to Profile stats
- [ ] Link Verify Cert from Passport
- [ ] Link Travel Mode from Feed INTERNATIONAL tab
- [ ] Link Command Center from Org Profile (for admins)

### Phase 2: Build Missing High-Priority Screens (3-4 hours)
- [ ] Recruiter Dashboard
- [ ] Admin God View
- [ ] Analytics Dashboard
- [ ] Search Results Page
- [ ] User Connections Page
- [ ] Org Onboarding Wizard

### Phase 3: Enhanced Features (2-3 hours)
- [ ] Stories Creation Screen
- [ ] Mode Switcher Component
- [ ] Global Navigation Menu
- [ ] Enhanced Onboarding Animation

### Phase 4: Polish & Testing (1 hour)
- [ ] Test all navigation paths
- [ ] Verify back navigation
- [ ] Check deep link handling
- [ ] Test notification navigation
- [ ] Verify authentication guards

---

## 13. KEY DESIGN PATTERNS

### Navigation Guards
```typescript
// Check if user has permission
const canAccessAdminScreen = userRole === 'admin' || userRole === 'organizer';

// Show mode-specific features
const showVolunteerButton = event.needsVolunteers && !event.userIsRegistered;

// Time-based features
const showCheckInButton = isEventToday && userIsRegistered;
```

### Dynamic Routing
```typescript
// Event-based navigation
onNotificationPress={(notif) => {
  switch(notif.type) {
    case 'event_reminder': router.push(`/event/${notif.eventId}`);
    case 'check_in': router.push(`/qr-checkin?event=${notif.eventId}`);
    case 'team_formed': router.push(`/team-lobby?team=${notif.teamId}`);
  }
}}
```

### Context-Aware Back Navigation
```typescript
// Remember entry point
const [previousScreen, setPreviousScreen] = useState(null);

// Smart back
onBackPress={() => {
  if (previousScreen) router.push(previousScreen);
  else router.back();
}}
```

---

**Last Updated:** Current Session
**Next Review:** After implementing Phase 1 fixes
