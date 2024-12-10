import { users } from "../dummyData/data.js"
import User from "../models/user.model.js";
import bycrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        // signUp Mutation
        signUp: async(_,{ input },context)=>{
            try {
                const {username, name, password, gender} = input;

                if(!username || !name || !password || !gender){
                    throw new Error("All fields are required");
                }

                const existingUser = await User.findOne({username});

                if(existingUser){
                    throw new Error("User already exists!");
                }

                // Hash password
                const salt = await bycrypt.getSalt(10);
                const hashPassword = await bycrypt.hash(password, salt);

                const boyProfilePic = `${process.env.BOY_PIC}${username}`
                const girlProfilePic = `${process.env.GIRL_PIC}${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
                })

                const savedUser = await newUser.save();
                console.log("Only For Testing purpose save what return", savedUser);

                context.login(newUser);
                return newUser;
            } catch (err) {
                console.error("Error signing up user", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        // login Mutation
        login: async(_, {input}, context)=>{
            try {
                const {username, password} = input;
                if(!username || !password){
                    throw new Error("All fields are required");
                }
                // checking authentication
                const { user } = await context.authenticate("graphql-local", {username, password});

                if(!user){
                    throw new Error("Invalid username or password");
                }else{
                    context.login(user);
                    return user;
                }
            } catch (err) {
                console.error("Error logging up user", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        //logout Mutation
        logout: async(_,__,context)=>{
            try {
                await context.logout();
                // destroy session
                context.req.session.destroy((err)=>{
                    if(err){
                        console.error("Error destroying session", err);
                        throw err;
                    }
                });
                // clear cookie
                context.res.clearCookie("connect.sid");
                return {message: "Successfully logged out"}
            } catch (err) {
                console.error("Error logging out user", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Query: {
        users: (_, {req, res})=>{
            return users
        },

        user: (_, args)=>{
            return users.find((user)=> user._id === args.userId);
        }
    },
}

export default userResolver