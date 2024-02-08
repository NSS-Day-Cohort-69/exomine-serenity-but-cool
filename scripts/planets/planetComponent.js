import { getPlanets } from "./planetData.js"
import { getPlanetMineral } from "../transaction.js"
import { getMinerals } from "../mineralsData.js"
import { getPlanetMinerals } from "../planetMineralsData.js"

const planets = await getPlanets()
const minerals = await getMinerals()

export const getPlanetHtml = async () => {
    
    const planetMineral = getPlanetMineral()
    const planetMineralsData = await getPlanetMinerals()
    let planetsHtml = `<div class="planet">`
    for (const planet of planets) {
        if (planet.id == planetMineral.planetId) {
            planetsHtml += `<h2 class="planet--name">${planet.name} Minerals</h2>
                            <ul class="planet--mineralsDiv">`
            for (const planetMinerals of planetMineralsData) {
                if (planetMinerals.planetId == planet.id) {
                    for (const mineral of minerals) {
                        if (planetMinerals.mineralId == mineral.id) {
                            planetsHtml += `<li class="planet--mineral">${planetMinerals.mineralTons} tons ${mineral.name}</li>`
                        }
                    }
                }
            }
        }
    }

    

    planetsHtml += `</ul>
                </div>`
    return planetsHtml
}
