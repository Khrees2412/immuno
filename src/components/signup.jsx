import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        dob: "",
        guardian: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const { fullname, email, password, gender, dob, guardian } = user;

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
    }
    return (
        <div>
            <form>
                <div className="text-field">
                    <label>Fullname</label>
                    <input
                        type="text"
                        placeholder="Fullname"
                        value={fullname}
                        onChange={handleChange}
                        name="fullname"
                    />
                </div>
                <div className="text-field">
                    <label>Gender</label>
                    <input
                        type="radio"
                        value={gender}
                        checked={true}
                        name="Male"
                    />
                    <input
                        type="radio"
                        value={gender}
                        checked={false}
                        name="Female"
                    />
                </div>
                <div className="text-field">
                    <label>Parent/Guardian Contact Number</label>
                    <input
                        type="text"
                        placeholder="Parent/Guardian Contact Number"
                        value={guardian}
                        onChange={handleChange}
                        name="guardian"
                    />
                </div>
                <div className="text-field">
                    <label>Fullname</label>
                    <DatePicker
                        selected={dob}
                        onChange={(date) => setUser({ ...user, date })}
                    />
                </div>
                <div className="text-field">
                    <label>Email</label>
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
            </form>
        </div>
    );
}
