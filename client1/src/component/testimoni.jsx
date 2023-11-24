import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Testimoni = () => {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data.data, 17);
      setDatas(data.data); // Assuming the data is in the 'data' property of the response
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  console.log(datas, "<<<<<<<<<<<"); // This will log the initial state, not the updated state
  return (
    <>
      <div className="container flex justify-between px-6 py-12 mx-auto  dark:bg-gray-500 dark:text-gray-800">
        <div className="grid items-center gap-4 xl:grid-cols-5">
          <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
            <h2 className="text-4xl font-bold">
              <Link to={"/add-history"}>
                Berbagi Cerita dan Pengalaman Seputar Covid-19
              </Link>
            </h2>
            <p className="dark:text-gray-400">
              Pri ex magna scaevola moderatius. Nullam accommodare no vix, est
              ei diceret alienum, et sit cetero malorum. Et sea iudico
              consequat, est sanctus adipisci ex.
            </p>
          </div>
          <div className="p-6 xl:col-span-3">
            <div className="grid gap-7 md:grid-cols-2">
              <div className="grid content-center gap-7">
                {datas.map((el) => (
                  <>
                    <div className="p-6 rounded shadow-md dark:bg-gray-900">
                      <p>{el.history}</p>
                      <div className="flex items-center mt-4 space-x-4">
                        <div>
                          <p className="text-lg font-semibold">
                            {el.User.firstName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
