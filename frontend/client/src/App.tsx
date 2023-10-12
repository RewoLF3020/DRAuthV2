import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Register from "pages/Register";

import { store } from "store/store";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;