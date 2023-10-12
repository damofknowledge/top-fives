// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  ssr: false,
  modules: ['@vueuse/nuxt', '@pinia/nuxt'],
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
        { name: 'theme-color', content: '#1E293B' },
        {
          name: 'description',
          content:
            'Top Fives is a daily game that challenges you to guess a musical artist’s most popular songs, as told by Spotify.',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      script: [{}],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `/images/top-fives-logo.svg` }],
      noscript: [{ children: 'JavaScript is required to view this content' }],
    },
  },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
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
});
