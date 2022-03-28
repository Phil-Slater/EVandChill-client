import React, {useEffect} from "react";
import {useSelector} from "react-redux"
import { getFavorites, handleDeleteFavorite } from "../../util/axiosConfig";



function Favorites() {
    const user = useSelector((state) => state.auth.user);
    useEffect(() => getFavorites(user), [])
   

    const handleRemove = async (userId, favoriteId) => {

      handleDeleteFavorite(userId, favoriteId);
    }

  return (
    <div className="favorites">
      <h3>Favorites</h3>
      <ul>
      {user.favorites.map((favorites) => (
        <li key={favorites._id}>{
            favorites.stationId}
            <button onClick={()=>handleRemove(user.id,favorites._id)}>Remove</button> 
            </li>
      ))}
      </ul>
    </div>
  );
};

export default Favorites;
