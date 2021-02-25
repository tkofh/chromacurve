export default {
  target: 'static',

  head: {
    title: 'C 🔴 O 🟠 L 🟡 O 🟢 R 🔵 S 🟣 !',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
  ],

  modules: ['@nuxtjs/pwa'],

  pwa: {
    meta: {
      lang: 'en',
      name: 'Color',
      author: 'Tim Morris',
      theme_color: '#26b7ff',
      ogHost: 'https://color.tmo.dev',
      ogImage: {
        width: 1200,
        height: 627,
        path: 'https://color.tmo.dev/og.png',
        mime: 'image/png',
      },
    },
    manifest: {
      name: 'Color',
      short_name: 'Color',
      display: 'standalone',
    },
  },

  build: {},
}
