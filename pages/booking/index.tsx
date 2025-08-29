import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "@/components/booking/BookingForm";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import OrderSummary from "@/components/booking/OrderSummary";
import type { PropertyProps } from "@/interfaces";

export default function BookingPage() {
  const router = useRouter();
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const { propertyId } = router.query;

      if (!propertyId) {
        setError("No property selected");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchPropertyDetails();
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Property not found"}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bookingDetails = {
    propertyName: property.name,
    price: property.price,
    bookingFee: 65,
    totalNights: 3, // This could be calculated from check-in/check-out dates
    startDate: "24 August 2024", // This could be dynamic
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Complete Your Booking
        </h1>
        <p className="text-gray-600 mt-2">Book your stay at {property.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingForm />
        <div className="space-y-6">
          <OrderSummary bookingDetails={bookingDetails} />
          <CancellationPolicy />
        </div>
      </div>
    </div>
  );
}
