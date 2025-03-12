const RecentPatients = () => {
    return (
        <div className="w-full flex-grow bg-gray-50 p-4 rounded-lg shadow-md transition-all duration-300">
            <h3 className="text-gray-700 font-semibold mb-4">Recent Patients</h3>
            <div className="space-y-4">
                {[
                    { name: "Amina Smith", phone: "+1 908 765 432", time: "2:00 PM" },
                    { name: "Minahil Khan", phone: "+1 890 123 456", time: "2:00 PM" },
                    { name: "Alex Morgan", phone: "+1 908 765 432", time: "2:00 PM" },
                    { name: "John Doe", phone: "+1 234 567 890", time: "2:00 PM" },
                    { name: "David Beckham", phone: "+1 456 789 123", time: "2:00 PM" },
                ].map((patient, index) => (
                    <div key={index} className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="text-gray-700 font-semibold">{patient.name}</p>
                                <p className="text-sm text-gray-500">{patient.phone}</p>
                            </div>
                        </div>
                        <p className="text-gray-500">{patient.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPatients;