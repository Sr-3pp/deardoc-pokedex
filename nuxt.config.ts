// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },
  runtimeConfig: {
    mongo: {
      url: process.env.MONGODB_URI,
      database: process.env.MONGO_DB_NAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ` 
            @import "@/assets/scss/main.scss";
          `,
        },
      },
    },
  },
  nitro: {
    plugins: ["@/server/DB.ts"],
  },
});
