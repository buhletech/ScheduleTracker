ScheduleTracker

A Todoist-inspired project manager. Create, edit, nest and delete projects with custom colours and List / Board / Calendar layouts.

Live demo: https://schedule-tracker-frontend.onrender.com

The backend runs on Render's free tier, so the first load after inactivity can take 30-60 seconds while it wakes up.

Screenshots


Features
Add, edit and delete projects
20 colour options and 3 layout choices
Nested projects (parent / child)
Instant UI updates with no page reload

Tech stack
Layer	Tech
Frontend	React, Vite, Tailwind CSS
Backend	Java, Spring Boot, REST API (private repo)
Hosting	Render (static site + web service)

Run the frontend locally
bash
git clone https://github.com/buhletech/<your-repo-name>
cd <your-repo-name>
npm install

Create a .env file in the project root:

VITE_API_URL=https://your-backend.onrender.com/api/projects

Then start it:

bash
npm run dev

The backend source is not part of this repository, so point VITE_API_URL at the deployed API or at your own server implementing the endpoints below.


Deployment
Frontend: Render Static Site, build command npm install && npm run build, publish directory dist, with VITE_API_URL set in the environment tab.
Backend: Spring Boot app in Docker on a Render Web Service, with database credentials supplied as environment variables.
