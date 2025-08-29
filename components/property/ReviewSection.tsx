import React, { useState, useEffect } from "react";
import axios from "axios";
import type { ReviewsResponse } from "@/interfaces";

interface ReviewSectionProps {
  propertyId: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  const displayedReviews = showAllReviews 
    ? reviews?.reviews || []
    : (reviews?.reviews || []).slice(0, 3);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No reviews yet</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to leave a review!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium text-gray-700">{reviews.averageRating}</span>
          <span className="text-gray-500 ml-1">({reviews.totalReviews} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-b-0"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{review.guestName}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-gray-700">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(review.date).toLocaleDateString()}</span>
              <span>{review.helpful} people found this helpful</span>
            </div>
          </div>
        ))}
      </div>

      {reviews.reviews.length > 3 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAllReviews
            ? "Show less"
            : `Show all ${reviews.totalReviews} reviews`}
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
