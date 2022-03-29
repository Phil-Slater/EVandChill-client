import React from "react";
import { getStationDetails } from "../../util/axiosConfig";

const InfoBox = ({ station }) => {
    const {
        AccessComments: comments,
        AddressLine1: address1,
        AddressLine2: address2,
        ContactEmail: email,
        ContactTelephone1: phone,
        Postcode: zip,
        Town: city,
        StateOrProvince: state,
        Title: title,
    } = station.AddressInfo;
    const { Connections: connections } = station;
    let connectionInfo = "No connection info available";
    if (connections && connections.length > 0) {
        const connectionsItems = connections.map((connection) => (
            <li key={connection.ID}>{connection.ConnectionType.FormalName}</li>
        ));
        connectionInfo = <ul>{connectionsItems}</ul>;
    }
    const contactInfo =
        email || phone ? (
            <>
                {phone && (
                    <p>
                        <b>Phone:</b> {phone}
                    </p>
                )}
                {email && (
                    <p>
                        <b>Email:</b> {email}
                    </p>
                )}
            </>
        ) : (
            "No Contact Information available"
        );


    const handleDetailsButtonClick = async (stationId) => {
        console.log('clicked!')
        await getStationDetails(stationId)
        // navigate to details page
    }

    return (
        <div id="content">
            <div id="siteNotice"></div>
            <h1 id="firstHeading" className="firstHeading">
                {title}
            </h1>
            <div id="bodyContent">
                <p>{address1}</p>
                {address2 && <p>{address2}</p>}
                <p>
                    {city}, {state} {zip}
                </p>
                <h3>Connection Info</h3>
                {connectionInfo}
                <h3>Contact Info</h3>
                {contactInfo}
                <h3>Comments</h3>
                <p>{comments}</p>
                {/* <button onClick={() => handleDetailsButtonClick(station.ID)}> */}
                <a href={`/station/${station.ID}`}>View All Details</a>
                {/* </button> */}
            </div>
        </div>
    );
};

export default InfoBox;
