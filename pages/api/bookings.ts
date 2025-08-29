import type { NextApiRequest, NextApiResponse } from "next";

interface BookingRequest {
  propertyId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
}

interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const bookingData: BookingRequest = req.body;

    // Validate required fields
    if (
      !bookingData.propertyId ||
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.guests ||
      !bookingData.totalPrice ||
      !bookingData.guestName ||
      !bookingData.guestEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Simulate API delay
    setTimeout(() => {
      // Generate a random booking ID
      const bookingId = `BK${Date.now()}${Math.random()
        .toString(36)
        .substr(2, 5)
        .toUpperCase()}`;

      // In a real application, you would save this to a database
      console.log("New booking received:", { ...bookingData, bookingId });

      res.status(201).json({
        success: true,
        bookingId,
        message: "Booking created successfully",
      });
    }, 500);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
