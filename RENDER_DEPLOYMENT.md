# StarterScope Deployment Guide for Render

This guide provides step-by-step instructions for deploying the StarterScope application to Render.

---

> [!WARNING]
> **Important Note on Your Setup:**
> If you create a single **Node Web Service** from the Render UI, it will not work. Because StarterScope has a **Python FastAPI backend** and a **React frontend**, you must either deploy them using a Render Blueprint or as separate services.
> 
> You have two options to deploy this correctly:
> 1. **Option A: The Automated Blueprint Method (Recommended)** - Render reads the `render.yaml` configuration file and automatically sets up the database, Python backend, and React frontend for you.
> 2. **Option B: The Manual UI Method** - You manually create the PostgreSQL Database, the FastAPI Web Service, and the React Static Site.

---

## Option A: The Automated Blueprint Method (Recommended)
This is the easiest method because Render will automatically configure all services using the `render.yaml` file we pushed to your repository.

1. **Go to your Render Dashboard** and click **New** (top right) -> **Blueprint**.
2. **Connect your repository**: Select `Ambar1418/StarterScope_llm`.
3. Render will read the configuration. Provide a Group Name (e.g., `starterscope-group`).
4. Render will prompt you for the following environment variables:
   - **`VITE_API_URL`**: Leave this blank initially (or use a placeholder). You will update it in Step 6.
   - **`GEMINI_API_KEY`**, **`GROQ_API_KEY`**, etc.: Enter your respective API keys.
5. Click **Apply**. Render will automatically provision:
   - A PostgreSQL Database (`starterscope-db`).
   - A FastAPI Python Web Service (`starterscope-api`).
   - A React Static Site (`starterscope-web`).
6. **Link the Frontend to the Backend**:
   - Once the services are created, copy the URL of your new `starterscope-api` service (e.g., `https://starterscope-api-xxxx.onrender.com`).
   - Go to your `starterscope-web` service settings on Render -> **Environment**.
   - Set `VITE_API_URL` to that copied backend URL.
   - Trigger a new deploy of the frontend so it rebuilds with the correct API URL.

---

## Option B: Deploy Backend & Frontend Separately (Manual UI Method)

Follow this detailed step-by-step guide to manually configure the database, the FastAPI backend, and the React frontend on Render.

---

### Step 1: Create and Configure the PostgreSQL Database (Required)
The backend requires a PostgreSQL database to store user accounts, subscriptions, and cached scouting intelligence.

1. In the Render Dashboard, click **New** (top right) -> **PostgreSQL**.
2. Configure the database:
   - **Name**: `starterscope-db`
   - **Database**: `business_intelligence` (or leave empty for default)
   - **User**: (leave empty for default)
   - **Region**: Select the same region you will use for your Web Service (e.g., `Oregon (US West)`).
3. Select the **Free** tier (or your preferred paid plan).
4. Click **Create Database**.
5. Once Render finishes provisioning the database:
   - Scroll down to the **Connection Info** section.
   - Copy the **External Connection String** (starts with `postgres://` or `postgresql://`). *You will paste this into the backend's environment variables.*

---

### Step 2: Create the Python FastAPI Backend Web Service
This is the service shown in your screenshot. We must change the language from `Node` to `Python` and set the commands relative to the `api` root directory.

1. In the Render Dashboard, click **New** -> **Web Service**.
2. Select your repository: `Ambar1418/StarterScope_llm`.
3. Configure the fields exactly as follows:
   - **Name**: `starterscope-api` (or any name you prefer)
   - **Project**: (Optional) Assign to a project/environment
   - **Language**: **`Python`** *(CRITICAL: Change this from `Node`)*
   - **Branch**: `main`
   - **Region**: Select the same region you used for your PostgreSQL database (e.g., `Oregon (US West)`).
   - **Root Directory**: `api` *(CRITICAL: This tells Render to run commands inside the `api` folder where the Python files are located)*
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn index:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Select the **Free** instance type (or your preferred plan).

4. **Environment Variables**:
   Scroll down and click **Advanced**, then click **Add Environment Variable** to add the following config:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | **`DATABASE_URL`** | *[Paste the Connection String from Step 1]* | The connection URL for database tables. The backend will automatically convert it to pg8000 format. |
   | **`SECRET_KEY`** | *[Type any random long string]* | Used to sign JWT authentication tokens safely. |
   | **`ALGORITHM`** | `HS256` | The encryption algorithm for tokens. |
   | **`LOG_LEVEL`** | `INFO` | Verbosity of python console logs. |
   | **`GEMINI_API_KEY`** | *[Your Gemini API Key]* | Required for AI generation/LLM features. |
   | **`GROQ_API_KEY`** | *[Your Groq API Key]* | Optional/fallback AI key. |
   | **`TAVILY_API_KEY`** | *[Your Tavily API Key]* | Optional/fallback search key. |
   | **`APIFY_API_KEY`** | *[Your Apify API Key]* | Optional/fallback scraping key. |
   | **`DODO_PAYMENTS_API_KEY`** | *[Your Dodo Payments Key]* | Optional/fallback billing SDK key. |

5. Click **Deploy Web Service** at the bottom of the page.
6. Once the service deploys and shows a status of **Live**, copy the **Public URL** of your backend service from the top of the page (e.g., `https://starterscope-api.onrender.com`).

---

### Step 3: Create the React Frontend Static Site
Now that the backend is deployed, you can point the frontend to the backend's public URL.

1. In the Render Dashboard, click **New** -> **Static Site**.
2. Select your repository: `Ambar1418/StarterScope_llm`.
3. Configure the fields as follows:
   - **Name**: `starterscope-web`
   - **Branch**: `main`
   - **Root Directory**: (Leave blank - we want to build from the repository root)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, click **Add Environment Variable**:
   - **`VITE_API_URL`**: Paste the **Public URL** of your backend Web Service (copied from Step 2, e.g., `https://starterscope-api.onrender.com`). *Do not add a trailing slash.*
5. Under **Redirects/Rewrites**, click **Add Rule**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Deploy Static Site**.

