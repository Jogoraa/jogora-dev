# Dawit Jogora Portfolio – Full Stack Application

This is a full-stack portfolio application for Dawit Jogora, built with a modern React frontend and a FastAPI backend integrated with Supabase for data storage. The project showcases professional experience, projects, skills, education, and more, with both public and admin (CRUD) interfaces.

---

## Project Structure

```
.
├── backend/                # FastAPI backend (Supabase/PostgreSQL)
│   ├── server.py           # Main FastAPI app and API endpoints
│   ├── requirements.txt    # Backend dependencies
│   ├── .env                # Backend environment variables (Supabase, JWT, etc.)
│   ├── database/
│   │   └── supabase_client.py
│   ├── models/
│   │   └── portfolio_models.py
│   ├── services/
│   │   ├── portfolio_service.py
│   │   └── seed_data.py
│   └── ...
├── frontend/               # React frontend (Create React App + Tailwind CSS)
│   ├── src/
│   │   ├── pages/          # Main pages (Home, Projects, About, Contact, Resume)
│   │   ├── components/     # UI components
│   │   ├── data/           # mockData.js (to be replaced by API calls)
│   │   └── ...
│   ├── public/
│   │   └── index.html
│   ├── .env                # Frontend environment variables (API URLs, Supabase)
│   └── ...
├── contracts.md            # API/data contracts and integration plan
├── test_result.md          # Automated test results and protocol
├── backend_test.py         # Backend API test suite
└── README.md               # Project overview (this file)
```

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons, Create React App
- **Backend:** FastAPI, Supabase (PostgreSQL), Pydantic, Uvicorn
- **Database:** Supabase (PostgreSQL)
- **Testing:** Custom Python test suite (`backend_test.py`)
- **Other:** Environment-based configuration, mock data fallback, admin CRUD endpoints

---

## Key Features

- **Public Portfolio:** Profile, featured projects, experience, skills, education, languages, certifications, contact form
- **Admin Panel:** Secure login, CRUD for all content (projects, experience, skills, education, messages, etc.)
- **API:** RESTful endpoints for all portfolio data, with mock data fallback if Supabase is unavailable
- **Responsive UI:** Modern, mobile-friendly design with animations and accessibility in mind
- **Testing:** Automated backend API tests with results tracked in `test_result.md`

---

## Getting Started

### 1. Backend

- Install dependencies:
  ```sh
  cd backend
  pip install -r requirements.txt
  ```
- Configure `.env` with Supabase and email credentials (see `contracts.md` for details).
- Run the server:
  ```sh
  uvicorn server:app --reload --port 8001
  ```

### 2. Frontend

- Install dependencies:
  ```sh
  cd frontend
  npm install
  ```
- Configure `.env` with backend API URL and Supabase keys.
- Start the development server:
  ```sh
  npm start
  ```

---

## API Overview

- **Public Endpoints:**  
  `/api/profile`, `/api/projects`, `/api/projects/:slug`, `/api/experience`, `/api/skills`, `/api/education`, `/api/languages`, `/api/certifications`, `/api/contact`
- **Admin Endpoints:**  
  `/api/admin/*` (CRUD for all content, requires authentication)

See [contracts.md](contracts.md) for full API contracts and database schema.

---

## Testing

- Run backend API tests:
  ```sh
  python backend_test.py
  ```
- Results and protocol are tracked in [test_result.md](test_result.md).

---

## Development Notes

- **Mock Data:**  
  The frontend currently uses `mockData.js` for demo purposes. See the integration plan in [contracts.md](contracts.md) for migrating to live API calls.
- **Environment Variables:**  
  See `.env` files in both `backend/` and `frontend/` for configuration.
- **Admin Panel:**  
  Admin endpoints and panel are planned for secure content management.

---

## License

MIT (or specify your license here)

---

## Credits

- Dawit Jogora – [dawitjogora.vercel.app](https://www.dawitjogora.vercel.app)
- Built with React, FastAPI, and Supabase
