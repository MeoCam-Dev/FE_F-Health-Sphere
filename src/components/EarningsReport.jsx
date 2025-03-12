
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


const earningsData = [
    { name: "Jan", earnings: 30000 },
    { name: "Feb", earnings: 25000 },
    { name: "Mar", earnings: 35000 },
    { name: "Apr", earnings: 50000 },
    { name: "May", earnings: 45000 },
    { name: "Jun", earnings: 55000 },
    { name: "Jul", earnings: 60000 },
    { name: "Aug", earnings: 50000 },
    { name: "Sep", earnings: 40000 },
    { name: "Oct", earnings: 70000 },
    { name: "Nov", earnings: 60000 },
    { name: "Dec", earnings: 40000 },
];

const EarningsReport = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-700 font-semibold text-lg">Earning Reports</h2>
                <div className="text-green-500 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                    +2.4%
                </div>
            </div>

            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fill: "#9CA3AF" }} tickLine={false} />
                        <YAxis tick={{ fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "none" }} />
                        <defs>
                            <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={2.5} fill="url(#earningsGradient)" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningsReport;