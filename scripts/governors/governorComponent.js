import { updatePlanet } from "../transaction.js"
import { getGovernors } from "./governorData.js"

export const getGovernorsHTML = async () =>
{
    const governors = await getGovernors()

    const filteredGovernors = governors.filter(governor => governor.active === true)

    let returnHTML = `
    <div class="governor">
        <label class="governor--label">Choose a governor</label>
        <select name="governor--names" data-type="governor" class="governor--select">
    `

    for (const governor of filteredGovernors) 
    {
        returnHTML += `
            <option class="governor--option" value="${governor.planetId}">${governor.name}</option>`
    }
    returnHTML += `
        </select>
    </div>`

    return returnHTML
}

document.addEventListener
(
    "change",
    (event) =>
    {
        const governorElement = event.target
        if(governorElement.dataset.type === "governor")
        {
            debugger
            //const planets = getPlanets()
            const planets = [
                {
                  "id": 1,
                  "name": "Laughalotia"
                },
                {
                  "id": 2,
                  "name": "Jokelandia"
                },
                {
                  "id": 3,
                  "name": "GiggleSphere"
                },
                {
                  "id": 4,
                  "name": "Smiletopia"
                },
                {
                  "id": 5,
                  "name": "Chuckleville"
                },
                {
                  "id": 6,
                  "name": "Snickerland"
                }
            ]

            const thisPlanet = planets.find(planet => planet.id == governorElement.value)

            updatePlanet(thisPlanet)
        }
        
    }
)