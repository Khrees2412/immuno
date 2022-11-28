import { useState } from "react";
import { supabase } from "../supabaseClient";
import DatePicker from "react-datepicker";

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
                    <div className="radios">
                        <div>
                            Male
                            <input
                                type="radio"
                                value={gender}
                                onChange={handleChange}
                                name="Male"
                            />
                        </div>
                        <div>
                            Female
                            <input
                                type="radio"
                                value={gender}
                                onChange={handleChange}
                                name="Female"
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
                    <DatePicker
                        selected={dob}
                        onChange={(date) => setUser({ date })}
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
                <button onClick={handleLogin} className="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
