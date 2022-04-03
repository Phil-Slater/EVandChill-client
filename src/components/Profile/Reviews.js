import React from "react";
import StarRatingComponent from "react-star-rating-component";
import store from "../../store/store";
import { removeReview } from "../../util/axiosConfig";
import { addError } from "../../store/actions/actionCreators";
import { useSelector } from "react-redux";
import "./Profile.css";

const Reviews = ({ reviews = [], context }) => {
    const user = useSelector((state) => state.auth.user);

    const handleRemoveReview = async (reviewId, userId, stationId) => {
        try {
            const response = await removeReview({
                reviewId,
                userId,
                stationId,
            });

            if (response) {
                console.log("Deleted Review");
            }
        } catch {
            store.dispatch(addError("Unable to delete review"));
        }
    };

    return reviews.length > 0 ? (
      <div className="review-map-container">
          <h3>Reviews:</h3>
    
        {reviews.map((review) => (
          <div key={review._id} className= "reviews-container">
            {context === "profile" ? (
              <h4>Station Id: {review.stationId}</h4>
            ) : null}
            {review.rating ? (
              <StarRatingComponent
                name="rate2"
                renderStarIcon={() => (
                  <span style={{ fontSize: "2em", fontWeight: "bold" }}>ϟ</span>
                )}
                editing={false}
                starCount={5}
                value={review.rating}
              />
            ) : (
              <p>Ratings Not Available</p>
            )}
            <p>{review.review}</p>
            <p>{review.isWorking}</p>
            {context === "profile" && (
              <button className="delete-button"
                onClick={() =>
                  handleRemoveReview(review._id, user.id, review.stationId)
                }
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    ) : (
      <h3>No reviews available</h3>
      
    );
};


export default Reviews;
