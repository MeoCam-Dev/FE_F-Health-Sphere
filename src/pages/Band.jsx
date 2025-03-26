import { useEffect, useState } from "react";
import { getBands, getBandBrandById } from "../api/band";
import { Pagination } from "antd";
import { FaFilter } from "react-icons/fa";

const Band = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchBands = async () => {
      try {
        setLoading(true);
        const data = await getBands(currentPage, pageSize);
        let bandList = data.data.items.$values;

        const bandWithBrand = await Promise.all(
          bandList.map(async (band) => {
            if (band.id) {
              try {
                const brandData = await getBandBrandById(band.id);
                return { ...band, nameBrand: brandData.data.nameBrand };
              } catch (error) {
                console.error(
                  `Error fetching brand for band ${band.id}:`,
                  error
                );
                return { ...band, nameBrand: "Unknown" };
              }
            }
            return { ...band, nameBrand: "Unknown" };
          })
        );

        setBands(bandWithBrand);
        setTotalItems(data.data.totalCount);
      } catch (error) {
        console.error("Error fetching bands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBands();
  }, [currentPage]);

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">
          List of blood pressure measuring devices
        </h2>
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-4 px-6">STT</th>
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
