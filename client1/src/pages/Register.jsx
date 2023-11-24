import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const BASE_URL = "http://localhost:3000";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // const token = localStorage.getItem("access_token");
      const res = await axios.post(`http://localhost:3000/register`, {
        firstName,
        lastName,
        province,
        city,
        phoneNumber,
        email,
        password,
        CategoryId,
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
      <form
        onSubmit={handleRegister}
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Infomation</p>
            <h2 className="">
              Bergabung Untuk Melihat Informasi Seputar Covid
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label for="firstName" className="text-sm">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="lastName" className="text-sm">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="city" className="text-sm">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="province" className="text-sm">
                Province
              </label>
              <input
                id="province"
                type="text"
                placeholder="Province"
                onChange={(e) => setProvince(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label for="phoneNumber" className="text-sm">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="password" className="text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="CategoryId" className="text-sm">
                Category
              </label>
              <input
                id="CategoryId"
                type="number"
                placeholder="Category"
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 border rounded-md dark:border-gray-100"
          >
            Register
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
