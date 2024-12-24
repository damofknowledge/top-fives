# TopFives.fyi

A funemployment project by [@DamOfKnowledge](https://github.com/damofknowledge)
      
## Technology

This project is based on the Nuxt 3 minimal starter project. Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Performance

[PageSpeed Insights 2024-02-19](https://pagespeed.web.dev/analysis/https-topfives-fyi/uxsdekj9cn?hl=en&form_factor=mobile)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

Replace the Spotify client ID and secret in `nuxt.config.js` with your own values.

## Development Server

Start the development server on https://localhost:3000

```bash
yarn dev
```

## Testing

Unit tests are located in `/tests`

```bash
yarn test
```

## Pre-commit Hooks

Husky is installed as a dependency to lint the project before every commit.

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Notable Updates

11-27-24: Spotify removed access to Preview URLs for apps in development mode
