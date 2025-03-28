import { useEffect, useState } from "react";
import { getPatients } from "../api/patient";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State lưu từ khóa tìm kiếm
  const [selectedGender, setSelectedGender] = useState(""); // State lưu giới tính được chọn
  const [loading, setLoading] = useState(true); // State lưu trạng thái loading

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const response = await getPatients();
        const data = response?.data?.items?.$values || [];
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchPatients();
  }, []);

  // Lọc bệnh nhân dựa trên searchTerm và selectedGender
  // Lọc bệnh nhân dựa trên searchTerm, selectedGender và role
  const filteredPatients = patients.filter((patient) => {
    const matchesSearchTerm = patient.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender =
      !selectedGender || patient.patientInfo?.gender === selectedGender;
    const matchesRole = patient.role === "Patient"; // Lọc theo role: Patient
    return matchesSearchTerm && matchesGender && matchesRole;
  });

  return (
    <div className="p-6 min-h-screen">
      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder='Search "Patients"'
          className="border border-gray-300 p-3 rounded-lg w-full min-w-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state searchTerm
        />

        <select
          className="border border-gray-300 p-3 rounded-lg w-full min-w-0"
          onChange={(e) => setSelectedGender(e.target.value)} // Cập nhật state selectedGender
          value={selectedGender}
        >
          <option value="">Gender...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Patient Table */}
      <div className="bg-white p-5 rounded-lg shadow-sm overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-400 bg-gray-100">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Patient</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Gender</th>
                <th className="py-4 px-6">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
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
                    {patient.patientInfo?.dateOfBirth
                      ? new Date(patient.patientInfo.dateOfBirth)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                      : "N/A"}
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Patient;
