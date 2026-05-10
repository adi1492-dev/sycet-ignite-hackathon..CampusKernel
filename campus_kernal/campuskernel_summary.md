# **CAMPUSKERNAL: Campus Hub**

## **One-Page Project Summary** 🎯 What We're Building

**Name:** CAMPUSKERNAL: Campus Hub

**Tagline:** Offline-first platform for campus learning

**Timeline:** 1–2 weeks

**Team:** 1–2 CSE students

## 🔴 The Problem


Every semester:


❌ Students lose code when WiFi drops → Fail assignments


❌ Teachers manage 50+ grades manually → 2+ hours of work


❌ 1GB lecture videos take 2+ hours to download


❌ No backup when campus WiFi is down → Learning stops


**Why this matters:** 30% of CS students experience network drops during exams.

## 💡 Our Solution


A unified platform that:


✅ Works on campus WiFi (LAN) — **no internet needed**


✅ Auto-queues code when offline, auto-executes when connection returns


✅ Tracks student marks in real-time


✅ Serves lectures/notes at LAN speed (seconds, not hours)


✅ Installs on phone like Slack (PWA)


## 🏗️ Architecture



**Key Tech:**


**Frontend:** Next.js + React + PWA


**Backend:** Go Fiber (fast, concurrent)


**Database:** PostgreSQL (reliable)


**Queue:** Redis + BullMQ (handles offline submissions)


**Sandbox:** Docker (secure code execution)

## 📋 Core Features

### ✅ Week 1 (MVP)

|User|Features|
|---|---|
|**Student**|✓ View marks✓ Download notes/PDFs✓ Write & submit code✓ See execution results✓ Auto-<br>queue offline|
|**Teacher**|✓ Upload marks (CSV)✓ View submissions✓ See class stats|
|**System**|✓ File server (LAN)✓ Code execution (Docker)✓ Database (PostgreSQL)✓ Job queue (Redis)|


### ✅ Week 2 (Polish)


|Feature|What It Does|
|---|---|
|**PWA Installation**|Students "install" app on phone home screen|
|**Offline Sync**|Marks cached locally; sync when online|
|**Dark Mode**|Eye-friendly for late-night coding|
|**Error Handling**|Timeouts, memory limits, bad code handled gracefully|


## 📅 14-Day Timeline

|Phase|Days|Deliverable|Status|
|---|---|---|---|
|**Core Backend**|1–2|Go API + Docker sandbox|⏳ Start here|
|**File Server + DB**|3–4|LAN file server + PostgreSQL|⏳ Next|
|**Frontend + Queue**|5–6|Next.js UI + Redis queue|⏳ Follow|
|**Testing + Demo**|7|Load test + demo script|⏳ Week 1 end|
|**PWA + Offline**|8–10|Service workers + cache|⏳ Week 2 start|
|**Security + Polish**|11–13|Error handling, dark mode|⏳ Final sprint|
|**Rehearsal**|14|Practice pitch, final check|⏳ Launch day|


## 🎬 Demo Flow (3 minutes)

**Setup:** Backend + frontend running locally

**WiFi:** Use a real router (or simulate WiFi drop with dev tools)


**Script:**


1. **[30 sec]** Open student dashboard → Show marks, downloaded notes


2. **[45 sec]** Write C code → Submit → Code executes in Docker (instant)


3. **[45 sec]** Disconnect WiFi → Show "queued offline"


4. **[45 sec]** Reconnect WiFi → Auto-sync → Results appear


5. **[30 sec]** Show teacher dashboard → Upload CSV → Marks sync to students


**Key Message:** "Zero data loss. Students never lose work again."

## 🎯 Success Criteria

### **Technical**


✅ Code executes without crashing

✅ Handles 100+ concurrent submissions

✅ App works offline (service worker)

✅ Installs on home screen (PWA)

✅ Database correctly stores/retrieves data


### **User Experience**

✅ Submit code in <30 seconds

✅ Teacher uploads 50 marks in <2 minutes

✅ Zero data loss during WiFi drops

✅ Mobile UI responsive

### **Business**


✅ Solves real problem (network drops)

✅ Reduces teacher grading time 50%+

✅ Could be deployed by any college

✅ Shippable code + documentation

## 💻 **Tech Stack Summary**

