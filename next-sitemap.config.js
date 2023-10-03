/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_URL || 'https://mubariz.me',
  generateRobotsTxt: true, // (optional)
  // ...other options
}