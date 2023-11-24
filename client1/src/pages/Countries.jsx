import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";

const Countries = () => {
  const BASE_URL = "https://disease.sh/";
  const [datas, setDatas] = useState([]);

  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${BASE_URL}v3/covid-19/continents/asia?strict=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "<<<<<");
      setDatas(response.data);
      console.log(datas);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <Navbar />
      {/* {datas.map(() => ( */}
      <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50">
        <img
          src="https://source.unsplash.com/random/300x300/?1"
          alt=""
          className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracki uppercase dark:text-purple-400">
            Quisque
          </span>
          <h2 className="text-xl font-semibold tracki">Nam maximus purus</h2>
        </div>
        <p className="dark:text-gray-100">
          Mauris et lorem at elit tristique dignissim et ullamcorper elit. In
          sed feugiat mi. Etiam ut lacinia dui.
        </p>
      </div>
      {/* ))} */}
    </>
  );
};

export default Countries;
