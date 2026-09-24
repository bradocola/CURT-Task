# CURT Task — Team Project Management System

A frontend technical task for the Cairo University Racing Team (CURT) Software Development Team, Season 26-27. It's a team project management tool: create and manage projects, break them into tasks, assign tasks to team members, and track status/priority — with role-based access between project owners and members.

**Live demo:** https://curt-task.vercel.app/

## Technologies Used

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) — dev server & build tool
- [React Router DOM 7](https://reactrouter.com/) — client-side routing
- [Tailwind CSS 4](https://tailwindcss.com/) — styling
- React Context API — global state (users, projects, tasks)
- Browser `localStorage` — persistence (no backend/server)

## Features Implemented

- **Auth (localStorage-based)** — sign up, login, logout. Sessions persist across refresh via a `currentUser` key in `localStorage`; users are validated against a `users` array also stored there.
- **Protected routes** — every page except Login redirects to `/login` when no user is logged in.
- **Projects** — create, view, edit, delete. The creator becomes the project's owner and is automatically added as a member.
- **Tasks** — create, view, edit, delete within a project; title, description, priority (Low/Medium/High), status (To Do → In Progress → Done), and assignee.
- **Task assignment** — restricted to the project's own members (not every user in the system).
- **Role-based access**:
  - **Owner** (the project's creator) can edit/delete the project and edit/delete any task in it, including reassigning tasks.
  - **Member** (someone assigned to a task in the project) can only change that task's *status*; all other fields are locked for them.
  - A user can be an Owner of some projects and a Member of others at the same time.
- **"My Projects" / "My Tasks"** — the Profile page shows the projects the current user owns or belongs to, and every task assigned to them across all projects.
- **Cascading delete** — deleting a project also removes all of its tasks.
- **Form validation** — inline required-field errors, plus disabled submit buttons while a form is invalid.
- **Loading, empty, and error states** — brief loading spinners on data-heavy pages, "nothing here yet" messages for empty lists, and inline error messages for invalid login/signup attempts (wrong credentials, duplicate email on signup).
- **Responsive UI** — usable at both mobile and desktop widths.

## Setup Instructions

**Prerequisites:** [Node.js](https://nodejs.org/) (v18+) and npm.

```bash
git clone https://github.com/bradocola/CURT-Task.git
cd CURT-Task
npm install
```

## How to Run

**Development server** (with hot reload):
```bash
npm run dev
```
Then open the URL Vite prints (typically `http://localhost:5173`).

**Production build:**
```bash
npm run build
npm run preview
```

## Trying It Out

The app seeds itself with mock users, projects, and tasks into `localStorage` on first load, so there's no empty-state setup needed. Log in with any of the seeded accounts, for example:

- **Email:** `omar@curt.com`
- **Password:** `password123`

(Every seeded user shares the password `password123` — see `src/data/mockData.js` for the full list.) You can also sign up as a brand-new user via the Sign Up form.

## Assumptions & Notes

- This is a frontend-only implementation: there is no real backend, and passwords are stored in plaintext in `localStorage` (per the task's own instructions — no real password hashing required).
- Role checks (Owner vs. Member) are enforced in the UI for normal navigation through the app; they are not enforced at the routing level against someone manually typing a URL for a project/task they're not part of.
- IDs for new users/projects/tasks are generated locally as `max(existing IDs) + 1`.
