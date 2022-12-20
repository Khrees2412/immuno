import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
    const [user, setUser] = useState({
        name: "",
        id: "",
    });
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const { name, id } = user;

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setImmmunisation({ ...immunisation, [name]: value });
    };
    const getSupabaseUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (data.user) {
                getUser(data.user.id);
            }
            if (error) throw error;
        } catch (error) {
            console.error(error);
        }
    };
    const getUser = async (id) => {
        const { data, error } = await supabase
            .from("User")
            .select("*")
            .eq("auth_id", id);
        if (error) throw error;
        data.map((user) => {
            setUser({ ...user, name: user.name, id: user.auth_id });
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNewRecord(immunisation);
    };
    const addNewRecord = async (record) => {
        setLoading(true);
        try {
            const { _, error } = await supabase.from("Immunisation").insert([
                {
                    vaccine: record.vaccine,
                    administered_by: record.administered_by,
                    user: id,
                    date_given: record.date_given,
                    dose: record.dose,
                    frequency: record.frequency,
                },
            ]);
            if (error) throw error;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        setImmmunisation({
            vaccine: "",
            administered_by: "",
            user: "",
            date_given: "",
            dose: "",
            frequency: "",
        });
    };
    const deleteRecord = async (id) => {
        setLoading(true);
        try {
            const { _, error } = await supabase
                .from("Immunisation")
                .delete()
                .eq("id", id);
            if (error) throw error;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const updateRecord = async (id) => {};
    const getRecord = async (id) => {};
    const getAllRecords = async (e) => {
        try {
            const { data, error } = await supabase
                .from("Immunisation")
                .select("*");
            if (error) throw error;
            setRecords(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getSupabaseUser();
    }, []);
    useEffect(() => {
        getAllRecords();
    }, [records]);

    return (
        <div>
            <p>Hi {name ? name : "Customer"}</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1 className="form-title">
                        Add a new immunisation record
                    </h1>
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
                    <button disabled={loading} className="submit">
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
            <div className="display">
                <h1>All Immunisation Data</h1>
                <div className="records">
                    {records.map((record) => (
                        <div key={record.id} className="record-outer">
                            <div className="record">
                                <p>{record.vaccine}</p>
                                <p>{record.administered_by}</p>
                                <p>{`${new Date(
                                    Date.parse(record.date_given)
                                )}`}</p>
                                <p>{record.dose}</p>
                                <p>{record.frequency}</p>
                            </div>
                            <button
                                className="delete-btn"
                                onClick={() => deleteRecord(record.id)}
                            >
                                Delete Record
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
