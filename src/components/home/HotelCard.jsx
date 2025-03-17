import React from "react";
import { Star } from "lucide-react";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4">
      {/* Hotel Details */}
      <div className="flex flex-col gap-2 mt-3">
        <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
        <p className="text-gray-500">{hotel.location}</p>

        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.floor(hotel.rating || 0) }).map(
            (_, index) => (
              <Star
                key={index}
                className="text-yellow-400 w-5 h-5 fill-yellow-400"
              />
            )
          )}
          <span className="text-gray-600 text-sm ml-1">
            ({hotel.rating || "N/A"})
          </span>
        </div>

        {/* Price Per Night */}
        {hotel.price ? (
          <p className="text-lg font-bold text-blue-600">
            ${hotel.price} / night
          </p>
        ) : (
          <p className="text-gray-500">Price not available</p>
        )}

        {/* Available Room Types */}
        {hotel.rooms?.length > 0 ? (
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-700">Room Types:</h4>
            <ul className="text-gray-600 text-sm list-disc pl-4">
              {hotel.rooms.map((room, index) => (
                <li key={index}>{room}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No rooms available</p>
        )}
      </div>
    </div>
  );
}
