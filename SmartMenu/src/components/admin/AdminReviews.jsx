import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function AdminReviews() {
  // Mock data
  const mockReviews = [
    {
      reviewId: 1,
      rating: 5,
      reviewTime: "2024-11-18T12:34:56",
    },
    {
      reviewId: 2,
      rating: 3,
      reviewTime: "2024-11-18T13:45:00",
    },
    {
      reviewId: 3,
      rating: 4,
      reviewTime: "2024-11-18T14:15:30",
    },
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const renderStars = (rating) => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, index) => {
      if (index < rating) {
        return <FaStar key={index} className="text-warning" />;
      } else {
        return <FaRegStar key={index} className="text-warning" />;
      }
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Customer Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-center">No reviews available.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div className="col-md-4 mb-4" key={review.reviewId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review ID: {review.reviewId}</h5>
                  <p className="card-text">
                    Rating: {renderStars(review.rating)}
                  </p>
                  <p className="card-text">
                    Review Time:{" "}
                    {new Date(review.reviewTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};