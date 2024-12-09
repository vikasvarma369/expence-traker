import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        enum: ["male", "female"],
    },
    profilePicture: {
        type: String,
        default: "",
    }
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User

 