const {defineConfig} = require('drizzle-kit');

module.exports = defineConfig({
  schema: './drizzle/schema.js',
  dialect:"mysql",
  out: './drizzle/migrations',
  dbCredentials: {
 url: process.env.DATABASE_URL,
  },
});