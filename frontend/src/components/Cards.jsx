import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query.js";
import Card from "./Card.jsx";


function Cards(){
	const {loading,  data} = useQuery(GET_TRANSACTIONS);

	// TODO: handle loading add skeleton and also handle error
	console.log(data);
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data?.transactions?.map((transaction) => (<Card key={transaction._id} transaction={transaction}/>))}
			</div>
			{/* if no transactions */}
			{!loading && data?.transactions?.length === 0 && (<p className='text-2xl font-bold text-center my-10'>No transactions history found</p>)}
		</div>
	);
};

export default Cards;