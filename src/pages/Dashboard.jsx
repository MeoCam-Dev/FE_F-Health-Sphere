import {
  FaUserInjured,
  FaCalendarCheck,
  FaFileMedical,
  FaDollarSign,
} from "react-icons/fa";
import EarningsReport from "../components/EarningsReport";
import RecentPatients from "../components/RecentPatients";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";



const stats = [
  {
    id: 1,
    title: "Total Patients",
    value: "1600+",
    change: -45.06,
    color: "text-teal-500",
    icon: <FaUserInjured className="text-teal-500 text-2xl" />,
    chartColor: "#14b8a6",
    data: [50, 70, 80, 60, 90, 100, 80],
  },
  {
    id: 2,
    title: "Appointments",
    value: "130+",
    change: -25.06,
    color: "text-yellow-500",
    icon: <FaCalendarCheck className="text-yellow-500 text-2xl" />,
    chartColor: "#fbbf24",
    data: [30, 50, 40, 70, 60, 80, 50],
  },
  {
    id: 3,
    title: "Prescriptions",
    value: "4160+",
    change: 65.06,
    color: "text-green-500",
    icon: <FaFileMedical className="text-green-500 text-2xl" />,
    chartColor: "#22c55e",
    data: [80, 90, 100, 110, 120, 130, 140],
  },
  {
    id: 4,
    title: "Total Earnings",
    value: "4590$",
    change: -45.06,
    color: "text-red-500",
    icon: <FaDollarSign className="text-red-500 text-2xl" />,
    chartColor: "#ef4444",
    data: [60, 70, 80, 90, 100, 110, 120],
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-gray-100">{item.icon}</div>
              <h2 className="text-gray-700 font-semibold">{item.title}</h2>
            </div>

            <h3 className="text-2xl font-bold">{item.value}</h3>

            <div className="mt-2 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={item.data.map((val, index) => ({
                    name: index,
                    value: val,
                  }))}>
                  <Bar
                    dataKey="value"
                    fill={item.chartColor}
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className={`text-sm font-semibold mt-2 ${item.color}`}>
              {item.change < 0 ? "↓" : "↑"} {Math.abs(item.change)}%
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 w-full">
        <div className="flex-1 min-w-[60%] lg:min-w-[70%] xl:min-w-[75%]">
          <EarningsReport />
        </div>

        <div className="w-full xl:w-[23%] grow-1 flex-shrink-0">
          <RecentPatients />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
