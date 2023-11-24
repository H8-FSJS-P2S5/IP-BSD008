import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

const AllData = () => {
  const [datas, setDatas] = useState({});
  const BASE_URL = "https://disease.sh/";

  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${BASE_URL}v3/covid-19/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDatas(response.data);
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
      <div className="container mt-10 p-2 mx-auto rounded-md sm:p-4 text-gray-800 bg-gray-50">
        <h2 className="mb-3 text-2xl font-semibold leadi">Standings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="rounded-t-lg bg-gray-300">
              <tr className="text-right">
                <th title="Ranking" className="p-3 text-left">
                  Keterangan
                </th>
                <th title="Team name" className="p-3 text-left">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cases</td>
                <td>{datas.cases}</td>
              </tr>
              <tr>
                <td>Total Cases Today</td>
                <td>{datas.todayCases}</td>
              </tr>
              <tr>
                <td>Deaths</td>
                <td>{datas.cases}</td>
              </tr>
              <tr>
                <td>Total Deaths Today</td>
                <td>{datas.todayDeaths}</td>
              </tr>
              <tr>
                <td>Recovered</td>
                <td>{datas.recovered}</td>
              </tr>
              <tr>
                <td>Active</td>
                <td>{datas.active}</td>
              </tr>
              <tr>
                <td>Deaths Per One Million</td>
                <td>{datas.deathsPerOneMillion}</td>
              </tr>
              <tr>
                <td>Cases Per One Million</td>
                <td>{datas.casesPerOneMillion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllData;
