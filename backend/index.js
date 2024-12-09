import express from 'express';
import http from 'http';
import cors from 'cors';
import { configDotenv } from "dotenv";
import connectDb  from "./db/dbConnection.js";

//  import Apollo Server and expressMiddleware
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";


// improt express session and connect-mongodb-session for session management
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';

// import passport for authentication
import passport from 'passport';


// import merged typeDefs and Resolvers
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js"

// import configure passport
import { configurePassport } from './passport/passport.config.js'


// dotenv configuration
configDotenv();

// passport configuration
configurePassport();

// Required logic for integrating with Express
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
})

// Start the apollo server
await server.start();

// Connect to Database
await connectDb();

// Connect to MongoDB session store
const MongoDBStore = connectMongo(session);

// Create session store 
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
});

// Catch errors
store.on('error', (err)=> console.log(err));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24 * 2 ,
            httpOnly: true
        },
        store: store,
    })
)

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({req, res}) => buildContext({req, res}),
    }),
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
