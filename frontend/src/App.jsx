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
function App() {
	const {loading, error, data} = useQuery(GET_AUTHENTICATED_USER);
	// console.log(loading);
	// console.log(data);
	// console.log(error);

	const authUser = data?.authUser;
	console.log(authUser);
	if (loading) return null;
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
