import { useEffect, useState } from "react";
import { getPatients } from "../api/patient";
import { getBands, getBandBrandById } from "../api/band"; // API Band for band and brand

const RecentPatients = () => {
  const [patients, setPatients] = useState([]);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patients
        const resPatients = await getPatients(1, 10);
        const patientList =
          resPatients?.data?.items?.$values?.filter(
            (p) => p.role === "Patient"
          ) || [];
        setPatients(patientList);

        // Fetch bands and their brand names
        const resBands = await getBands(1, 10);
        const bandList = resBands?.data?.items?.$values || [];

        const bandListWithBrands = await Promise.all(
          bandList.map(async (band) => {
            let nameBrand = "Unknown";

            try {
              const brandData = await getBandBrandById(band.id);
              nameBrand = brandData?.data?.nameBrand || "Unknown";
            } catch (brandError) {
              console.error("Error fetching brand:", brandError);
            }

            return { ...band, nameBrand };
          })
        );

        setBands(bandListWithBrands);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6  p-4  transition-all duration-300">
      {/* Patients Table */}
      <div className="w-full xl:w-1/2 mb-6 bg-white rounded-lg shadow-md">
        <h3 className="text-gray-700 font-semibold mb-4 p-4 border-b">Recent Patients</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">DOB</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="">
                <td className="px-4 py-2">{patient.fullName || `Patient ${patient.id}`}</td>
                <td className="px-4 py-2">{patient.phoneNumber || "N/A"}</td>
                <td className="px-4 py-2">{patient.patientInfo?.gender || "Unknown"}</td>
                <td className="px-4 py-2">
                  {patient.patientInfo?.dateOfBirth
                    ? new Date(patient.patientInfo.dateOfBirth).toLocaleDateString()
                    : "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bands Table */}
      <div className="w-full xl:w-1/2 bg-white rounded-lg shadow-md">
        <h3 className="text-gray-700 font-semibold mb-4 p-4 border-b">Recent Devices</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Band Code</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band) => (
              <tr key={band.id} className="">
                <td className="px-4 py-2">{band.bandCode || "N/A"}</td>
                <td className="px-4 py-2">{band.nameBrand || "Unknown"}</td>
                <td className="px-4 py-2">{band.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-2">
                  {band.createdTime
                    ? new Date(band.createdTime).toLocaleDateString()
                    : "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
