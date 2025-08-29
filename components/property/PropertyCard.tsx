import React from "react";
import Image from "next/image";
import type { PropertyProps } from "@/interfaces";

interface PropertyCardProps {
  property: PropertyProps;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={property.image}
          alt={property.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        {property.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{property.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{property.name}</h2>
        <p className="text-gray-600 text-sm mb-2">
          {property.address.city}, {property.address.country}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium text-gray-700">{property.rating}</span>
        </div>
        <div className="text-blue-600 font-bold text-xl mb-1">
          ${property.price.toLocaleString()}
          <span className="text-sm font-normal text-gray-500 ml-1">/night</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-3">{property.offers.bed} bed</span>
          <span className="mr-3">{property.offers.shower} shower</span>
          <span>{property.offers.occupants} guests</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {property.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
