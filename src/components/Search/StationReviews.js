<div>
  <h3>Reviews:</h3>
  {station.reviews.map((review) => (
    <div>
      <h4> {review.rating}</h4>
      <p>{review.review}</p>
      <p>{review.isWorking}</p>
    </div>
  ))}
</div>;
