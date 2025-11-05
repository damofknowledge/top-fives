// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/test-utils/module', 'nuxt-security', 'nuxt-gtag', 'nuxt-lazytube', '@nuxt/scripts'],

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'https://i.scdn.co/image/', 'https:', 'data:'],
      },
      crossOriginEmbedderPolicy: false,
    },
  },

  runtimeConfig: {
    public: {
      spotifyClientId: '69dff9d276db4fd4847f2bb5faac6eed',
    },
    spotifyClientSecret: '',
  },

  app: {
    head: {
      title: 'Top Fives - The Spotify Guessing Game',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f97316' },
        {
          name: 'description',
          content:
            'Top Fives is a daily game that challenges you to guess a musical artist’s most popular songs, as told by Spotify.',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `/images/top-fives-logo.svg` }],
    },
  },

  css: ['@/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },

  devServer: {
    https: {
      key: './local-key.pem',
      cert: './local-cert.pem',
    },
  },
});