const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');



async function ApolloStarter() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:authMiddleware,
  });
  await server.start();
  const app = express();
  server.applyMiddleware({app})
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
await new Promise(resolve => app.listen({port:PORT}, resolve))
  return{server, app}
}

ApolloStarter();



