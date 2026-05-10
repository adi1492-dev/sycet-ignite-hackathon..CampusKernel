# **CAMPUSKERNAL: Campus Hub**

## **Product Requirements Document (PRD)**

**Version:** 1.0

**Last Updated:** May 2026

**Project Timeline:** 1–2 weeks

**Team:** Solo/Small team (CSE students)

## **1. Executive Summary**


**Project Name:** CAMPUSKERNAL: Campus Hub


**Tagline:** An offline-first campus learning platform that solves three critical problems:


1. **Network Drops** → Students lose exam code and assignments when WiFi fails


2. **Slow Content Delivery** → Downloading 1GB lecture videos takes hours over shared college WiFi


3. **Scattered Grade Tracking** → Teachers manage marks via email, spreadsheets, or manual entry


**Solution:** A unified web app that works on campus WiFi (LAN), syncs automatically when online, and

installs on phones/laptops like a native app.


**Why It Matters:**


Every student on campus has experienced losing work due to WiFi


Teachers waste hours managing grades manually


No other campus has solved this locally—this is a competitive advantage for your college


## **2. Problem Statement**

### **2.1 Pain Points**
















|User|Problem|Impact|Today's Solution|
|---|---|---|---|
|**Student**|Code lost when WiFi drops<br>mid-exam|Failed lab assignments|Manually re-write code (time lost,<br>memory loss)|
|**Student**|1GB video lecture takes 2+<br>hours to download|Can't study offline before<br>exams|Download overnight on home WiFi<br>(inconvenient)|
|**Student**|Can't see marks until teacher<br>emails results|No transparency on<br>performance|Check email constantly or ask<br>teacher|
|**Teacher**|Manage 50+ CSV files with<br>grades|Error-prone, time-<br>consuming|Spreadsheet + email (manual<br>merging)|
|**Teacher**|No way to assign code labs with<br>auto-grading|Grade 50 submissions<br>manually|Copy/paste output, check<br>correctness by hand|
|**Campus**<br>**IT**|WiFi goes down, no fallback for<br>students|Loss of learning time|Nothing—hope WiFi comes back|


### **2.2 Why Existing Solutions Don't Work**

|Solution|Issue|
|---|---|
|**Google Classroom**|Requires internet; assignments don't auto-execute code|
|**GitHub Classroom**|Offline code editing limited; no integrated grade tracking|
|**Replit / HackerRank**|Cloud-only; depends on external internet (defeats purpose)|
|**Local USB drives**|Manual file sharing; no sync; breaks if lost|
|**Email + Spreadsheet**|Fragmented, error-prone, no real-time updates|



**Key Insight:** No existing tool combines _offline-first_, _code execution_, _grade tracking_, and _LAN-based_

_file serving_ in one place.

## **3. Vision & Goals**

### **3.1 Vision Statement**


_**"Every student on campus can code, learn, and track progress—regardless of WiFi."**_


CAMPUSKERNAL is not a cloud app. It's a **campus operating system** :


Teachers broadcast lectures and notes over LAN (no internet needed)


Students code locally, auto-save, auto-submit when connection restores


Grades sync in real-time across all devices


Everything works offline with service workers and local caches

### **3.2 Strategic Goals**


1. **Reliability:** Zero loss of work due to network drops


2. **Speed:** Download 1GB video in seconds (LAN speed, not WAN)


3. **Simplicity:** Install on home screen like Slack; no browser tabs needed


4. **Completeness:** All campus learning in one place (notes, code, grades)


5. **Deployability:** Your college can run this on a single server

## **4. Target Users & Personas**

### **Persona 1: CS Lab Student (Aditya)**


**Age:** 18–22


**Pain:** Writing code in the lab, WiFi drops, loses 30 minutes of work


**Need:** Automatic queuing of submissions; offline code editor


**Success Metric:** Never loses code again; can download lecture videos once and study offline

### **Persona 2: CS Teacher (Dr. Sharma)**


**Age:** 35–50


**Pain:** Managing 50 student submissions, grading manually, emailing results


**Need:** Dashboard to upload marks CSV, auto-grade code submissions, track who's struggling


**Success Metric:** Grade 50 assignments in 10 minutes instead of 2 hours

### **Persona 3: Campus IT Admin (Network Team)**


**Age:** 30–45


**Pain:** When WiFi goes down, students lose learning time; no fallback systems


**Need:** A platform that works without internet; reduces support tickets


**Success Metric:** Students can work offline; IT team has fewer emergency calls


## **5. Features & Scope**

### **5.1 Must-Have Features (MVP - Week 1)**

**For Students**


✅ **Dashboard** → View marks, download notes/PDFs, access lecture videos


✅ **Code Editor** → Write C, Rust, or Go code in a web editor


