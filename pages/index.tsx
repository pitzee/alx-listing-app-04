import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { HERO_BG_IMAGE } from "@/constants";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/property/PropertyCard";
import type { PropertyProps } from "@/interfaces";

const filterLabels = [
  "Top Villa",
  "Self Checkin",
  "Pet Friendly",
  "Free Parking",
  "Luxury Villa",
  "Beachfront",
  "Mountain View",
  "Private Pool",
  "City Center",
  "Countryside",
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter logic
  const filteredListings = selectedFilter
    ? properties.filter((property) =>
        property.category.includes(selectedFilter)
      )
    : properties;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[350px] flex items-center justify-center text-center mb-8">
        <Image
          src={HERO_BG_IMAGE}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Find your favorite place here!
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow-lg">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="flex flex-wrap justify-center mb-8">
        {filterLabels.map((label) => (
          <Pill
            key={label}
            label={label}
            selected={selectedFilter === label}
            onClick={() =>
              setSelectedFilter(selectedFilter === label ? null : label)
            }
          />
        ))}
      </section>

      {/* Listing Section */}
      <section className="px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.map((property, idx) => (
              <PropertyCard key={property.name + idx} property={property} />
            ))}
          </div>
        )}

        {!loading && !error && filteredListings.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                No properties found matching your criteria.
              </p>
              <button
                onClick={() => setSelectedFilter(null)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
