# 💬 Real-Time Chat Application — Frontend

A modern **React-based frontend for a real-time chat application**, built with **React 19 and Vite** and integrated with a Spring Boot backend through REST APIs and WebSocket communication.

The project also demonstrates a complete **Docker + Jenkins + Kubernetes CI/CD workflow**, making it suitable as a full-stack and DevOps portfolio project.

---

## 🚀 Project Overview

This repository contains the frontend of a real-time chat application.

The frontend communicates with the backend using:

* **REST APIs** for application data and backend operations
* **WebSocket/STOMP** for real-time communication
* **SockJS** for WebSocket communication support

The application is built with React and Vite and is packaged into a Docker image using a multi-stage Docker build. Nginx is used to serve the production React application.

The application can be deployed to Kubernetes using the manifests provided in the `k8s` directory.

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │                      │
                         │   React + Vite UI    │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                  HTTP                         WebSocket
                    │                               │
                    ▼                               ▼
          ┌─────────────────┐             ┌─────────────────┐
          │  Spring Boot    │             │  Spring Boot    │
          │   REST APIs     │             │   WebSocket     │
          └────────┬────────┘             └────────┬────────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   ▼
                            ┌──────────────┐
                            │   MongoDB    │
                            └──────────────┘


                    CI/CD & Deployment

 ┌──────────┐      ┌──────────┐      ┌────────────┐
 │  GitHub  │ ───► │ Jenkins  │ ───► │ Docker Hub │
 └──────────┘      └──────────┘      └─────┬──────┘
                                           │
                                           ▼
                                   ┌──────────────┐
                                   │  Kubernetes  │
                                   │    Cluster   │
                                   └──────┬───────┘
                                          │
                                          ▼
                                   ┌──────────────┐
                                   │ React + Nginx│
                                   │     Pod      │
                                   └──────────────┘
```

---

# ✨ Features

### ⚛️ React Application

Built using modern React and Vite for a fast development experience and optimized production builds.

### 💬 Real-Time Communication

Uses:

* STOMP
* SockJS
* WebSocket

for real-time communication with the Spring Boot backend.

### 🌐 REST API Integration

Axios is used to communicate with backend REST APIs.

### 🧭 Client-Side Routing

React Router is used for frontend navigation and application routing.

### 🎨 Responsive UI

Tailwind CSS is used to create a responsive and modern user interface.

### 🔔 User Notifications

`react-hot-toast` is used to display application notifications and feedback.

### 🐳 Dockerized Frontend

The frontend is built into a production-ready static application and served through Nginx.

### 🔄 Jenkins CI/CD

Jenkins automates:

1. Source code checkout
2. Dependency installation
3. React production build
4. Docker image creation
5. Docker Hub push
6. Kubernetes deployment
7. Deployment rollout verification
8. Kubernetes resource verification

### ☸️ Kubernetes Deployment

The repository contains Kubernetes manifests for:

* Frontend Deployment
* Frontend Service
* Ingress

---

# 🛠️ Technology Stack

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| React 19        | Frontend framework           |
| Vite 6          | Build tool                   |
| JavaScript      | Application development      |
| React Router 7  | Client-side routing          |
| Axios           | REST API communication       |
| STOMP           | WebSocket messaging protocol |
| SockJS          | WebSocket communication      |
| Tailwind CSS    | UI styling                   |
| React Icons     | Icons                        |
| React Hot Toast | Notifications                |
| ESLint          | Code quality                 |
| Docker          | Containerization             |
| Nginx           | Production web server        |
| Jenkins         | CI/CD automation             |
| Docker Hub      | Container registry           |
| Kubernetes      | Container orchestration      |
| Git & GitHub    | Version control              |

These dependencies are defined in the project's `package.json`; the repository currently uses React 19.1, Vite 6.3, React Router 7.6, Axios, STOMP.js, SockJS, Tailwind CSS and related tooling.

---

# 📂 Project Structure

```text
ChatApplication-FrontEnd/
│
├── k8s/
│   ├── chataap-frontend-deployment.yml
│   ├── chataap-frontend-service.yml
│   └── ingress.yml
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── ...
│
├── Dockerfile
├── Jenkinsfile
├── default.conf
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

