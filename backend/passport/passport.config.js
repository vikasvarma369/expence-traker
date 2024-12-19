import passport from "passport";
import bcrypt from "bcryptjs";
import User  from "../models/user.model.js";
import { GraphQLLocalStrategy} from "graphql-passport";


export const configurePassport = async()=>{
    passport.serializeUser((user, done)=>{
        console.log("serializing User");
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        console.log("deserializing User");
        try {
            const user = await User.findById(id);
            if (!user) {
                console.log("User not found");
                return done(null, false);
            }
            // console.log("User deserialized:", user);
            done(null, user);
        } catch (error) {
            console.log("Error deserializing User", error);
            done(error);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username, password, done)=>{
            try {
                const user = await User.findOne({username});

                if (!user) {
					throw new Error("Invalid username or password");
				}
				const validPassword = await bcrypt.compare(password, user.password);

				if (!validPassword) {
					throw new Error("Invalid username or password");
				}

				return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    )
}
