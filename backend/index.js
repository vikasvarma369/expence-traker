import express from 'express';
import http from 'http';
import cors from 'cors';
import { configDotenv } from "dotenv";
import connectDb  from "./db/dbConnection.js";



import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";


// import merged typeDefs and Resolvers
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js"


// dotenv configuration
configDotenv();

// Required logic for integrating with Express
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
})


await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => (req),
    }),
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
