import { FaCalendar, FaFilter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const patients = [
  {
    id: 1,
    name: "Hugo Lloris",
    phone: "+1 234 567 890",
    createdAt: "20 Aug 2021",
    gender: "Male",
    bloodGroup: "A+",
    age: 25,
    avatar: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
  },
  {
    id: 2,
    name: "Mauris auctor",
    phone: "+1 456 789 123",
    createdAt: "22 Nov 2023",
    gender: "Female",
    bloodGroup: "B+",
    age: 34,
    avatar: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
  },
  {
    id: 3,
    name: "Michael Owen",
    phone: "+1 890 123 456",
    createdAt: "12 Jan 2020",
    gender: "Male",
    bloodGroup: "O+",
    age: 45,
    avatar: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
  },
  {
    id: 4,
    name: "Amina Smith",
    phone: "+1 908 765 432",
    createdAt: "07 Feb 2001",
    gender: "Female",
    bloodGroup: "AB+",
    age: 28,
    avatar: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
  },
  {
    id: 5,
    name: "Minahil Khan",
    phone: "+1 890 123 456",
    createdAt: "30 Dec 2019",
    gender: "Female",
    bloodGroup: "A+",
    age: 35,
    avatar: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
  },
];

const Patient = () => {
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
      <div className="bg-white p-5 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b rounded-4xl text-gray-400 bg-gray-100">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Created At</th>
              <th className="py-4 px-6">Gender</th>
              <th className="py-4 px-6">Blood Group</th>
              <th className="py-4 px-6">Age</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{patient.id}</td>
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={patient.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-gray-500 text-sm">{patient.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-6">{patient.createdAt}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      patient.gender === "Male"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}>
                    {patient.gender}
                  </span>
                </td>
                <td className="py-4 px-6">{patient.bloodGroup}</td>
                <td className="py-4 px-6">{patient.age}</td>
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
