# Restaurant Frontend (Customer App)

Customer-facing web application for a restaurant / food delivery system, built with React and Vite. It connects to the [restaurant-backend](https://github.com/gehanyasiru36-cpu/restaurant-backend) REST API and uses Socket.IO for real-time updates.

## Tech Stack
- **Framework:** React 19
- **Build tool:** Vite
- **Routing:** React Router
- **HTTP client:** Axios
- **Real-time:** Socket.IO Client
- **Charts:** Recharts
- **QR code scanning:** html5-qrcode
- **Icons:** Lucide React
- **Linting:** ESLint

## Features
- Single-page application with client-side routing
- Real-time updates via Socket.IO
- QR code scanning support
- Data visualisation with charts

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v22.13.0 or later
- npm
- The [restaurant-backend](https://github.com/gehanyasiru36-cpu/restaurant-backend) server running

### Installation
```bash
git clone https://github.com/gehanyasiru36-cpu/restaurant-frontend.git
cd restaurant-frontend
npm install
```

### Environment Variables
If the app reads the backend URL from an environment variable, create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

> Never commit your `.env` file to GitHub.

### Run in Development
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for Production
```bash
npm run build
npm run preview
```

### Lint
```bash
npm run lint
```

## Related Repositories
- [restaurant-backend](https://github.com/gehanyasiru36-cpu/restaurant-backend)

## Author
**Gehan Yasiru Rashmitha**
[LinkedIn](https://www.linkedin.com/in/gehan-yasiru-923b36353) | [GitHub](https://github.com/gehanyasiru36-cpu)
