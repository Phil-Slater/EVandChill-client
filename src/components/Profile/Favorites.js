import React, {useState, useEffect} from "react";
import axios from "axios";


function Favorites() {
    const [favorites, setFavorites] = useState([])

    useEffect(()=> {
        getFavorites()
    }, [])

    const username = localStorage.getItem('username')
    const getFavorites = async() => {
        try{
            const response = await axios.get(`/profile/${username}/my-favorites`)
            if(response){
                setFavorites(response.data.favorites)
            }
        }catch(error) {
           console.log(error) 
        }
    }

    const handleRemove = async (id) => {
        const response = await axios.delete(`/user/favorites`,{
            data:{favoriteId:id}
        })
        if(response){
            
        }
    }
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {favorites.map((favorite) => (
        <li key={favorite._id}>{
            favorite.stationId}
            <button onClick={handleRemove(favorite._id)}>Remove</button> </li>
      ))}
    </div>
  );
};

export default Favorites;
