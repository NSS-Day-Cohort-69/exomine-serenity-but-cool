
export const getFacilities = async () =>
{
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()
    return facilities
}
