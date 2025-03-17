import {Route, Routes} from "react-router-dom"

import DashboardHomePage from "./pages/DesboardHomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import TransactionPage from "./pages/TransactionPage.jsx"
import NotFound from "./pages/NotFound.jsx"
import Header from "./components/Header.jsx"
import { useQuery } from "@apollo/client"
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query.js"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { LandingHomePage } from "./pages/LandingHomePage.jsx"
// import { ErrorPage } from "./pages/ErrorPage.jsx"
function App() {
	const { data } = useQuery(GET_AUTHENTICATED_USER);

	const authUser = data?.authUser;

	// if (loading) return <LoadingSkeleton />
	// if (error) return <ErrorPage />

  return (
    <>
		{/* Render Header if authUser is true */}
		{authUser && <Header />}

		{/* Define application routes */}
		<Routes>
			{/* Default route */}
			<Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <LandingHomePage />} />
			
			{/* Dashboard route for authenticated users */}
			<Route path="/dashboard" element={authUser ? <DashboardHomePage /> : <Navigate to="/" />} />
			
			{/* Login and Sign-up pages for unauthenticated users */}
			<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
			<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />} />
			
			{/* Transaction details for authenticated users */}
			<Route path="/transaction/:id" element={authUser ? <TransactionPage /> : <Navigate to="/login" />} />
			
			{/* Catch-all for undefined routes */}
			<Route path="*" element={<NotFound />} />
		</Routes>
		
		{/* Notification Toaster */}
		<Toaster />
	</>

  )
}

export default App
