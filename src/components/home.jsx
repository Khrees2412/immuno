import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">
            <h1 className="hero">Welcome to Immuno</h1>
            <p className="hero-b">
                Immuno is a secure and convenient way to keep track of you and
                your loved ones' immunization records.
            </p>

            <div className="buttons">
                <Link to={"/register"} className="register">
                    Register
                </Link>
                <Link to={"/signin"} className="signin">
                    Signin
                </Link>
            </div>
        </div>
    );
}
