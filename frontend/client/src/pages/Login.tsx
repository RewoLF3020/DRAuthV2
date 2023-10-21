import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { resetRegistered, login } from "store/user";
import { ILogin, RootState } from "utils/interfaces";
import Layout from "components/Layout";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, isAuth, registered } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (registered) dispatch(resetRegistered());
    }, [registered]);

    const [formData, setFormData] = useState<ILogin>({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch<any>(login(formData));
    };

    if (isAuth) return <Navigate to='/dashboard' />;

    return (
        <Layout title="DRAuthV2 | Login" content="Login page">
            <h1>Log into your account</h1>
            <form className="mt-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={onChange}
                        value={email}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>
                {loading ? (
                    <div className="spinner-border text-primary mt-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ): (
                    <button className="btn btn-primary mt-4">
                        Login
                    </button>
                )}
            </form>
        </Layout>
    );
}

export default Login;