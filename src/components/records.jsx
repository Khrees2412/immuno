import { useEffect } from "react";
import { useState } from "react";

export default function Records({ getAllRecords, deleteRecord }) {
    const [records, setRecords] = useState([]);
    const handleRecords = () => {
        const r = getAllRecords();
        setRecords(r);
    };

    useEffect(() => {
        handleRecords();
    }, [r]);
    return (
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
    );
}
