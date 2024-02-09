import { getPlanets } from "../planets/planetData.js"
import { updatePlanet } from "../transaction.js"
import { getGovernors } from "./governorData.js"

const renderEvent = new CustomEvent("domUpdated")
let currentGovernor = null

export const getGovernorsHTML = async () =>
{
    const governors = await getGovernors()

    const filteredGovernors = governors.filter(governor => governor.active === true)

    let returnHTML = `
    <div class="governor">
        <label class="governor--label">Choose a governor</label>
        <select name="governor--names" data-type="governor" class="governor--select">
    `

    if(currentGovernor === null)
    {
        returnHTML += `<option value="none" selected disabled hidden>Select an Option</option>`
    }
    
    for (const governor of filteredGovernors) 
    {
        if(currentGovernor !== undefined && currentGovernor !== null && governor.id === currentGovernor.id)
        {
            returnHTML += `
            <option class="governor--option" value="${governor.id}" selected >${governor.name}</option>`    
        } else {
            returnHTML += `
            <option class="governor--option" value="${governor.id}">${governor.name}</option>`    
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
            const governors = await getGovernors()
            const thisGovernor = governors.find(governor => governor.id == governorElement.value)
            currentGovernor = thisGovernor

            const planets = await getPlanets()
            
            const thisPlanet = planets.find(planet => planet.id === thisGovernor.planetId)

            await updatePlanet(thisPlanet)

            document.dispatchEvent(renderEvent)
        }
        
    }
)