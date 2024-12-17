import { useState, useEffect} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_TRANSACTION_BY_ID } from "../graphql/queries/transaction.query.js";
import { useParams, useNavigate } from "react-router-dom";

import TransactionFormSkeleton from "../Skeletons/TransactionFormSkeleton";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation.js";
import toast from "react-hot-toast";
import InputField from "../components/InputField.jsx";

function TransactionPage(){
	const navigate = useNavigate();
	const {id} = useParams();
	const { loading, data } = useQuery(GET_ONE_TRANSACTION_BY_ID,{
		variables: {
			transactionId: id
		}
	});

	// update mutation
	const [updateTransaction, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TRANSACTION,{
		refetchQueries: [ "GetTransactionStatistics"],
	});

	const [formData, setFormData] = useState({
		description: data?.transaction?.description ||"",
		paymentType: data?.transaction?.paymentType ||"",
		category: data?.transaction?.category ||"",
		amount: data?.transaction?.amount ||"",
		location: data?.transaction?.location ||"",
		date:  data?.transaction?.date ||"",
	});

	useEffect(() => {{
		if(data){
			setFormData({
				description: data?.transaction?.description,
				paymentType: data?.transaction?.paymentType,
				category: data?.transaction?.category,
				amount: data?.transaction?.amount,
				location: data?.transaction?.location,
				date: new Date(+data.transaction.date).toISOString().substr(0, 10),
			});
		}
	}}, [data]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateTransaction({
				variables: {
					input:{
						...formData,
						transactionId: id,
						amount: parseFloat(formData.amount),
					}
				}
			})
			toast.success("Transaction updated successfully");
			navigate("/");
		} catch (error) {
			toast.error(error.message);
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// loading skeleton
	if(loading) return <TransactionFormSkeleton />

	return (
		<div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
			<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-teal-500 via-blue-600 to-teal-400 inline-block text-transparent bg-clip-text'>
				Update this transaction
			</p>
			<form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
				{/* TRANSACTION */}
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<InputField 
							label = {"Transaction"}
							classNameForLabel= {"block uppercase tracking-wide text-white text-xs font-bold mb-2"}
							id = {"description"}
							name = {"description"}
							type = {"text"}
							value = {formData.description}
							onChange = {handleInputChange}
							placeholder = {"Rent, Groceries, Salary, etc."}
							classNameForInput = {"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
							required = {true}
						 />

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
								onChange={handleInputChange}
								defaultValue={formData.paymentType}
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
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='category'
								name='category'
								onChange={handleInputChange}
								defaultValue={formData.category}
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
							label = {"Amount($)"}
							classNameForLabel={"block uppercase text-white text-xs font-bold mb-2"}
							id={"amount"}
							name={"amount"}
							type={"number"}
							placeholder={"150"}
							value={formData.amount}
							onChange={handleInputChange}
							classNameForInput= {"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
							/>
					</div>
				</div>

				{/* LOCATION */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<InputField 
							label = {"Location"}
							classNameForLabel={"block uppercase tracking-wide text-white text-xs font-bold mb-2"}
							id={"location"}
							name={"location"}
							type={"text"}
							placeholder={"Bilaspur"}
							value={formData.location}
							onChange={handleInputChange}
							classNameForInput= {"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
							/>
					</div>

					{/* DATE */}
					<div className='w-full flex-1'>
						<InputField 
							label = {"Date"}
							classNameForLabel={"block uppercase tracking-wide text-white text-xs font-bold mb-2"}
							id={"date"}
							name={"date"}
							type={"date"}
							value={formData.date}
							onChange={handleInputChange}
							classNameForInput= {"appearance-none block w-full bg-gray-200 text-gray-700 border border-200 rounded py-[11px] px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
							/>
					</div>
				</div>
				{/* SUBMIT BUTTON */}
				<button
					className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-teal-300 via-blue-700 to-teal-400 hover:from-teal-600 hover:via-blue-900 hover:to-teal-700
						disabled:opacity-70 disabled:cursor-not-allowed'
					type='submit'
					disabled={updateLoading}
				>
					{updateLoading ? "Updating..." : "Update Transaction"}
				</button>
			</form>
		</div>
	);
};
export default TransactionPage;