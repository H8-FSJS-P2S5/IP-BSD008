import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../component/headers";
import Corausel from "../component/carousel";
import Testimoni from "../component/testimoni";

const Home = () => {
  return (
    <>
      <div className="container flex justify-center">
        <body className="flex-col h-screen w-full dark:bg-gray-500 dark:text-gray-800">
          <section>
            <Header />
          </section>
          <section>
            <Corausel />
          </section>
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <Testimoni />
          </section>
        </body>
      </div>
    </>
  );
};

export default Home;