✅ **Submit Code** → Auto-queues if offline, executes when connection restores


✅ **View Results** → See execution time, output, memory usage


✅ **Download Content** → Notes, PDFs, video lectures (one-click download)


**For Teachers**


✅ **Upload Marks** → CSV upload (columns: Student ID, Subject, Mark)


✅ **View Submissions** → List of all code submissions from students


✅ **Dashboard** → Overview of class performance


**For Campus (LAN Infrastructure)**


✅ **File Server** → Serve notes/PDFs/lectures over HTTP on campus LAN


✅ **API Server** → HTTP endpoints for all operations (code execution, marks, login)


✅ **Database** → PostgreSQL for users, marks, submissions


✅ **Job Queue** → Redis + BullMQ for code execution jobs

### **5.2 Should-Have Features (Week 1–2 Polish)**


📱 **PWA Installation** → "Add to home screen" on iOS/Android


🔄 **Offline Sync** → Cache marks/notes locally; sync when online


🎨 **Dark Mode** → Comfortable for long study sessions


📊 **Teacher Analytics** → Which topics are students struggling with?


🔐 **Role-Based Access** → Students see only their marks; teachers see all

### **5.3 Nice-to-Have Features (Future Releases)**


🎬 **Video Streaming** → Stream lectures instead of download


🤖 **Auto-Grading** → Compare code output against test cases


💬 **Peer Discussion** → Offline forum for students


📈 **Analytics Dashboard** → Track learning progress over semester


🌍 **Multi-Language Support** → Hindi, Marathi, etc.

### **5.4 Out of Scope**


❌ Real-time video call classes


❌ AI-powered tutoring


❌ Mobile-only app (web-first; PWA handles mobile)


❌ Integration with external LMS (Moodle, Canvas)


## **6. Technical Architecture**

### **6.1 System Overview**

```
 ┌─────────────────────────────────────────┐

  │    Campus WiFi LAN (192.168.x.x)  │

  ├─────────────────────────────────────────┤

  │                     │

  │ ┌─────────────┐  ┌────────────────┐ │

  │ │ Student   │  │ Teacher    │ │

  │ │ Laptop/   │◄──►│ Dashboard   │ │

  │ │ Phone    │  │ (Browser)   │ │

  │ │ (PWA)    │  └────────────────┘ │

  │ └─────────────┘            │

  │    │                │

  │    │ HTTP/REST           │

  │    ▼                │

  │ ┌─────────────────────────────────┐  │

  │ │  CAMPUSKERNAL Backend (Go Fiber)   │  │

  │ ├─────────────────────────────────┤  │

  │ │ Routes:             │  │

  │ │ POST /api/auth/login      │  │

  │ │ POST /api/code/submit      │  │

  │ │ GET /api/code/status/{id}   │  │

  │ │ GET /api/marks         │  │

  │ │ POST /api/teacher/upload-marks │  │

  │ │ GET /files/* (notes, PDFs)   │  │

  │ └─────────────────────────────────┘  │

  │    │     │     │     │

  │  ┌────▼──┐ ┌──────▼──┐ ┌──▼──────┐  │

  │  │ Redis │ │Postgres │ │ Docker │  │

  │  │ Queue │ │ Database│ │ Daemon │  │

  │  └───────┘ └─────────┘ └─────────┘  │

  │                     │

  └─────────────────────────────────────────┘

  │

  │ Only when internet is UP

  │

  ▼

  ┌─────────────┐

  │ Internet  │

```

```
  │ (Optional) │

  └─────────────┘

### **6.2 Tech Stack**

```

|Layer|Technology|Why|
|---|---|---|
|**Frontend**|Next.js (React + SSR)|Fast, full-stack, supports PWA|
|**Frontend Styling**|TailwindCSS|Rapid UI development|
|**Frontend Offline**|Service Worker + SQLite.js|Cache notes/marks; work offline|
|**Backend**|Go Fiber|High-concurrency, fast startup|
|**Database**|PostgreSQL|Reliable; ACID for marks/grades|
|**Job Queue**|Redis + BullMQ|Auto-retry; handle offline submissions|
|**Code Sandbox**|Docker|Isolation; prevent code escapes|
|**File Server**|Go Fiber (static middleware)|Serve notes/PDFs/videos from`/files`|
|**Deployment**|Docker Compose|One command to deploy on campus server|


### **6.3 Database Schema (Simplified)**

