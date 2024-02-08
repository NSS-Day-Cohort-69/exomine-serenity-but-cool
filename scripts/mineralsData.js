
export const getMinerals = async () =>
{
    const response = await fetch("http://localhost:8088/minerals")
    const minerals = await response.json()
    return minerals
}
