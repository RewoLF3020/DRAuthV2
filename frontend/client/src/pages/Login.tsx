import { useDispatch } from "react-redux";
import { resetRegistered } from "store/user";
import Layout from "components/Layout";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetRegistered());
    }, [])

    return (
        <Layout title="DRAuthV2 | Home" content="Login page">
            Login
        </Layout>
    );
}

export default Login;