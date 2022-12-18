export default function Details() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.from("users").insert([
                {
                    name: fullname,
                    dob,
                    guardian_contact: guardian,
                    gender,
                    user_id: data.user.id,
                },
            ]);
            if (error) throw error;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="form-title">Infant Registration</h1>
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
                            onChange={(date) => setUser({ ...user, dob: date })}
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
                    Submit
                </button>
            </form>
        </div>
    );
}
