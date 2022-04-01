import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFavorites, handleDeleteFavorite } from "../../util/axiosConfig";
import { NavLink } from 'react-router-dom'

function Favorites() {
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        getFavorites(user)
    }, [])

    const handleRemove = async (userId, favoriteId) => {
        handleDeleteFavorite(userId, favoriteId);
    };

    const favoritesMap = user.favorites.map(favorite => {
        return <div key={favorite._id}>
            <NavLink to={`/station/${favorite.stationId}`}><p>{favorite.title}</p></NavLink>
            <p>{favorite.address}</p>
            <button
                onClick={() => handleRemove(user._id, favorite._id)}
                className="profile-review-update">
                Remove
            </button>
        </div>
    })

    return (
        <div className="favorites">
            <h3>Favorites</h3>
            {favoritesMap}
        </div >
    );
}

export default Favorites;
