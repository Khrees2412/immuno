export default function DisplayRecords({ records }) {
    return (
        <div>
            <h1>Records</h1>
            {records.map((record) => (
                <div>
                    <h3>{record.vaccine}</h3>
                    <p>{record.administered_by}</p>
                    <p>{record.dose}</p>
                    <p>{record.frequency}</p>
                    <p>{record.date_given}</p>
                </div>
            ))}
        </div>
    );
}