The repository currently includes dedicated Docker, Jenkins and Kubernetes configuration alongside the React source code.

---

# ⚙️ Prerequisites

For local development, install:

* Node.js
* npm
* Git

Verify the installations:

```bash
node --version
npm --version
git --version
```

For containerized deployment:

* Docker
* Docker Hub account

For Kubernetes deployment:

* Kubernetes cluster
* kubectl
* Jenkins
* Docker-enabled Jenkins agent

---

# 💻 Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/abhishekkargeti1/ChatApplication-FrontEnd.git

cd ChatApplication-FrontEnd
```

---

## 2. Install Dependencies

```bash
npm install
```

The project uses npm for dependency management.

---

## 3. Start Development Server

```bash
npm run dev
```

Vite will start the development server.

The application is normally available at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files are placed inside:

```text
dist/
```

The project also provides:

```bash
npm run preview
```

to preview the production build locally.

---

# 🧹 Code Quality

Run ESLint using:

```bash
npm run lint
```

This checks the frontend source code for common JavaScript/React issues.

---

# 🌐 Application Base Path

The production application is configured to run under:

```text
/chatapp/
```

The Vite configuration currently uses:

```javascript
base: "/chatapp/"
```

This allows the application to be served through a path such as:

```text
http://<server>/chatapp/
```

rather than requiring the application to be hosted at the root path.

---

# 🐳 Docker

The frontend uses a **multi-stage Docker build**.

### Stage 1 — Build React Application

The first stage uses:

```text
node:20-alpine
```

to install dependencies and generate the production build.

### Stage 2 — Serve Application

The second stage uses:

```text
nginx:alpine
```

to serve the generated React files.

The production build is copied to:

```text
/usr/share/nginx/html/chatapp
```

and the custom Nginx configuration is copied into:

```text
/etc/nginx/conf.d/default.conf
```

The container exposes port `80`.

---

# 🐳 Build Docker Image

Build the image:

```bash
docker build -t chatapp-frontend .
```

---

# ▶️ Run Docker Container

```bash
docker run -d \
  --name chatapp-frontend \
  -p 8080:80 \
  chatapp-frontend
```

The application can then be accessed through:

```text
http://localhost:8080/chatapp/
```

---

# 🔎 Docker Commands

Check the running container:

```bash
docker ps
```

View logs:

```bash
docker logs chatapp-frontend
```

Stop the container:

```bash
docker stop chatapp-frontend
```

Remove the container:

```bash
docker rm chatapp-frontend
```

---

# 🔄 CI/CD Pipeline

The project contains a Jenkins Pipeline defined in:

```text
Jenkinsfile
```

The pipeline automates the complete frontend delivery process.

```text
Developer
    │
    │ git push
    ▼
GitHub
    │
    ▼
Jenkins
    │
    ├── Code Checkout
    │
    ├── npm install
    │
    ├── npm run build
    │
    ├── Docker Build
    │
    ├── Docker Hub Push
    │
    ├── Kubernetes Deployment
    │
    └── Deployment Verification
    │
    ▼
Kubernetes Cluster
    │
    ▼
React + Nginx
```

The current Jenkinsfile defines the pipeline stages and uses the Jenkins build number as the Docker image version.

---

# 🧩 Jenkins Pipeline Stages

## 1. Code Cloning

Jenkins checks out the `main` branch:

```text
GitHub
   ↓
