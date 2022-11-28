import { useNavigate, Outlet, Route, Routes, Link } from "react-router-dom";
import Signin from "./components/signin";
import Signup from "./components/signup";
import "./App.css";
import Home from "./components/home";

function App() {
    return (
        <div className="App">
            <nav className="navbar">
                {/* <AuthStatus /> */}
                <Link to="/">
                    <h1>Immuno</h1>
                </Link>
                <ul className="navlinks">
                    <li className="navlink">
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li className="navlink">
                        <Link to="/signin">Signin</Link>
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
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </div>
    );
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
}

export default App;