|Component|Technology|Why|
|---|---|---|
|Frontend|Next.js + React|Fast, SSR, PWA support|
|Backend|Go Fiber|High-concurrency, reliable|
|Database|PostgreSQL|ACID, production-grade|
|Cache/Queue|Redis + BullMQ|Auto-retry, offline handling|
|Sandbox|Docker|Isolated, secure|
|Styling|Tailwind CSS|Rapid UI development|
|Deployment|Docker Compose|One-command setup|


## 📊 Expected Impact


If deployed at your college:


|Metric|Before|After|
|---|---|---|
|Code lost to WiFi drops|30% of students|0%|
|Time to grade 50 submissions|120 minutes|20 minutes|
|Lecture video download time|2+ hours|<5 minutes|
|Student frustration|High|Low|


## 🚀 Why This Wins Hackathons

✅ **Solves a real problem** - Every student on campus loses code to WiFi

✅ **Technically sophisticated** - Docker, queuing, offline-first architecture

✅ **Complete product** - Not a demo; it's shippable

✅ **Unique angle** - No other tool combines offline + code execution + marks

✅ **Deployable** - Campus IT could actually run this

✅ **Impact** - Transforms how students learn

## 👥 Team Responsibilities

### **Person A (Backend)**


Go Fiber API scaffolding


Docker sandbox integration


PostgreSQL schema & queries


Authentication middleware

### **Person B (Frontend)**


Next.js project setup


Student dashboard UI


Code editor component


Teacher dashboard

### **Person C (Infrastructure)**


Docker Compose setup


Database initialization


Redis queue configuration


Deployment scripts

### **Person D (Lead / Solo)**


Architecture decisions


Coordinate team


Quality assurance


Demo preparation


## 📱 Key File Locations


## 🔗 Documentation Links

**Full PRD:** `campuskernal_prd.md` (18 pages, detailed specs)


**This Document:** `campuskernal_summary.md` (one-page reference)

## ✨ Quick Stats


|Metric|Value|
|---|---|
|**Lines of Code**|~2,000 (backend + frontend)|
|**Number of Endpoints**|10+|
|**Database Tables**|4|
|**Docker Containers**|4 (PostgreSQL, Redis, API, Frontend)|
|**Development Time**|14 days|
|**Team Size**|1–2 people|
|**External Dependencies**|0 (all open-source)|
|**Cost**|$0|


## 🎓 **Learning Outcomes**

After building CampusKernal, you'll know:


✅ Full-stack web development (frontend + backend)

✅ Containerization (Docker)

✅ Database design (PostgreSQL)

✅ Job queuing (Redis)

✅ Offline-first architecture (PWA, service workers)

✅ High-concurrency systems (Go)

✅ Team coordination (Git, GitHub)


These are **enterprise-grade skills** . Employers care deeply about this.

## 🏁 Winning Pitch (60 seconds)


_"Campus WiFi is unreliable. Students lose code during exams. Teachers waste time grading_

_manually. We built_ _**CAMPUSKERNAL**_ _—an offline-first platform that works on campus WiFi, auto-queues_

_submissions when offline, and syncs when connection returns._

_It's production-grade: Docker isolation, PostgreSQL for reliability, PWA for mobile. It's built to be_

_deployed. Any campus could run this next semester._


_Demo: [Live demo showing offline-to-online sync]_


_Result: Zero data loss. Students never lose work again."_

## ❓ FAQ


**Q: Is 2 weeks enough?**

A: Yes. We're shipping MVP by Day 7 (fully functional). Week 2 is polish.


**Q: Do we need to be experts in Go/Docker?**

A: No. I'll teach you. These tools are learner-friendly.


**Q: What if something breaks during demo?**

A: We have a pre-recorded video showing the offline scenario as backup.


**Q: Can this actually be deployed?**

A: Yes. `docker-compose up` and it runs. Campus IT can manage it.


**Q: Why will judges pick this over other projects?**

A: Complete product. Real problem solved. No one else built this.


## 🚀 Next Steps

1. **Today:** Read this summary + the PRD


2. **Tomorrow:** Install tools, start backend scaffold


3. **Days 3–7:** Build features (follow timeline)


4. **Days 8–14:** Polish and prepare demo


5. **Hackathon Day:** Ship and present


**Let's build something real.** 🎯


Questions? Create a GitHub issue or ask in the team chat.


**CAMPUSKERNAL: Campus Hub**

_Built by students. For students._

_Shipping in 2 weeks._ 🚀


