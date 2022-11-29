import { useState } from "react";
import { supabase } from "../supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        dob: new Date(),
        guardian: "",
    });
    const [error, setError] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const { fullname, email, password, gender, dob, guardian } = user;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (dob === new Date()) {
                alert("invalid DOB!!");
            }
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSignup = async () => {
        try {
            const { user, session, error } = await supabase.auth.signUp();
        } catch (error) {}
        console.error(error);
    };
    const saveUser = async () => {
        try {
            const { data, error } = await supabase.from("user").insert([
                {
                    name: fullname,
                    gender,
                    dob,
                    guardian_contact: guardian,
                },
            ]);
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <form>
                <h1 className="form-title">Infant Registration</h1>
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
                    <div className="radios">
                        <div className="radio">
                            <div>Male</div>
                            <input
                                type="radio"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={handleChange}
                                name="gender"
                            />
                        </div>
                        <div className="radio">
                            <div>Female</div>
                            <input
                                type="radio"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={handleChange}
                                name="gender"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-field">
                    <label>Parent/Guardian Contact Number</label>
                    <input
                        type="text"
                        value={guardian}
                        onChange={handleChange}
                        name="guardian"
                    />
                </div>
                <div className="text-field">
                    <label>Date of birth</label>
                    <div>
                        <DatePicker
                            selected={dob}
                            onChange={(date) => setUser({ ...user, dob: date })}
                        />
                    </div>
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
                <button onClick={handleLogin} className="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
