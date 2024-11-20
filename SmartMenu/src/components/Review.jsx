import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, } from "react-router-dom";
import { addReview } from "../services/reviews-service";

export default function Review({table}){
    const navigation = useNavigate();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    const review = {
      rating,
      comment,
      tableId: table
    };

    addReview(review).then(() => navigation("/client/menu"))
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Payment approved. Would you like to leave review?</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <div className="d-flex justify-content-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className="star"
                size={30}
                color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            id="comment"
            className="form-control"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
    </div>
  );
};