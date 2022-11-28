import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signin() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    const { email, password } = user;
    return (
        <div>
            <form>
                <div className="text-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        name="email"
                    />
                </div>
                <div className="text-field">
                    <label>Password</label>
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
                <button onClick={handleLogin} className="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
