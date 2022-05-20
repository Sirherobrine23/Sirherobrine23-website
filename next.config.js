module.exports = {
  reactStrictMode: true,
  // Add cors to the next.js server
  // checkip.dyndns.org
  cors: {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowHeaders: 'Content-Type, Authorization, X-Requested-With, X-Custom-Header',
  }
}