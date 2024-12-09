import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["cash", "card", "UPI", "net banking"],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "groceries",
            "utilities",
            "transport",
            "rent",
            "maintenance",
            "movies",
            "subscriptions",
            "gaming",
            "restaurants",
            "cafes",
            "clothing",
            "electronics",
            "accessories",
            "medical",
            "fitness",
            "insurance",
            "tuition",
            "books",
            "courses",
            "flights",
            "accommodation",
            "fuel",
            "investments",
            "savings",
            "mutualFunds",
            "gifts",
            "donations",
            "others",
        ],
    },    
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    }
},{
    timestamps: true,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction