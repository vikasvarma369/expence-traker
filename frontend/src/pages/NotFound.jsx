const NotFound = () => {
	return (
		<section>
			<div className='text-white'>
				<div className='flex h-screen'>
					<div className='m-auto text-center'>
						<div>
							<img src='/404.svg' alt='404' />
						</div>
						<p className='text-sm md:text-base text-teal-400 p-2 mb-4'>
							The page you were looking for doesn't exist.
						</p>
						<a
							href='/'
							className='bg-transparent hover:bg-gradient-to-r from-teal-500 to-blue-500 text-teal-400 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-teal-400 hover:border-transparent transition duration-300 ease-in-out'
						>
							Back to Home
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
