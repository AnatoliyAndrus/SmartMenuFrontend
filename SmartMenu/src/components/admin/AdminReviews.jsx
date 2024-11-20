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
                  <h5 className="card-title"><b>Review ID:</b> {review.reviewId}</h5>
                  <p className="card-text">
                    <b>Rating:</b> {renderStars(review.rating)}
                  </p>
                  <p className="card-text">
                    <b>Review Time:</b>{" "}
                    {new Date(review.reviewTime).toLocaleString()}
                  </p>
                  <p className="card-text">
                    <b>Waiter:</b>{review.waiterName}
                  </p>
                  <p className="card-text">
                    <b>Comment: </b>{review.comment}
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