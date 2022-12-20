import { useNavigate, Outlet, Route, Routes, Link } from "react-router-dom";
import Signin from "./components/signin";
import { supabase } from "./supabaseClient";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import "./App.css";
import Home from "./components/home";
import { useEffect } from "react";

function App() {
    const navigator = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session === null) {
                navigator("/signin");
            } else {
                navigator("/dashboard");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <nav className="navbar">
                {/* <AuthStatus /> */}
                <Link to="/">
                    <h1>Immuno</h1>
                </Link>
                <ul className="navlinks">
                    <li className="navlink">
                        <Link to="/register">Register</Link>
                    </li>
                    <li className="navlink">
                        <Link to="/signin">Signin</Link>
                    </li>
                    <li className="navlink">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="navlink logout">
                        <button className="logout" onClick={signOut}>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
}

export default App;
