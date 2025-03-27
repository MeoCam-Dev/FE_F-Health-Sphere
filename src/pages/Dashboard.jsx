import { useEffect, useState } from "react";
import RecentPatients from "../components/RecentPatients";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getHealthRecords } from "../api/health";
import { getPatientsById, getPatients } from "../api/patient"; // ⬅️ cần thêm getPatients()

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients(1, 100);
        const patients = res?.data?.items?.$values?.filter(
          (acc) => acc.role === "Patient"
        );
        // const patients = res?.data?.items?.$values;
        setPatientList(patients);
        if (patients.length > 0) {
          setSelectedPatient(patients[0].id);
        }
      } catch (error) {
        console.error("Error fetching patient list:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchHealthRecords = async () => {
      if (!selectedPatient) return;

      try {
        const res = await getHealthRecords(selectedPatient);
        const items = res?.data?.data?.items?.$values || [];

        const transformed = items.map((record) => {
          const created = new Date(record.createdTime).toLocaleTimeString();
          const metricValues = record.recordMetricItems.$values;

          const systolic = metricValues.find((m) => m.metricId === 1)?.value;
          const diastolic = metricValues.find((m) => m.metricId === 2)?.value;

          return {
            time: created,
            systolic,
            diastolic,
          };
        });

        setChartData(transformed);

        const patientRes = await getPatientsById(selectedPatient);
        setPatientName(patientRes.fullName || `Patient ${selectedPatient}`);
      } catch (error) {
        console.error("Error fetching health records or patient info:", error);
        setPatientName(`Patient ${selectedPatient}`);
        setChartData([]);
      }
    };

    fetchHealthRecords();
  }, [selectedPatient]);

  return (
    <div className="p-6">
      {/* Dropdown chọn bệnh nhân */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select Patient:
        </label>
        <select
          value={selectedPatient || ""}
          onChange={(e) => setSelectedPatient(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded w-64"
        >
          {patientList.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.fullName || `Patient ${patient.id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ huyết áp */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          Blood Pressure Report –{" "}
          <span className="text-indigo-600">{patientName}</span>
        </h3>

        {chartData.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No health data available for this patient.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#8884d8"
                name="Tâm thu"
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#82ca9d"
                name="Tâm trương"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent Patients (giữ nguyên) */}
      <div className="flex flex-wrap gap-6 w-full">
        <div className="w-full xl:w-[23%] grow-1 flex-shrink-0">
          <RecentPatients />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
