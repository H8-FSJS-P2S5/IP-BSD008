import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

const User = () => {
  const BASE_URL = "http://localhost:3000";
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(data.data, 14);
      setDatas(data.data);
      //   console.log(datas, 20);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("berhasil delete");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(datas[0], "<<<<<<<<");
  return (
    <>
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading....</h1>}
      <div className="container  h-screen max-w-screen-xl text-gray-800">
        <Navbar />
        <h2 className="mb-4 text-2xl font-semibold leadi">List Of data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left whitespace-nowrap">
            <thead className="dark:bg-gray-700">
              <tr className="text-center">
                <th className="p-3">No</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Category</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="border-b border-opacity-20 bg-gray-200"
                  >
                    <td className="p-3">{data.id}</td>
                    <td className="p-3">
                      {data.firstName} {data.lastName}
                    </td>
                    <td className="p-3">{data.email}</td>
                    <td className="p-3">
                      {data.city}, {data.province}
                    </td>
                    <td className="p-3">{data.Category.name}</td>
                    {/* <td className="p-3">{datas.User.username}</td> */}
                    <td>
                      <Link to={`/users/${datas.id}`}>
                        <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                          <span>Edit</span>
                        </span>
                      </Link>
                      <Link to={`/delete/user/${datas.id}`}>
                        <span
                          onClick={handleDelete}
                          className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900"
                        >
                          <span>Delete</span>
                        </span>
                      </Link>
                      {/* <Link to={`/img/${datas.id}`}>
                  <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                    <span>Update</span>
                  </span>
                </Link> */}
                    </td>
                  </tr>
                );
              })}
              {/* {datas.map((data) => {
                return (
                  
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
