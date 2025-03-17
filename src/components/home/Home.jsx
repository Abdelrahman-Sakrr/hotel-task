import React, { useState, useEffect } from "react";
import SearchInput from "./search/SearchInput";
import HotelCard from "./HotelCard";
import { Filter } from "lucide-react";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Filters from "./filters/Filters";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "67d89da858deec05aa89b662";

export default function Home() {
  let [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const destination = searchParams.get("destination") || "the";
  const checkin = searchParams.get("checkin") || "";
  const adults = searchParams.get("adults") || "";
  const checkout = searchParams.get("checkout") || "";
  const [opened, { open, close }] = useDisclosure(false);
  const fetchHotels = async () => {
    const params = {
      api_key: API_KEY,
      name: destination,
    };

    if (checkin) params.checkin = checkin;
    if (checkout) params.checkout = checkout;
    if (adults) params.adults = adults;
    axios
      .get(`https://api.makcorps.com/mapping`, { params })
      .then((response) => {
        setHotels(response?.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    fetchHotels();
  }, [destination, hotels]);

  return (
    <>
      {" "}
      <div className="w-full min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <div className="flex justify-evenly md:justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-400 pb-2">
              Hotels
            </h2>
            <SearchInput />
            <button
              onClick={open}
              type="button"
              className="text-4xl hover:scale-110 cursor-pointer transition-all duration-300 font-bold text-gray-900 border-b-4 border-blue-400 pb-2"
            >
              <Filter />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  key={hotel.id}
                >
                  <HotelCard hotel={hotel} />
                </div>
              ))
            ) : (
              <p className="text-red-500 col-span-3 text-center animate-bounce font-bold text-2xl">
                No Hotels Found
              </p>
            )}
          </div>
        </div>
      </div>
      <Drawer opened={opened} onClose={close} title="Filters">
        <Filters close={close} />
      </Drawer>
    </>
  );
}