Jenkins Agent
```

The repository URL is configured directly in the Jenkins pipeline.

---

## 2. Install Dependencies

Jenkins installs the frontend dependencies:

```bash
npm install
```

This ensures the build agent has all required npm packages.

---

## 3. Build React Application

Jenkins generates the production build:

```bash
npm run build
```

The pipeline also performs a basic check against the generated JavaScript bundle to verify the `/chatapp` base path.

---

## 4. Testing

The pipeline currently contains a testing stage.

This stage can be extended with:

```bash
npm run lint
```

and automated unit/integration tests.

---

## 5. Build Docker Image

Jenkins builds the Docker image using the Jenkins build number:

```text
abhishekkargeti/chatapp-frontend-image:<BUILD_NUMBER>
```

For example:

```text
abhishekkargeti/chatapp-frontend-image:25
```

This provides a unique Docker image version for each Jenkins build.

---

## 6. Push Docker Image

Jenkins authenticates with Docker Hub using the Jenkins credential:

```text
DockerCred
```

The image is then pushed to Docker Hub:

```bash
docker push abhishekkargeti/chatapp-frontend-image:<BUILD_NUMBER>
```

Credentials are injected using Jenkins' credentials mechanism rather than hardcoding them in the pipeline.

---

# ☸️ Kubernetes Deployment

The repository contains a dedicated:

```text
k8s/
```

directory.

It currently contains:

```text
k8s/
├── chataap-frontend-deployment.yml
├── chataap-frontend-service.yml
└── ingress.yml
```

These manifests define the frontend's Kubernetes Deployment, Service and Ingress resources.

---

# 🚀 Kubernetes Deployment Flow

Jenkins first applies the deployment configuration:

```bash
kubectl apply -f <deployment-file>
```

Then it updates the running deployment to use the newly created Docker image:

```bash
kubectl set image deployment/<deployment> \
<container>=<image>:<BUILD_NUMBER>
```

Finally, Jenkins waits for Kubernetes to complete the rollout:

```bash
kubectl rollout status deployment/<deployment>
```

This ensures that the pipeline verifies the deployment instead of simply submitting the Kubernetes update and assuming it succeeded.

---

# 🌐 Kubernetes Ingress

The project contains:

```text
k8s/ingress.yml
```

The frontend is designed to be accessed through the `/chatapp` path.

```text
                    Internet
                       │
                       ▼
                    Ingress
                       │
                  /chatapp
                       │
                       ▼
              Frontend Service
                       │
                       ▼
              React/Nginx Pods
```

This works together with the Vite production base path:

```text
/chatapp/
```

---

# 🔍 Deployment Verification

After deployment, Jenkins verifies the Kubernetes environment using:

```bash
kubectl get nodes

kubectl get pods -n production-namespace -o wide

kubectl get svc -n production-namespace

kubectl get deployment -n production-namespace
```

This provides basic visibility into:

* Kubernetes nodes
* Running Pods
* Services
* Deployments

The verification stage is implemented directly in the Jenkinsfile.

---

# 🔐 Configuration

The frontend communicates with the backend through HTTP and WebSocket endpoints.

When deploying to different environments, backend URLs should be configurable rather than hardcoded.

Recommended environments:

```text
Development
    │
    └── Local Backend

Staging
    │
    └── Staging Backend

Production
    │
    └── Production Backend
```

For Vite applications, environment-specific variables can be provided through:

```text
.env
.env.development
.env.production
```

Only variables intended for frontend exposure should use the `VITE_` prefix.

---

# 🔗 Backend Repository

The backend for this application is available here:

```text
https://github.com/abhishekkargeti1/ChatApplication-Backend
```

The backend is built using Spring Boot and MongoDB and provides REST APIs and WebSocket functionality.

---

# 📊 Complete Application Architecture

```text
                         ┌─────────────────┐
                         │     Browser     │
                         │                 │
                         │ React Frontend  │
                         └────────┬────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                  REST API                WebSocket
                     │                         │
                     ▼                         ▼
              ┌──────────────────────────────────┐
              │          Spring Boot              │
              │             Backend               │
              └────────────────┬─────────────────┘
                               │
                               ▼
                         ┌─────────────┐
                         │   MongoDB   │
                         └─────────────┘


                    CI/CD Infrastructure

 GitHub
    │
    ▼
 Jenkins
    │
    ├── npm install
    │
    ├── npm run build
    │
    ├── Docker Build
    │
    ├── Docker Push
    │
    ▼
 Docker Hub
    │
    ▼
 Kubernetes
    │
    ├── Frontend Deployment
    │
    ├── Frontend Service
    │
    └── Ingress
