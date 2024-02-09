
export const getPlanetMinerals = async () =>
{
    const response = await fetch("http://localhost:8088/planetMinerals?_expand=planet&_expand=mineral")
    const planetMinerals = await response.json()
    return planetMinerals
}
