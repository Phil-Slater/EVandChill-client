import React from "react";
import StarRatingComponent from "react-star-rating-component";

const NearbyBusiness = ({ category, title, businesses }) => {
    const getDollarSigns = (level) => {
        let dollarSigns = " ";
        for (let i = 1; i <= level; i++) {
            dollarSigns += "$";
        }
        return dollarSigns;
    };

    const openBusinessLink = (business) => {
        const { id } = business;
        const { lat, lng } = business.geometry.location;
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${id}`
        );
    };

    let businessContainer = <p>No nearby results</p>;

    if (businesses.length > 0) {
        const businessItems = businesses.map((business) => (
            <div
                className="business-details-container"
                key={business.place_id}
                onClick={() => openBusinessLink(business)}
            >
                <h4>{business.name}</h4>
                {business.price_level ? (
                    <p>
                        Price level:
                        {getDollarSigns(business.price_level)}
                    </p>
                ) : (
                    <p>Price Level Not Available</p>
                )}
                {business.rating ? (
                    <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={5}
                        value={business.rating}
                    />
                ) : (
                    <p>Ratings Not Available</p>
                )}
            </div>
        ));

        businessContainer = (
            <div className="business-container">{businessItems}</div>
        );
    }

    return (
        <div className={category}>
            <h2>{title}</h2>
            {businessContainer}
        </div>
    );
};

export default NearbyBusiness;
