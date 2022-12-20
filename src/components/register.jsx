import { Suspense, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        dob: new Date(),
        guardian: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const { fullname, email, password, gender, dob, guardian } = user;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (supabase.auth.getUser() !== null) {
    //         navigate("/dashboard");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

            if (data.user) {
                const { _, error } = await supabase.from("User").insert([
                    {
                        name: fullname,
                        dob,
                        guardian_contact: guardian,
                        gender,
                        auth_id: data.user.id,
                    },
                ]);
                if (error) throw error;
                setUser({
                    email: "",
                    password: "",
                    fullname: "",
                    gender: "",
                    dob: new Date(),
                    guardian: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <form onSubmit={handleSignup}>
                    <h1 className="form-title">Infant Registration</h1>

                    <div className="text-field">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            name="email"
                            required
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
                            required
                        />
                    </div>

                    <div className="text-field">
                        <label>Fullname</label>
                        <input
                            type="text"
                            placeholder="Fullname"
                            value={fullname}
                            onChange={handleChange}
                            name="fullname"
                            required
                        />
                    </div>
                    <div className="text-field">
                        <label>Parent/Guardian Contact Number</label>
                        <input
                            type="text"
                            value={guardian}
                            onChange={handleChange}
                            name="guardian"
                            placeholder="+234 (812) 345-6789"
                            required
                        />
                    </div>
                    <div className="text-field">
                        <label>Date of birth</label>
                        <div>
                            <DatePicker
                                selected={dob}
                                onChange={(date) =>
                                    setUser({ ...user, dob: date })
                                }
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={25}
                                scrollableYearDropdown
                                required
                            />
                        </div>
                    </div>
                    <div className="text-field">
                        <label>Gender</label>
                        <div className="radios flex">
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
                    <button disabled={loading} type="submit" className="submit">
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
        </Suspense>
    );
}
