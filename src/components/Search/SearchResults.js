import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = (props) => {

    const [stations, setStations] = useState([])

    useEffect(() => {
        getStations(props.params)
    }, [])

    const getStations = (searchParams) => {
        try {
            const response = await axios.post('/station/stations', { searchBox: searchParams })
        } catch (error) {
            console.log(error)
        }
    }
}

export default SearchResults