```

---

# 📋 CI/CD Pipeline Summary

| Stage                   | Description                             |
| ----------------------- | --------------------------------------- |
| Code Cloning            | Clone frontend source code              |
| Install Dependencies    | Install npm dependencies                |
| Build React Application | Generate production build               |
| Testing                 | Application validation/testing stage    |
| Building Docker Image   | Create versioned Docker image           |
| Pushing Docker Image    | Push image to Docker Hub                |
| Deployment              | Deploy/update application in Kubernetes |
| Verify Deployment       | Verify Kubernetes resources and rollout |

---

# 🎯 DevOps Concepts Demonstrated

This project demonstrates practical experience with:

* React
* Vite
* REST API integration
* WebSocket communication
* STOMP
* SockJS
* Tailwind CSS
* Docker
* Multi-stage Docker builds
* Nginx
* Jenkins
* Jenkins Pipeline
* Docker Hub
* Kubernetes
* Kubernetes Deployment
* Kubernetes Service
* Kubernetes Ingress
* Rolling deployment
* CI/CD
* Git
* GitHub

---

# 📈 Future Improvements

The project can be further improved with:

* [ ] Add automated frontend unit tests
* [ ] Add `npm run lint` to the Jenkins pipeline
* [ ] Add SonarQube analysis
* [ ] Add Trivy Docker image scanning
* [ ] Add Kubernetes readiness probes
* [ ] Add Kubernetes liveness probes
* [ ] Add CPU/memory resource limits
* [ ] Add Horizontal Pod Autoscaler
* [ ] Add HTTPS/TLS through Ingress
* [ ] Add Prometheus monitoring
* [ ] Add Grafana dashboards
* [ ] Add centralized logging
* [ ] Add separate Dev/Staging/Production environments
* [ ] Add Helm charts
* [ ] Integrate Argo CD for GitOps
* [ ] Add automated rollback on failed deployments

---

# 🔐 Security Recommendations

Never commit sensitive information into the repository.

Avoid storing:

* API keys
* Authentication tokens
* Passwords
* Cloud credentials
* Docker Hub passwords
* Production URLs containing credentials

Use:

```text
Jenkins Credentials
        │
        ▼
Environment Variables
        │
        ▼
Build / Deployment
```

For Kubernetes:

```text
Kubernetes Secrets
        │
        ▼
Application Pods
```

---

# 🚀 Production Deployment Roadmap

A more production-oriented architecture could evolve into:

```text
                         GitHub
                            │
                            ▼
                         Jenkins
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
            React Build          Security Scan
                 │                     │
                 └──────────┬──────────┘
                            ▼
                      Docker Build
                            │
                            ▼
                        Docker Hub
                            │
                            ▼
                         Argo CD
                            │
                            ▼
                    Kubernetes Cluster
                            │
                    ┌───────┴───────┐
                    │               │
                    ▼               ▼
              Frontend Pods     Backend Pods
                    │               │
                    └───────┬───────┘
                            │
                            ▼
                         MongoDB
```

This would provide a complete:

**CI → Docker → Registry → GitOps → Kubernetes**

deployment architecture.

---

# 👨‍💻 Author

**Abhishek Kargeti**

GitHub:

https://github.com/abhishekkargeti1

---

# ⭐ Project Objective

The objective of this project is to build a modern real-time chat application frontend while gaining practical experience with:

```text
React
  +
Vite
  +
REST APIs
  +
WebSocket
  +
Docker
  +
Jenkins
  +
Kubernetes
```

The project demonstrates how a React application can be automatically built, containerized, published to Docker Hub and deployed to Kubernetes through a Jenkins CI/CD pipeline.

---

# 📚 Related Repositories

### Backend

```text
https://github.com/abhishekkargeti1/ChatApplication-Backend
```

### Frontend

```text
https://github.com/abhishekkargeti1/ChatApplication-FrontEnd
```

Together, these repositories form the complete **real-time chat application**.
