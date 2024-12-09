import { users } from "../dummyData/data.js"

const userResolver = {
    Query: {
        users: (_, _, {req, res}, _)=>{
            return users
        },

        user: (_, args)=>{
            return users.find((user)=> user._id === args.userId);
        }
    },
    Mutation: {}
}

export default userResolver