import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

const Continent = () => {
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
      <section>
        <Navbar />
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {datas.country}
              </h2>

              <p className="mt-4 text-gray-600">
                Pandemi Covid-19 di Indonesia merupakan bagian dari pandemi
                penyakit koronavirus 2019 (Covid-19) yang sedang berlangsung di
                seluruh dunia. Penyakit ini disebabkan oleh koronavirus sindrom
                pernapasan akut berat 2 (SARS-CoV-2). Kasus positif Covid-19 di
                Indonesia pertama kali dideteksi pada tanggal 2 Maret 2020,
                ketika dua orang terkonfirmasi tertular dari seorang warga
                negara Jepang. Pada tanggal 9 April, pandemi sudah menyebar ke
                34 provinsi dengan DKI Jakarta, Jawa Barat dan Jawa Tengah
                sebagai provinsi paling terpapar SARS-CoV-2 di Indonesia.
              </p>
              <Link to={"/show-countries"}>
                <a className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
                  See All Country...
                </a>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <svg
                    className="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />{" "}
                    <line x1="10" y1="10" x2="10.01" y2="10" />{" "}
                    <line x1="14" y1="10" x2="14.01" y2="10" />{" "}
                    <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                  </svg>
                </span>

                <h2 className="mt-2 font-bold">Deaths</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  {datas.deaths}
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <svg
                    className="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="12" cy="12" r="5" />{" "}
                    <path d="M12 7v-4m-1 0h2" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(45 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(90 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(135 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(180 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(225 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(270 12 12)" />{" "}
                    <path d="M12 7v-4m-1 0h2" transform="rotate(315 12 12)" />
                  </svg>
                </span>

                <h2 className="mt-2 font-bold">Cases</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  {datas.cases}
                </p>
              </a>

              <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="/accountant"
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <svg
                    className="h-8 w-8 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="21 12 17 12 14 20 10 4 7 12 3 12" />
                  </svg>
                </span>

                <h2 className="mt-2 font-bold">Active</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  {datas.active}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Continent;
