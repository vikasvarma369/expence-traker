import { transactions } from "../dummyData/data.js"
import Transactions from "../models/transaction.model.js";
const transactionResolver = {
    Mutation:{
        createTransaction: async(_, { input },context)=>{
            try {
                const userId = await context.getUser()._id;
                if(!userId){
                    throw new Error("Transaction not created");
                }

                const transaction = new Transactions({
                    ...input,
                    userId: userId
                })
                await transaction.save();

                return transaction;
            } catch (error) {
                console.error("Error creating transaction", err);
                throw new Error(err.message || "Error creating transaction");
            }
        },
        updateTransaction: async(_, {input})=>{
            try {
                const updatedTransaction = await Transactions.findByIdAndUpdate(
                    input.transactionId, 
                    input,
                    {new: true}
                );
                return updatedTransaction;
            } catch (error) {
                console.error("Error updating transaction", err);
                throw new Error(err.message || "Error updating transaction");
            }
        },
        
        deleteTransaction: async(_, {transactionId})=>{
            try {
                const deletedTransaction = await Transactions.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (error) {
                console.error("Error deleting transaction", err);
                throw new Error(err.message || "Error deleting transaction");
            }
        }
    },

    // TODO: add user/transaction relationship
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
            
    }
}


export default transactionResolver