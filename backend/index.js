import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// import merged typeDefs and Resolvers
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js"

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers
})

const res  = await startStandaloneServer(server)

console.log("response",res);

console.log(`Server ready at: ${res.url} `);