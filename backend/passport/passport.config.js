import passport from "passport";
import bycrypt from "bcryptjs";
import User  from "../models/user.model.js";
import { GraphQLLocalStrategy} from "graphql-passport";


export const configurePassport = async()=>{
    passport.serializeUser((user, done)=>{
        console.log("serializing User");
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done)=>{
        console.log("deserializing User");
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.log(error);
            done(error);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            try {
                const user = await User.findOne({username});
                if(!user){
                    throw new Error("Invalid username or password");
                }

                const validPassword = await bycrypt.compare(password, user.password);

                if(!validPassword){
                    throw new Error("Invalid username or password");
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    )
}
