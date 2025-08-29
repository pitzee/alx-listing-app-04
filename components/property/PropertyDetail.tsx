import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { PropertyProps } from "@/interfaces";
import ReviewSection from "./ReviewSection";

interface PropertyDetailProps {
  property: PropertyProps;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const router = useRouter();

  const handleBookNow = () => {
    router.push(
      `/booking?propertyId=${property.id}&propertyName=${encodeURIComponent(
        property.name
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="relative w-full h-96">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  priority
                />
                {property.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{property.discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {property.address.city}, {property.address.state},{" "}
                    {property.address.country}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                    <span className="text-lg font-normal text-gray-500 ml-1">
                      /night
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium text-gray-700">
                      {property.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {property.offers.bed} bed
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {property.offers.shower} shower
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    {property.offers.occupants} guests
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {property.category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection propertyId={property.id || 0} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Book this property
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night</span>
                  <span className="font-semibold">
                    ${property.price.toLocaleString()}
                  </span>
                </div>
                {property.discount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{property.discount}%</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${property.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
