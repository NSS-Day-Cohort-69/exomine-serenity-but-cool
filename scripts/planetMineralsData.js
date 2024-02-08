
export const getPlanetMinerals = async () =>
{
    const response = await fetch("http://localhost:8088/planetMinerals")
    const planetMinerals = await response.json()
    return planetMinerals
}
