const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
    })
}

const getCurrentLocation = async () => {
    const position = await getPosition()
    return position
}

export default getCurrentLocation