```
 -- Users (Students + Teachers)

  CREATE TABLE users (

  id UUID PRIMARY KEY,

  email VARCHAR UNIQUE,

  password_hash VARCHAR,

  name VARCHAR,

  role ENUM ('student', 'teacher'),

  created_at TIMESTAMP

  );

  -- Marks/Grades

  CREATE TABLE marks (

  id UUID PRIMARY KEY,

  student_id UUID REFERENCES users(id),

  subject VARCHAR,

  marks INT,

  uploaded_at TIMESTAMP

  );

  -- Code Submissions

  CREATE TABLE submissions (

  id UUID PRIMARY KEY,

  student_id UUID REFERENCES users(id),

  code TEXT,

  language ENUM ('c', 'rust', 'go'),

  status ENUM ('pending', 'queued', 'running', 'completed', 'failed'),

  output TEXT,

  execution_time_ms INT,

  submitted_at TIMESTAMP,

  completed_at TIMESTAMP

  );

  -- Files (Notes, PDFs, Lectures)

  CREATE TABLE files (

  id UUID PRIMARY KEY,

  filename VARCHAR,

  file_path VARCHAR,

  file_size INT,

  uploaded_by UUID REFERENCES users(id),

```

```
  uploaded_at TIMESTAMP

  );

### **6.4 API Endpoints (RESTful)**

```

**Authentication**





**Student: Code Execution**

```
 POST /api/code/submit

  Body: { code, language: "c|rust|go" }

  Response: { submission_id, status: "queued" }

  GET /api/code/status/:submission_id

  Response: { status, output, execution_time_ms }

```

**Student: Marks & Files**






**Teacher: Upload Marks**





**Files: Static Serving**






## **7. User Workflows**

### **7.1 Student Workflow: Submit Code During Exam**








### **7.2 Teacher Workflow: Upload Marks & Track Performance**




### **7.3 Network Drop Recovery (The Key Feature)**






## **8. Success Metrics (How Judges Will Evaluate You)**

### **8.1 Technical Metrics**

✅ Code executes reliably (no crashes)


✅ Handles 100+ concurrent submissions without lag


✅ App works offline (no blank pages)


✅ Installs on home screen (PWA works)


✅ Database correctly stores and retrieves marks

### **8.2 User Experience Metrics**


✅ Student can submit code in <30 seconds


✅ Teacher can upload 50 marks in <2 minutes


✅ No data loss when WiFi drops


✅ Mobile UI is responsive (works on phone)

### **8.3 Business/Impact Metrics**


✅ Solves a real campus problem (network drops)


✅ Reduces teacher grading time by 50%+


✅ Could be deployed by any college


✅ Clear competitive advantage for your campus

## **9. Competitive Advantages**


|Feature|CampusKernal|Google Classroom|GitHub Classroom|Replit|
|---|---|---|---|---|
|Works offline|✅|❌|⚠ (partial)|❌|
|LAN-based (no internet)|✅|❌|❌|❌|
|Auto-grades code|✅|❌|❌|⚠|
|Integrated grade tracking|✅|✅|❌|❌|
|PWA (installable)|✅|⚠|⚠|⚠|
|Works during network drops|✅|❌|❌|❌|


## **10. Implementation Plan (1–2 Week Timeline)**

### **Phase 1: Week 1 (Days 1–7) — MVP Shipping**

**Goal:** Get a complete, working system judges can test

|Days|Deliverable|What's Built|
|---|---|---|
|1–2|Backend API + Docker Sandbox|Go Fiber server, code execution in Docker|
|3–4|File Server + Database|LAN file serving, PostgreSQL schema, auth|
|5–6|Frontend + Job Queue|Next.js UI, Redis queue for submissions|
|7|Testing + Demo Prep|Load testing, demo script, GitHub repo|



**By end of Day 7:** You have a working system with all core features.

### **Phase 2: Week 2 (Days 8–14) — Polish & PWA**


**Goal:** Add reliability features and mobile support

|Days|Deliverable|What's Added|
|---|---|---|
|8–10|PWA + Offline Cache|Service worker, home screen installation|
|11–13|Security + Polish|Error handling, rate limiting, dark mode|
|14|Final Rehearsal|Practice pitch, deploy to staging|



**By end of Day 14:** Ship a polished, production-grade system.

## **11. Demo Script (For Judges)**


**Duration:** 3 minutes

### **Setup**


Run CampusKernal backend + frontend locally


Have sample data: 10 students, 5 lecture PDFs, sample code submission

### **Flow**


**[00–30 sec] Problem Statement**


_"Campus WiFi is unreliable. Every semester, students lose code during exams. Teachers manage_

_grades manually. We built CAMPUSKERNAL to solve this."_


**[30–60 sec] Show LAN Portal**


_[Open dashboard] "Here's a lecture note and a PDF. Both downloaded over the campus LAN in_

_seconds. If internet dies, students can still study—no buffering, no wait."_


**[60–90 sec] Code Submission + Offline Handling**


