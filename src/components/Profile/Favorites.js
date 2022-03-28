import React from "react";
import {useSelector} from "react-redux"
import { handleDeleteFavorite } from "../../util/axiosConfig";


function Favorites() {
    const user = useSelector((state) => state.auth.user);
    
    const handleRemove = async (userId, favoriteId) => {

      handleDeleteFavorite(userId, favoriteId);
    }

  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {user.favorites.map((favorite) => (
        <li key={favorite._id}>{
            favorite.stationId}
            <button onClick={()=>handleRemove(user._id,favorite._id)}>Remove</button> 
            </li>
      ))}
    </div>
  );
};

export default Favorites;
