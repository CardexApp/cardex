import { useState } from "react";
import axios from "axios";
import "./RatingsAndReviews.css"
import { toast } from "react-toastify";

const RatingsAndReviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "/api/review",
        {
          product_id: productId,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => toast.success("Review submitted"))
      .catch(() => toast.error("Failed to submit review"));
  };

  return (
    <div className="ratingsSection">
      <h3>Rate & Review This Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>Select</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default RatingsAndReviews;
