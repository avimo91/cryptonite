# Cryptonite

Cryptonite is a React and TypeScript cryptocurrency application that allows users to browse popular cryptocurrencies, view real-time reports, and receive AI-based investment recommendations.

## Features

- Display 100 popular cryptocurrencies.
- Search coins by name or symbol.
- View current prices in USD, EUR, and ILS.
- Select up to 5 coins.
- Save selected coins in Local Storage.
- Replace a selected coin when trying to select a sixth coin.
- Display real-time USD price reports for all selected coins.
- Update real-time prices every second.
- Generate AI-based recommendations for selected coins.
- Responsive design for desktop and mobile.
- Parallax header background.
- SPA navigation using React Router.

## Technologies

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Axios
- Recharts
- Vite

## APIs

The project uses the following external APIs:

- CoinGecko API for cryptocurrency information and market data.
- CoinLore API for real-time cryptocurrency prices.
- OpenAI API for AI-based cryptocurrency recommendations.

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

Run the development server:

```bash
npm start
```

Build the project:

```bash
npm run build
```

## Note on Real-Time Reports API

The original assignment referenced CryptoCompare for real-time prices. In this implementation, CoinLore is used instead, while preserving the required behavior: one batched request per second for all selected coins and USD-only display.

## GitHub

GitHub repository: [https://github.com/avimo91/cryptonite](https://github.com/avimo91/cryptonite)

## Live Website

Deployed website: [https://cryptonite-avimo.web.app](https://cryptonite-avimo.web.app)

## Developer

Avi Moyal
Full Stack & GenAI Course
John Bryce