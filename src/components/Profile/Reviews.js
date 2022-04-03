import React, {useState, useEffect} from "react";
import StarRatingComponent from "react-star-rating-component";

const Reviews = ({reviews = []}) => {
    
    useEffect(() => {
            console.log(reviews)
    }, [reviews])

  return reviews.length > 0 ? (
    <div>
      <h3>Reviews:</h3>

      {reviews.map((review) => (
        <div>
          {review.rating ? (
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={review.rating}
            />
          ) : (
            <p>Ratings Not Available</p>
          )}
          <p>{review.review}</p>
          <p>{review.isWorking}</p>
        </div>
      ))}
    </div>
  ) : (
    <h3>No reviews available</h3>
  );
};

export default Reviews;
