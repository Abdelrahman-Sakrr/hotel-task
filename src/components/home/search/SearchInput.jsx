import { TextInput } from "@mantine/core";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SearchInput({ variant }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("destination") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect: updates debouncedQuery after 2 seconds of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Update search params when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery !== searchParams.get("destination")) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedQuery) {
          newParams.set("destination", debouncedQuery);
        } else {
          newParams.delete("destination");
        }
        return newParams;
      });

      // Trigger API call
      fetchHotels(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchHotels = async (destination) => {
    try {
      const response = await axios.get(
        `https://api.makcorps.com/mapping?api_key=67d898e66262ad058cc7c22b&name=${destination}`
      );
      console.log("Fetched Hotels:", response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <TextInput
      leftSection={
        <Search className="w-[8px] h-[8px] md:w-[1.5rem] md:h-[1.5rem] aspect-square " />
      }
      value={query}
      placeholder={"Enter Your Destination"}
      variant={variant}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full max-w-[10rem] md:max-w-[16.25rem] aspect-searchInput lg:max-w-[36.3125rem] border-white border rounded-md"
    />
  );
}
