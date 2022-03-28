export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lng2 - lng1) * p)) / 2;

    const km = 12742 * Math.asin(Math.sqrt(a));
    const miles = (km * 0.621371).toFixed(2);
    return miles;
}
