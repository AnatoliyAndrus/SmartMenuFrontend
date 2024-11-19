import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getAllReviews } from "../../services/reviews-service";

export default function AdminReviews() {

  const [reviews, setReviews] = useState([]);

  const fetchData = () => getAllReviews().then(response=>setReviews(response.data));

  useEffect(() => {
    fetchData();
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
                  <p className="card-text">
                    {review.comment}
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