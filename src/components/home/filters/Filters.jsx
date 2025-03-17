import React, { useState } from "react";
import { NumberInput, Checkbox, Button } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export default function Filters({ close }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 1);
  const [children, setChildren] = useState(
    Number(searchParams.get("children")) || 0
  );
  const [roomTypes, setRoomTypes] = useState({
    single: searchParams.get("single") === "true",
    double: searchParams.get("double") === "true",
    suite: searchParams.get("suite") === "true",
  });

  const handleApply = () => {
    const params = new URLSearchParams();

    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("adults", adults);
    params.set("children", children);

    Object.keys(roomTypes).forEach((type) => {
      if (roomTypes[type]) params.set(type, "true");
    });

    setSearchParams(params);
    close();
  };

  return (
    <div className="space-y-5">
      {/* Date Pickers (Styled like Other Inputs) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200">
          Check-in Date
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-200">
          Check-out Date
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* Guest Selectors */}
      <NumberInput label="Adults" min={1} value={adults} onChange={setAdults} />
      <NumberInput
        label="Children"
        min={0}
        value={children}
        onChange={setChildren}
      />

      {/* Room Type Filters */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-200">Room Type</p>
        <Checkbox
          label="Single"
          checked={roomTypes.single}
          onChange={(event) =>
            setRoomTypes({ ...roomTypes, single: event.currentTarget.checked })
          }
        />
        <Checkbox
          label="Double"
          checked={roomTypes.double}
          onChange={(event) =>
            setRoomTypes({ ...roomTypes, double: event.currentTarget.checked })
          }
        />
        <Checkbox
          label="Suite"
          checked={roomTypes.suite}
          onChange={(event) =>
            setRoomTypes({ ...roomTypes, suite: event.currentTarget.checked })
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4">
        <Button onClick={handleApply}>Apply Filters</Button>
      </div>
    </div>
  );
}
