# **CAMPUSKERNAL: Campus Hub**

## **Quick Start Guide for Developers**

**Last Updated:** May 2026

**For:** CSE Students Building the Hackathon Project

## **Before You Start (Prerequisites)**

### **Install These Tools (15 minutes)**


**1. Git**

```
 # macOS

  brew install git

  # Ubuntu/Debian

  sudo apt-get install git

  # Windows: https://git-scm.com/download/win

```

**2. Docker**



**3. Go (v1.21+)**


**4. Node.js (v18+)**







**5. PostgreSQL (Optional for Local Dev)**






### **Check Your Setup**




## **Step 1: Create Project Structure (5 minutes)**







**Final structure:**


## **Step 2: Backend Setup (Go Fiber + PostgreSQL)**

### **Create campuskernal-backend/go.mod**






### **Run Backend**

```
 cd campuskernal-backend

  go run cmd/api/main.go

  # Should print:

  # ┌───────────────────────────────────────────────────────┐

  # │ Fiber v2.x.x server is running on http://127.0.0.1:8080 │

  # └───────────────────────────────────────────────────────┘

```

**Test it:**


## **Step 3: Frontend Setup (Next.js)**

### **Navigate to Frontend**




```
  {marks.map((mark, idx) => (

  <div key={idx} className="bg-blue-50 p-4 rounded border-l-4 border-bl

  ue-600">

  <p className="text-sm text-gray-600">{mark.subject}</p>

  <p className="text-2xl font-bold">{mark.marks}</p>

  </div>

  ))}

  </div>

  )}

  </section>

  {/* Code Editor Card */}

  <section className="bg-white rounded-lg shadow p-6">

  <h2 className="text-2xl font-bold mb-4">Submit Code</h2>

  <textarea

  placeholder="Paste your C/Rust/Go code here..."

  className="w-full h-64 p-3 border border-gray-300 rounded font-mono text
  sm"

  />

  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-b

  lue-700">

  Submit Code

  </button>

  </section>

  </main>

  {/* Footer */}

  <footer className="bg-gray-800 text-white p-6 text-center mt-12">

  <p>CAMPUSKERNAL © 2026 | Built for Campus Learning</p>

  </footer>

  </div>

  );

  }

### **Run Frontend**

```

## **Step 4: Docker Setup (Sandbox + Database)**

### **Create docker-compose.yml**

```
 version: '3.8'

  services:

  # PostgreSQL Database

  postgres:

  image: postgres:15

  environment:

  POSTGRES_USER: campuskernal

  POSTGRES_PASSWORD: campuskernal_password

  POSTGRES_DB: campuskernal_db

  ports:

  - "5432:5432"

  volumes:

  - postgres_data:/var/lib/postgresql/data

  # Redis (for job queue)

  redis:

  image: redis:7-alpine

  ports:

  - "6379:6379"

  # Backend API

  api:

  build: ./campuskernal-backend

  ports:

  - "8080:8080"

  environment:

  DATABASE_URL: postgres://campuskernal:campuskernal_password@postgres:5432/campuskernal_db

  REDIS_URL: redis://redis:6379

  depends_on:

  - postgres

  - redis

  # Frontend

  web:

  build: ./campuskernal-frontend

  ports:

  - "3000:3000"

```

### **Start Everything**

```
 cd campuskernal

  docker-compose up --build

  # This starts:

  # - PostgreSQL on localhost:5432

  # - Redis on localhost:6379

  # - Backend API on localhost:8080

  # - Frontend on localhost:3000

## **Step 5: Database Schema**

### **Connect to PostgreSQL**

```



### **Create Tables**




## **Step 6: Docker Sandbox for Code Execution**

### **Create campuskernal-sandbox/Dockerfile**




### **Test Locally**






## **Step 7: GitHub Setup**

### **Initialize Git**










### **Commit and Push**




## **Step 8: Running the Full System**

### **Terminal 1: Start Docker Compose**




### **Terminal 2: Test Endpoints**








### **Terminal 3: Open Frontend**




## **Daily Development Checklist**

### **Start of Day**


### **During Development**

**Frontend changes?** → Auto-reload (Next.js dev mode)


**Database schema changes?** → Run SQL directly in psql

### **End of Day**

```
 # Commit work

  git add .

  git commit -m "Feature: [description]"

  git push origin main

  # Stop Docker

  docker-compose down

```

## **Debugging Tips**

### **API Not Responding?**

```
 # Check if backend is running

  docker ps | grep api

  # Check logs

  docker logs campuskernal-api-1

  # Restart

  docker-compose restart api

### **Frontend Not Loading?**

```



### **Database Connection Error?**






### **Docker Build Failure?**


## **Next Steps (When Basic Setup Works)**

1. **Day 1–2:** Flesh out backend handlers (authentication, database queries)


2. **Day 3–4:** Implement file server and database integration


3. **Day 5–6:** Build frontend UI components (dashboard, code editor, teacher dashboard)


4. **Day 7:** Load testing and demo preparation


## **Useful Commands Reference**


## **Resources & Documentation**

**Go Fiber:** https://docs.gofiber.io


**Next.js:** https://nextjs.org/docs


**PostgreSQL:** https://www.postgresql.org/docs


**Docker:** https://docs.docker.com


**Redis:** https://redis.io/docs


## **Support**

**Stuck?**


Check Docker logs: `docker-compose logs`


Google the error message


Ask in team Slack/Discord


Create a GitHub issue


**Questions about architecture?**


Refer to PRD (campuskernal_prd.md)


Check architecture section in README


**Happy coding! You've got this.** 🚀


