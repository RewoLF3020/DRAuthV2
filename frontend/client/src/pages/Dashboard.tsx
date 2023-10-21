import { useSelector } from "react-redux";
import { RootState } from "utils/interfaces";
import Layout from "components/Layout";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user, loading, isAuth } = useSelector((state: RootState) => state.user);

    if (!isAuth && !loading && user === null) {
        return <Navigate to='/login' />
    }

    return (
        <Layout title="DRAuthV2 | Dashboard" content="Dashboard page">
            {loading || user === null ? (
                <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>            
            ): (
                <>
                    <h1 className="mb-5">Dashboard</h1>
                    <p>User details</p>
                    <ul>
                        <li>First name: {user.first_name}</li>
                        <li>Last name: {user.last_name}</li>
                        <li>First name: {user.first_name}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                </>
            )}
        </Layout>
    );
}

export default Dashboard;