_[Open code editor] "Write a simple C program. Click submit. The code is compiled in an isolated_

_Docker container." [Intentionally disconnect WiFi] "WiFi is down. Notice the queue shows_

_'Waiting for connection.' Code is safe." [Reconnect WiFi] "Connection is back—automatic sync._

_Results appear instantly."_


**[90–120 sec] Teacher Dashboard + Marks**


_[Switch to teacher view] "Upload marks as a CSV. 50 student marks uploaded in 2 seconds._

_Students see their marks in real-time on their dashboard. Teachers see class analytics: average,_

_passing rate, struggling students."_


**[120–150 sec] Close**


_"CAMPUSKERNAL is production-ready—Docker isolation, PostgreSQL for reliability, PWA for mobile. One_

_server deployment, and any campus can run this. We're shipping a platform that actually solves a_

_problem."_

## **12. Risk Mitigation**


|Risk|Impact|Mitigation|
|---|---|---|
|Docker setup fails|Can't run code|Pre-install Docker locally; test Day 1|
|Database crashes|Lose data|Daily backups; test recovery|
|WiFi doesn't fail during demo|Can't show key feature|Pre-record offline scenario; replay video|
|Too many concurrent users|Server slows down|Load test with 100+ submissions; optimize queries|
|Auth breaks|Can't log in|Simple JWT token; extensive testing|


## **13. Deployment & Maintenance**

### **13.1 Deployment (Campus IT Can Do This)**

```
 # 1. Clone repository

  git clone <campuskernal-repo>

  # 2. Start services

  docker-compose up -d

  # 3. Access via LAN

  # http://192.168.1.100:3000 (or campus server IP)

### **13.2 Hardware Requirements**

```

**Server:** Any Linux machine (even a Raspberry Pi works)


**CPU:** Quad-core minimum (for concurrent Docker containers)


**RAM:** 8GB minimum; 16GB recommended


**Storage:** 100GB (for lecture videos + student submissions)


**Network:** Campus LAN connection (any speed; works even on slow WiFi)

### **13.3 Maintenance**


**Backups:** Daily automatic backup of PostgreSQL


**Updates:** Teachers can add new notes/PDFs without IT help


**Monitoring:** Simple health check endpoint for IT team

## **14. Success Criteria for Hackathon**


You **WIN** if judges see:


1. ✅ **It Works** → No crashes during demo; code executes


2. ✅ **It's Complete** → All 5 components (file server, code execution, marks, teacher dashboard, PWA)


3. ✅ **It Solves a Real Problem** → Network drop recovery shown & working


4. ✅ **It's Polished** → Dark mode, responsive design, error messages make sense


5. ✅ **It's Shippable** → GitHub repo has documentation; IT team could deploy it


## **15. Budget & Resources**

### **15.1 Development**

**Time:** 1–2 weeks (solo or small team)


**Tools:** Free (Go, Docker, PostgreSQL, Next.js all open-source)


**Hosting:** Your laptop for demo; campus server for real deployment

### **15.2 Hardware**


**For Demo:** Your laptop + WiFi (any router works)


**For Production:** Campus server (IT team provides)

## **16. Glossary**

|Term|Definition|
|---|---|
|**LAN**|Local Area Network (campus WiFi; works without internet)|
|**PWA**|Progressive Web App (installs on phone like a native app)|
|**Docker**|Container technology (runs code safely in isolation)|
|**Job Queue**|System that stores tasks and processes them in order|
|**Offline-First**|Works without internet; syncs when connection returns|
|**Cold Start**|First time app loads (should be fast)|


## **17. Appendix: Competitor Analysis**

### **Why Not Just Use...?**


**Google Classroom + Replit?**


Requires internet; no offline support


Can't work during campus WiFi outages


Marks in Classroom, code in Replit (fragmented)


**GitHub Classroom?**


Offline code editing limited


No integrated grade tracking


No auto-execution of code


**Local USB Drives + Email?**


Manual file sharing; no sync


Lost if USB is misplaced


Marks spread across email threads


**Our Competitors:**


None have built an **offline-first platform** for a single campus


None have combined **code execution + marks + file serving** in one place


None work on **LAN without internet**


**CampusKernal is Unique Because:** ✅ Works offline

✅ Works on campus LAN

✅ All-in-one platform

✅ Deployable by any college

## **18. Future Roadmap (Post-Hackathon)**

### **Phase 2 (Month 2–3)**


Video streaming with pause/resume


Auto-grading based on test cases


Plagiarism detection for code submissions


Anonymous peer review system

### **Phase 3 (Month 4+)**


Multi-campus federation (sync between colleges)


Mobile app (iOS/Android native)


AI-powered study recommendations


Department-wide analytics


**END OF PRD**


For questions, contact: [Your Email]


