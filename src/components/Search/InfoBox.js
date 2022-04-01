const InfoBox = (station, index) => {
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
        const connectionsItems = connections.map(
            (connection) =>
                `<li key="${connection.ID}">${connection.ConnectionType.FormalName}</li>`
        );
        connectionInfo = `<ul>${connectionsItems.join("")}</ul>`;
    }
    let contactInfo = "No Contact Information available";
    if (email || phone) {
        const info = [];
        if (phone) info.push(`<p><b>Phone:</b> ${phone}<p>`);
        if (email) info.push(`<p><b>Email:</b> ${email}<p>`);
        contactInfo = info.join("");
    }

    const address2Info = address2 ? `<p>${address2}</p>` : "";
    const commentsInfo = comments ? `<p>${comments}</p>` : "";
    return `<div id="content">
            <h1 id="firstHeading" className="firstHeading">
                ${title}
            </h1>
            <div id="bodyContent">
                <p>${address1}</p>
                ${address2Info}
                <p>
                    ${city}, ${state} ${zip}
                </p>
                <h3>Connection Info</h3>
                ${connectionInfo}
                <h3>Contact Info</h3>
                ${contactInfo}
                <h3>Comments</h3>                
                ${commentsInfo}
                <button onclick="new BroadcastChannel('google').postMessage(${index})">View Details</button>
            </div>
        </div>`;
};

export default InfoBox;
