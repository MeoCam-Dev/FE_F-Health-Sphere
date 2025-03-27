import { useEffect, useState } from "react";
import { getBands, getBandBrandById } from "../api/band";
import { getPatientsById } from "../api/patient";
import { Pagination } from "antd";

const Band = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchBands = async () => {
      try {
        setLoading(true);

        const filters = {};
        if (searchTerm) filters.bandCode = searchTerm;
        if (sortBy) {
          filters.sortBy = sortBy;
          filters.sortOrder = "asc";
        }
        if (sortBy) {
          filters.sortBy = sortBy;
          filters.sortOrder = sortBy === "createdTime" ? "desc" : "asc";
        }

        const data = await getBands(currentPage, pageSize, filters);
        let bandList = data.data.items.$values;

        const bandWithExtraData = await Promise.all(
          bandList.map(async (band) => {
            let nameBrand = "Unknown";
            let patientName = "Unknown";

            // Get brand name
            try {
              const brandData = await getBandBrandById(band.id);
              nameBrand = brandData.data.nameBrand;
            } catch (error) {
              console.error("Error fetching brand data:", error);
            }

            // Get patient full name
            try {
              if (band.patientId) {
                const patientData = await getPatientsById(band.patientId);
                patientName = patientData.fullName;
              }
            } catch (error) {
              console.error("Error fetching patient data:", error);
            }

            return { ...band, nameBrand, patientName };
          })
        );

        setBands(bandWithExtraData);
        setTotalItems(data.data.totalCount);
      } catch (error) {
        console.error("Error fetching bands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBands();
  }, [currentPage, searchTerm, sortBy]);

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">
          List of blood pressure measuring devices
        </h2>

        {/* Filter Area */}
        <div className="bg-white p-5 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder='Search "Band Code"...'
            className="border border-gray-300 p-3 rounded-lg w-full min-w-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border border-gray-300 p-3 rounded-lg w-full min-w-0"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="bandCode">Band Code</option>
            <option value="createdTime">Created Time</option>
          </select>

          <div className="flex items-center w-full min-w-0">
            {/* <input
              type="date"
              className="border border-gray-300 p-3 rounded-lg w-full"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            /> */}
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-4 px-6">STT</th>
                  <th className="py-4 px-6">Patient ID</th>
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">BandCode</th>
                  <th className="py-4 px-6">BandBrand</th>
                  <th className="py-4 px-6">Created at</th>
                </tr>
              </thead>
              <tbody>
                {bands.map((band, index) => (
                  <tr key={band.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="py-4 px-6">{band.patientId || "N/A"}</td>
                    <td className="py-4 px-6">{band.patientName || "N/A"}</td>
                    <td className="py-4 px-6">{band.bandCode || "N/A"}</td>
                    <td className="py-4 px-6">{band.nameBrand}</td>
                    <td className="py-4 px-6">
                      {new Date(band.createdTime).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Band;
