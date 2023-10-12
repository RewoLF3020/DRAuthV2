import { Helmet } from "react-helmet";
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface IProps {
	title: string;
	content: string;
	children: ReactNode;
};

const Layout = ({ title, content, children }: IProps) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={content} />
			</Helmet>
			<Navbar />
			<div className="container mt-5">{children}</div>
		</>
	);
};

export default Layout;