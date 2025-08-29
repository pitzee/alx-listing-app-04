import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import type { BookingRequest } from "@/interfaces";

const BookingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingRequest>({
    propertyId: 0,
    checkIn: "",
    checkOut: "",
    guests: 1,
    totalPrice: 0,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get property details from URL query parameters
  useEffect(() => {
    const { propertyId, propertyName } = router.query;
    if (propertyId) {
      setFormData((prev) => ({
        ...prev,
        propertyId: parseInt(propertyId as string),
        guestName: (propertyName as string) || "",
      }));
    }
  }, [router.query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.guestName.trim()) {
      setError("Guest name is required");
      return false;
    }
    if (!formData.guestEmail.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.checkIn) {
      setError("Check-in date is required");
      return false;
    }
    if (!formData.checkOut) {
      setError("Check-out date is required");
      return false;
    }
    if (formData.guests < 1) {
      setError("Number of guests must be at least 1");
      return false;
    }
    if (formData.totalPrice <= 0) {
      setError("Total price must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/bookings", formData);

      if (response.data.success) {
        setSuccess(true);
        // Redirect to success page or show success message
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to submit booking");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to submit booking. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your booking has been successfully submitted.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name *
            </label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="guestEmail"
              value={formData.guestEmail}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="guestPhone"
            value={formData.guestPhone}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Booking Details */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Booking Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date *
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date *
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests *
            </label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price *
            </label>
            <input
              type="number"
              name="totalPrice"
              min="0"
              step="0.01"
              value={formData.totalPrice}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full py-3 px-4 rounded-md font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Confirm & Pay"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
