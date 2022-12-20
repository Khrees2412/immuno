import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

export default function Signin() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const { email, password } = user;
    const signInAccount = async (email, password) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

            alert("Sign in successful");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSignin = async (e) => {
        e.preventDefault();
        await signInAccount(email, password);
    };

    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.getSession());
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    return (
        <div>
            <form onSubmit={handleSignin}>
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
                <button disabled={loading} className="submit">
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
