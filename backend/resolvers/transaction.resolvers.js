import { transactions } from "../dummyData/data.js"
import Transactions from "../models/transaction.model.js";
const transactionResolver = {
    Query:{
        transactions: async(_, __, context)=>{
            try {
                const userId = await context.getUser()._id;
                if(!userId){
                    throw new Error("Unauthorized");
                }
                const transactions = await Transactions.find({userId: userId});
                return transactions;
            } catch (err) {
                console.log("Error getting transactions", err);
                throw new Error(err.message || "Error getting transactions");
            }
        },
        transaction: async(_, {transactionId})=>{
            try {
                const transaction = await Transactions.findById(transactionId);
                return transaction;
            } catch (err) {
                console.log("Error getting transaction", err);
                throw new Error(err.message || "Error getting transaction");
            }
        }

        // TODO: add user Transaction relation
            
    },
    Mutation:{}
}


export default transactionResolver