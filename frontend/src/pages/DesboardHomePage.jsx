import React, { useState, useEffect } from 'react'
import { MdLogout } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast"

import TransactionForm from "../components/TransactionForm.jsx";
import Cards from "../components/Cards.jsx";
import { useMutation, useQuery } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations/user.mutation.js';
import { GET_TRANSACTION_STATISTICS } from '../graphql/queries/transaction.query.js';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query.js';

import { categoryColors } from "../assets/categoryColors.js";
ChartJS.register(ArcElement, Tooltip, Legend);
function DashboardHomePage(){

	// get transaction statistics query
		const {data} = useQuery(GET_TRANSACTION_STATISTICS);
	// get user query
		const {data: authUserData} = useQuery(GET_AUTHENTICATED_USER);
	// logout mutation
		const [logout, {loading, client, data: logoutData}] = useMutation(LOGOUT, {
			refetchQueries: ["GetAuthenticatedUser"]
	});

	// for chart
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "₹",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	});

	useEffect(() => {
		if(data?.categoroyStatistics
		){
			const categories 	= data.categoroyStatistics.map((stat) => stat.category);
			const totalAmount = data.categoroyStatistics.map((stat) => stat.totalAmount);
			const backgroundColors = [];
			const borderColors = []

			categories.forEach((category) => {
				if (categoryColors.hasOwnProperty(category)) {
					backgroundColors.push(categoryColors[category]);
					borderColors.push(categoryColors[category]);
				}
			});
			// set and update chart data
			setChartData((prev)=>({
				labels: categories,
				datasets: [
					{
						...prev?.datasets[0],
					labels: categories,
					data: totalAmount,
					backgroundColor: backgroundColors,
					borderColor: borderColors
					}
				]
			}));
		}
	}, [data]);



	console.log("logoutData", logoutData);
	// logout
	const handleLogout = async() => {
		try {
			await logout(); // Call the logout mutation
			await client.resetStore(); // Clear the Apollo Client cache
		} catch (error) {
			console.log("Error logging out", error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
				<p className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-purple-400 via-blue-600 to-teal-400 inline-block text-transparent bg-clip-text'>
				  Spend wisely, track wisely
				</p>

					<img
						src={authUserData?.authUser?.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					{
						data?.categoroyStatistics?.length > 0 && (
						<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
							<Doughnut data={chartData} />
						</div>
					)}
					<TransactionForm/>
				</div>
				<Cards />
			</div>
		</>
	);
};
export default DashboardHomePage;