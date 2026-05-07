# BlogSpace Frontend (Angular + Tailwind)

A simple and modern blog frontend built with Angular and Tailwind CSS.
This project connects to a Node.js Blog API and supports authentication, article CRUD, route protection, and clean UI states.

## Tech Stack

- Angular 21 (module-based architecture)
- Tailwind CSS
- Reactive Forms
- Angular Router + Guard
- HTTP Interceptor for auth token

## Features

- Register / Login / Logout
- Store logged-in user and token in `localStorage`
- View all available articles
- Create new article (with image upload)
- Edit and delete own article
- Protected `/editor` route (requires login)
- UI states:
  - Loading
  - Empty state
  - Error state
- Dark modern UI (soft dark palette)

## Environment Configuration (.env)

This project uses a root `.env` file instead of Angular `environments` files.

### 1) Update API URL

Edit `.env`:

```env
API_URL=http://localhost:3000/api
```

## Run the Project

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm start
```

App runs on:

- [http://localhost:4200](http://localhost:4200)

## Backend Requirements

Expected endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
# OmarZahrah-ITI-TASK-Angular-Blog
