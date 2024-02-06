import { getGovernors } from "./governorData.js"

export const getGovernorsHTML = async () =>
{
    const governors = await getGovernors()

    let returnHTML = `
    <div class="governor">
        <label for="governor--names" class="governor--label">Choose a governor</label>
        <select name="governor--names" class="governor--select">
    `

    for (const governor of governors) 
    {
        returnHTML += `
            <option class="governor--option" value="${governor.id}">${governor.name}</option>`
    }
    returnHTML += `
        </select>
    </div>`

    return returnHTML
}