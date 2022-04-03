
const InfoBox = (station, index) => {
  const {
    operatingHours,
    address,
    cityStateZip,
    supportEmail,
    supportContact,
    name,
    plugTypes,
  } = station;

  let connectionInfo = "No connection info available";
  if (plugTypes && plugTypes.length > 0) {
    const connectionsItems = plugTypes.map(
      (connection) => `<li key="${connection.speed}">${connection.type}</li>`
    );
    connectionInfo = `<ul>${connectionsItems.join("")}</ul>`;
  }
  let contactInfo = "No Contact Information available";
  if (supportEmail || supportContact) {
    const info = [];
    if (supportContact) info.push(`<p><b>Phone:</b> ${supportContact}<p>`);
    if (supportEmail) info.push(`<p><b>Email:</b> ${supportEmail}<p>`);
    contactInfo = info.join("");
  }

  const hoursInfo = operatingHours
    ? `<p>${operatingHours}</p>`
    : "No information available";
  return `<div id="content">
            <h1 id="firstHeading" className="firstHeading">
                ${name}
            </h1>
            <div id="bodyContent">
                <p>${address}</p>
                <p>
                    ${cityStateZip}
                </p>
                <h3>Connection Info</h3>
                ${connectionInfo}
                <h3>Contact Info</h3>
                ${contactInfo}
                <h3>Operating Hours</h3>                
                ${hoursInfo}
                <button class = "details-button" onclick="new BroadcastChannel('google').postMessage(${index})">View Details</button>
            </div>
        </div>`;
};

export default InfoBox;
