import React, { useState, useEffect } from 'react'
import { MdLogout } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import TransactionForm from "../components/TransactionForm";
import Cards from "../components/Cards";
import { useMutation, useQuery } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations/user.mutation';
import toast from "react-hot-toast"
import { GET_TRANSACTION_STATISTICS } from '../graphql/queries/transaction.query';

ChartJS.register(ArcElement, Tooltip, Legend);
function HomePage() {
	const {data} = useQuery(GET_TRANSACTION_STATISTICS);
	console.log("category data",data);

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

			categories.forEach((category)=>{
				if (category === "saving") {
					backgroundColors.push("rgba(75, 192, 192)");
					borderColors.push("rgba(75, 192, 192)");
				} else if (category === "expense") {
					backgroundColors.push("rgba(255, 99, 132)");
					borderColors.push("rgba(255, 99, 132)");
				} else if (category === "investment") {
					backgroundColors.push("rgba(54, 162, 235)");
					borderColors.push("rgba(54, 162, 235)");
				}
			})
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

	const [logout, {loading, client}] = useMutation(LOGOUT,{
		refetchQueries: ["GetAuthenticatedUser"]
	});

	const handleLogout = async() => {
		try {
			await logout();
			client.resetStore(); // clear cache
		} catch (error) {
			console.log("Error logging out", error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track wisely
					</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>

					<TransactionForm/>
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;