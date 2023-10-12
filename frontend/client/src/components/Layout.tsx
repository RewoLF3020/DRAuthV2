import { Helmet, HelmetProvider } from "react-helmet-async";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface IProps {
	title: string;
	content: string;
	children: ReactNode;
};

const Layout = ({ title, content, children }: IProps) => {
	
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={content} />
			</Helmet>
			<Navbar />
			<div className="container mt-5">{children}</div>
		</HelmetProvider>
	);
};

export default Layout;