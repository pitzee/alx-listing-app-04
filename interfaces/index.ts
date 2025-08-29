// Property address structure
export interface AddressProps {
  state: string;
  city: string;
  country: string;
}

// Property offers structure
export interface OffersProps {
  bed: string;
  shower: string;
  occupants: string;
}

// Main property interface
export interface PropertyProps {
  id?: number;
  name: string;
  address: AddressProps;
  rating: number;
  category: string[];
  price: number;
  offers: OffersProps;
  image: string;
  discount: string;
}

// Booking interface
export interface BookingRequest {
  propertyId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}

// Review interface
export interface Review {
  id: string;
  propertyId: number;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}
