import axios from "axios";
import type {
  PropertyProps,
  BookingRequest,
  BookingResponse,
  ReviewsResponse,
} from "@/interfaces";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Properties API
export const propertiesAPI = {
  // Get all properties
  getAll: async (): Promise<PropertyProps[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/properties`);
    return response.data;
  },

  // Get single property by ID
  getById: async (id: number): Promise<PropertyProps> => {
    const response = await axios.get(`${API_BASE_URL}/api/properties/${id}`);
    return response.data;
  },

  // Get property reviews
  getReviews: async (id: number): Promise<ReviewsResponse> => {
    const response = await axios.get(
      `${API_BASE_URL}/api/properties/${id}/reviews`
    );
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  // Submit a new booking
  create: async (bookingData: BookingRequest): Promise<BookingResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}/api/bookings`,
      bookingData
    );
    return response.data;
  },
};

// Example usage functions
export const apiExamples = {
  // Example: Fetch all properties
  fetchAllProperties: async () => {
    try {
      const properties = await propertiesAPI.getAll();
      console.log("All properties:", properties);
      return properties;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  },

  // Example: Fetch single property with reviews
  fetchPropertyDetails: async (propertyId: number) => {
    try {
      const [property, reviews] = await Promise.all([
        propertiesAPI.getById(propertyId),
        propertiesAPI.getReviews(propertyId),
      ]);

      console.log("Property details:", property);
      console.log("Property reviews:", reviews);

      return { property, reviews };
    } catch (error) {
      console.error("Error fetching property details:", error);
      throw error;
    }
  },

  // Example: Submit a booking
  submitBooking: async (bookingData: BookingRequest) => {
    try {
      const result = await bookingsAPI.create(bookingData);
      console.log("Booking result:", result);
      return result;
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error;
    }
  },
};
