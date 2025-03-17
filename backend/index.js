import express from 'express';
import http from 'http';
import cors from 'cors';
import { configDotenv } from "dotenv";
import path from 'path';

// import database connection
import connectDb from "./db/dbConnection.js";

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


// Render suspend my services thats why i commented this code
// import job
// import job from "./corn.js";

// get current directory
const __dirname = path.resolve();

// dotenv configuration
configDotenv();

// passport configuration
configurePassport();

// Render suspend my services thats why i commented this code
// job start
// job.start();

// Required logic for integrating with Express
const app = express();

const httpServer = http.createServer(app);


// Connect to MongoDB session store
const MongoDBStore = connectMongo(session);

// Create session store 
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
});

// Catch errors
store.on('error', (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
    store: store,
  })
)

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Create Apollo Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// Start the apollo server
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return await buildContext({ req, res });
    }
  }),
);

await new Promise((resolve) =>
  httpServer.listen({ port: process.env.PORT || 4000 }, resolve),
);

// serve static files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
})
// Connect to Database
await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
