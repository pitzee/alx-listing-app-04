import type { NextApiRequest, NextApiResponse } from "next";

interface Review {
  id: string;
  propertyId: number;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

// Mock reviews data
const generateMockReviews = (propertyId: number): Review[] => {
  const guestNames = [
    "Sarah Johnson",
    "Michael Chen",
    "Emma Davis",
    "David Wilson",
    "Lisa Brown",
    "James Miller",
    "Anna Garcia",
    "Robert Taylor",
    "Maria Rodriguez",
    "John Anderson",
  ];

  const comments = [
    "Absolutely amazing stay! The property exceeded all our expectations.",
    "Great location and beautiful views. Highly recommend!",
    "Clean, comfortable, and well-maintained. Perfect for our family vacation.",
    "The host was very responsive and helpful throughout our stay.",
    "Stunning property with all the amenities we needed.",
    "Peaceful and quiet location, perfect for relaxation.",
    "Modern amenities and excellent service. Will definitely return!",
    "The property was exactly as described. Very satisfied with our choice.",
    "Beautiful interior design and comfortable furnishings.",
    "Excellent value for money. Highly recommend this property.",
  ];

  const reviews: Review[] = [];
  const numReviews = Math.floor(Math.random() * 8) + 3; // 3-10 reviews

  for (let i = 0; i < numReviews; i++) {
    reviews.push({
      id: `review_${propertyId}_${i}`,
      propertyId,
      guestName: guestNames[Math.floor(Math.random() * guestNames.length)],
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Random date within last 90 days
      helpful: Math.floor(Math.random() * 20),
    });
  }

  return reviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewsResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const propertyId = parseInt(id as string);

  if (isNaN(propertyId) || propertyId < 0) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  // Simulate API delay
  setTimeout(() => {
    const reviews = generateMockReviews(propertyId);
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    res.status(200).json({
      reviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length,
    });
  }, 400);
}
