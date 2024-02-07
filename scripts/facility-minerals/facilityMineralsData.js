
export const getFacilityMinerals = async () =>
{
    const response = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMinerals = await response.json()
    return facilityMinerals
}