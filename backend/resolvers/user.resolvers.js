import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        // signup mutation
        signUp: async(_,{ input }, context)=>{
            try {
                const {username, name, password, gender} = input;

                if(!username || !name || !password || !gender){
                    throw new Error("All fields are required");
                }

                if(username.length < 3){
                    throw new Error("Username must be at least 3 characters long"); 
                }

                const existingUser = await User.findOne({ username });

                if(existingUser){
                    throw new Error("User already exists!");
                }

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `${process.env.BOY_PIC}${username}`
                const girlProfilePic = `${process.env.GIRL_PIC}${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic
                })

                await newUser.save();

                await context.login(newUser);
                return newUser;
            } catch (err) {
                console.error("Error signing up user", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        // login Mutation
        login: async(_, { input }, context)=>{
            try {
                const {username, password} = input;
                if(!username || !password){
                    throw new Error("All fields are required");
                }
                // checking authentication
                const { user } = await context.authenticate("graphql-local", {username, password});

                await context.login(user);
                return user;
            } catch (err) {
                console.error("Error logging up user", err);
                throw new Error("Invalid username or password" || err.message);
            }
        },

        //logout Mutation
        logout: async(_, __, context) => {
            try {
                await context.logout();
                await new Promise((resolve, reject) => {
                    context.req.session.destroy((err) => {
                        if (err) {
                            reject("Error destroying session");
                        } else {
                            resolve();
                        }
                    });
                });
        
                context.res.clearCookie("connect.sid");
                return { message: "Successfully logged out" };
            } catch (err) {
                console.error("Error logging out user", err);
                throw new Error(err.message || "Internal server error");
            }
        }
        
    },
    Query: {
        authUser: async (_, __, context)=>{
            try {
                // get user based on session
                const user = await context.getUser();
                if(!user){
                    // user is not authenticated , so throw an error
                    throw new Error("Unauthorized");
                }
                return user;
            } catch (err) {
                console.error("Error in authUser", err);
                throw new Error(err.message || "Error getting user");
            }
        },
        user: async(_, {userId})=>{
            // TODO: if user is authorize add condition
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error("Error getting user", err);
                throw new Error(err.message || "Error getting user");
            }

        }
    },

    // TODO: add user Transaction relation
}

export default userResolver