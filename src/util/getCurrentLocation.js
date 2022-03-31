const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
};

const getCurrentLocation = async () => {
    let position = JSON.parse(localStorage.getItem("position"));
    if (!position || Date.now() - position.timestamp > 1800000) {
        position = await getPosition();
        const { timestamp } = position;
        const { latitude, longitude } = position.coords;
        localStorage.setItem(
            "position",
            JSON.stringify({ coords: { latitude, longitude }, timestamp })
        );
    }
    return position;
};

export default getCurrentLocation;
