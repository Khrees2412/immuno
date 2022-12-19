import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
    const [user, setUser] = useState(null);

    const [immunisation, setImmmunisation] = useState({
        vaccine: "",
        administered_by: "",
        user: "",
        date_given: "",
        dose: "",
        frequency: "",
    });

    const { vaccine, administered_by, date_given, dose, frequency } =
        immunisation;

    const getSupabaseUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (data.user) {
                const { dataNew, error } = await supabase
                    .from("User")
                    .select("*")
                    .eq("auth_id", data.user.id);
                if (error) throw error;
                setUser(dataNew);
            }

            if (error) throw error;
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setImmmunisation({ ...immunisation, [name]: value });
    };

    useEffect(() => {
        getSupabaseUser();
    }, []);

    const addNewRecord = async (record) => {
        try {
            const { data, error } = await supabase.from("Immunisation").insert([
                {
                    name: "DPT",
                    date: new Date(),
                    user_id: user[0].id,
                },
            ]);
            if (error) throw error;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const deleteRecord = async (id) => {};
    const updateRecord = async (id) => {};
    const getRecord = async (id) => {};
    const getAllRecords = async (e) => {};
    return (
        <div>
            Dashboard
            <p>Hey ! {user ? user : "Customer"}</p>
            <div>
                <form>
                    <h1>Add a new immunisation record</h1>
                    <div className="text-field">
                        <label htmlFor="vaccine">Vaccine</label>
                        <input
                            type="text"
                            placeholder="vaccine"
                            value={vaccine}
                            onChange={handleChange}
                            name="vaccine"
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="administered">Administered By </label>
                        <input
                            type="text"
                            placeholder="Administered By"
                            value={administered_by}
                            onChange={handleChange}
                            name="administered_by"
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="Dose">Dose</label>
                        <input
                            type="text"
                            placeholder="Dose"
                            value={dose}
                            onChange={handleChange}
                            name="dose"
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="frequency">Frequency</label>
                        <input
                            type="text"
                            placeholder="Frequency"
                            value={frequency}
                            onChange={handleChange}
                            name="frequency"
                        />
                    </div>
                    <div className="text-field">
                        <label htmlFor="date_given">Date Given</label>
                        <div>
                            <DatePicker
                                selected={date_given}
                                onChange={(date) =>
                                    setImmmunisation({
                                        ...immunisation,
                                        date_given: date,
                                    })
                                }
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={25}
                                scrollableYearDropdown
                                required
                                name="date_given"
                                placeholderText="Pick a date"
                            />
                        </div>
                    </div>
                    <button onClick={addNewRecord} className="submit">
                        Add
                    </button>
                </form>
            </div>
            <div>
                <h1>All Immunisation Data</h1>
                <button onClick={getAllRecords}>Get All Records</button>
            </div>
        </div>
    );
}
