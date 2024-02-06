
export const getGovernors = async () =>
{
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()
    return governors
}