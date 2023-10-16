import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "store/user";
import { IUser, RootState } from "utils/interfaces";
import Layout from "components/Layout";

const Register = () => {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState<IUser>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { first_name, last_name, email, password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch<any>(register(formData)); // мб типизировать позже(тип функции register)
    }

    if (registered) return <Navigate to="/login" />;

    return (
        <Layout title="DRAuthV2 | Home" content="Register page">
            <h1>Register for an Account</h1>
            <form className="mt-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="first_name">First name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        onChange={onChange}
                        value={first_name}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="form-label" htmlFor="last_name">Last name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        onChange={onChange}
                        value={last_name}
                        required
                    />
                </div>
                <div className="form-group mt-3">
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
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ): (
                    <button className="btn btn-primary mt-4 btn-lg">
                        Register
                    </button>
                )}
            </form>
        </Layout>
    );
}

export default Register;