import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation.js";
import { toast } from "react-hot-toast";
import InputField from "./InputField.jsx";

function TransactionForm(){
	// TODO: relationship are added change the query
	const [createTransaction, {loading}] = useMutation(CREATE_TRANSACTION,{
		refetchQueries:["GetTransactions", "GetTransactionStatistics"]
	});


	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const transactionData = {
			description: formData.get("description"),
			paymentType: formData.get("paymentType"),
			category: formData.get("category"),
			amount: parseFloat(formData.get("amount")),
			location: formData.get("location"),
			date: formData.get("date"),
		};

		try{
			await createTransaction({variables: {input: transactionData}})

			form.reset();
			toast.success("Transaction created successfully");
		}catch(err){
			console.log("Error creating transaction", err);
			toast.error(err.message);
		}

	};

	return (
		<form className='w-full max-w-lg flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
			{/* TRANSACTION */}
			<div className='flex flex-wrap'>
				<div className='w-full'>
					<InputField label={"Transaction"} id={"description"} name={"description"} placeholder = {"Rent, Groceries, Salary, etc."} required = {true} classNameForInput = {'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'} classNameForLabel = {'block uppercase tracking-wide text-white text-xs font-bold mb-2'} /> 
				</div>
			</div>
			{/* PAYMENT TYPE */}
			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='paymentType'
					>
						Payment Type
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='paymentType'
							name='paymentType'
						>
							
							<option value={"Card"}>Card</option>
							<option value={"Cash"}>Cash</option>
							<option value={"UPI"}>UPI</option>
							<option value={"Net banking"}>Net banking</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				{/* CATEGORY */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='category'
					>
						Category
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 max-h-40 overflow-y-auto'
							id='category'
							name='category'
						>
							<option value="food">Food</option>
							<option value="entertainment">Entertainment</option>
							<option value="shopping">Shopping</option>
							<option value="groceries">Groceries</option>
							<option value="utilities">Utilities</option>
							<option value="transport">Transport</option>
							<option value="rent">Rent</option>
							<option value="maintenance">Maintenance</option>
							<option value="movies">Movies</option>
							<option value="subscriptions">Subscriptions</option>
							<option value="gaming">Gaming</option>
							<option value="restaurants">Restaurants</option>
							<option value="cafes">Cafes</option>
							<option value="clothing">Clothing</option>
							<option value="electronics">Electronics</option>
							<option value="accessories">Accessories</option>
							<option value="medical">Medical</option>
							<option value="fitness">Fitness</option>
							<option value="insurance">Insurance</option>
							<option value="tuition">Tuition</option>
							<option value="books">Books</option>
							<option value="courses">Courses</option>
							<option value="flights">Flights</option>
							<option value="accommodation">Accommodation</option>
							<option value="fuel">Fuel</option>
							<option value="investments">Investments</option>
							<option value="savings">Savings</option>
							<option value="mutualFunds">Mutual Funds</option>
							<option value="gifts">Gifts</option>
							<option value="donations">Donations</option>
							<option value="others">Others</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				{/* AMOUNT */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<InputField 
						label={"Amount"}
					 	id={"amount"}
					  name={"amount"} 
						type={"number"} 
						placeholder={"150"} 
						classNameForLabel="block uppercase text-white text-xs font-bold mb-2" 
						classNameForInput={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} 
					/>
				</div>
			</div>

			{/* LOCATION */}
			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<InputField 
						label={"Location"} 
						id={"location"} 
						name={"location"} 
						placeholder={"Bilaspur"} 
						classNameForLabel= {"block uppercase tracking-wide text-white text-xs font-bold mb-2"} classNameForInput={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} 
					/>
					
				</div>
				{/* DATE */}
				<div className='w-full flex-1'>
					<InputField 
						label={"Date"} 
						id={'date'} 
						name={'date'} 
						type= {'date'} 
						placeholder = {'Select date'} 
						classNameForLabel= {'block uppercase tracking-wide text-white text-xs font-bold mb-2'} classNameForInput={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
					/>
				</div>
			</div>
			{/* {error && <p className='text-red-500 text-sm mt-2'>{error.message}</p>} */}
			{/* SUBMIT BUTTON */}
			<button
				className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
				type='submit'
			>
				{loading ? "Loading..." : "Add Transaction"}
			</button>
		</form>
	);
};

export default TransactionForm;