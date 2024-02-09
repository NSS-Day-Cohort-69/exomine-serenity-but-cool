import { getPlanets } from "../planets/planetData.js"
import { getPlanet, updatePlanet } from "../transaction.js"
import { getGovernors } from "./governorData.js"

const renderEvent = new CustomEvent("domUpdated")

export const getGovernorsHTML = async () =>
{
    const governors = await getGovernors()

    const filteredGovernors = governors.filter(governor => governor.active === true)

    let returnHTML = `
    <div class="governor">
        <label class="governor--label">Choose a governor</label>
        <select name="governor--names" data-type="governor" class="governor--select">
    `

    const planet = await getPlanet()
    let currentGovernor
    if(planet !== null)
    {
        currentGovernor = filteredGovernors.find(governor => governor.planetId === planet.id)
    } else
    {
        returnHTML += `<option value="none" selected disabled hidden>Select an Option</option>`
    }
    
    for (const governor of filteredGovernors) 
    {
        if(currentGovernor !== undefined && governor.id === currentGovernor.id)
        {
            returnHTML += `
            <option class="governor--option" value="${governor.planetId}" selected >${governor.name}</option>`    
        } else {
            returnHTML += `
            <option class="governor--option" value="${governor.planetId}">${governor.name}</option>`    
        }

    }

    returnHTML += `
        </select>
    </div>`

    return returnHTML
}

document.addEventListener
(
    "change",
    async (event) =>
    {
        const governorElement = event.target
        if(governorElement.dataset.type === "governor")
        {
            const planets = await getPlanets()

            const thisPlanet = planets.find(planet => planet.id == governorElement.value)

            await updatePlanet(thisPlanet)

            document.dispatchEvent(renderEvent)
        }
        
    }
)