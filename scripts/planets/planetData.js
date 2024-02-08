
export const getPlanets = async () =>
{
    const response = await fetch("http://localhost:8088/planets")
    const planets = await response.json()
    return planets
}
