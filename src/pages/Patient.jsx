import { useEffect, useState } from "react";
import { FaCalendar, FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { getPatients } from "../api/patient";

const Patient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        const data = response?.data?.items?.$values || [];
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Today Patients */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">Today Patients</h2>
            <p className="text-3xl font-semibold">10</p>
            <p className="text-sm text-gray-400">
              Total Patients <span className="text-green-500">10</span> today
            </p>
          </div>
          <FaCalendar className="text-green-500 text-2xl" />
        </div>

        {/* Monthly Patients */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">Monthly Patients</h2>
            <p className="text-3xl font-semibold">230</p>
            <p className="text-sm text-gray-400">
              Total Patients <span className="text-orange-500">230</span> this
              month
            </p>
          </div>
          <div className="bg-orange-500 text-white p-2 rounded-lg text-sm">
            Aug
          </div>
        </div>

        {/* Yearly Patients */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-gray-500 text-sm">Yearly Patients</h2>
            <p className="text-3xl font-semibold">1,500</p>
            <p className="text-sm text-gray-400">
              Total Patients <span className="text-green-500">1,500</span> this
              year
            </p>
          </div>
          <FaCalendar className="text-green-500 text-2xl" />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder='Search "Patients"'
          className="border border-gray-300 p-3 rounded-lg w-full min-w-0"
        />

        <select className="border border-gray-300 p-3 rounded-lg w-full min-w-0">
          <option>Sort by...</option>
          <option>Name</option>
          <option>Age</option>
          <option>Blood Group</option>
        </select>

        <select className="border border-gray-300 p-3 rounded-lg w-full min-w-0">
          <option>Gender...</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <div className="flex items-center w-full min-w-0">
          <input
            type="date"
            className="border border-gray-300 p-3 rounded-lg w-full"
          />
          <button className="bg-green-500 text-white p-3 px-5 rounded-lg ml-2 hover:scale-105 transition">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Patient Table */}
      {/* Patient Table */}
      <div className="bg-white p-5 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-400 bg-gray-100">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Gender</th>
              <th className="py-4 px-6">Date of Birth</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6 font-semibold">
                  {patient.fullName || "N/A"}
                </td>
                <td className="py-4 px-6">{patient.email || "N/A"}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      patient.patientInfo?.gender === "Male"
                        ? "bg-green-100 text-green-600"
                        : patient.patientInfo?.gender === "Female"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {patient.patientInfo?.gender || "N/A"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {patient.patientInfo?.dateOfBirth || "N/A"}
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 bg-gray-200 rounded-full hover:scale-110 transition">
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patient;
