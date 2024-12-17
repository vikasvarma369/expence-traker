import {Route, Routes} from "react-router-dom"

import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import TransactionPage from "./pages/TransactionPage.jsx"
import NotFound from "./pages/NotFound.jsx"
import Header from "./components/Header.jsx"
import { useQuery } from "@apollo/client"
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query.js"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { LoadingSkeleton } from "./Skeletons/LoadingSkeloton.jsx"
// import { ErrorPage } from "./pages/ErrorPage.jsx"
function App() {
	const {loading, data, error} = useQuery(GET_AUTHENTICATED_USER);

	const authUser = data?.authUser;

	if (loading) return <LoadingSkeleton />
	// if (error) return <ErrorPage />

  return (
    <>
      {authUser && < Header/>}
			<Routes>
				<Route path='/' element={ authUser ? <HomePage />: <Navigate to="/login" />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to="/" />} />
				<Route path='/transaction/:id' element={authUser ? <TransactionPage /> : <Navigate to="/login" />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
    </>
  )
}

export default App
