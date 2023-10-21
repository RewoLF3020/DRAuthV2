import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Register from "pages/Register";
import { checkAuth } from "store/user";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch<any>(checkAuth());
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;