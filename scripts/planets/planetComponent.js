import { getPlanets } from "./planetData.js"
import { getPlanetMineral } from "../transaction.js"
import { getMinerals } from "../mineralsData.js"
import { getPlanetMinerals } from "../planetMineralsData.js"

const planets = await getPlanets()
const minerals = await getMinerals()

export const getPlanetHtml = async () => {
    const planetMineral = getPlanetMineral()
    let planetsHtml = `<div class="planet">`
    if (planetMineral !== null) {
        const planetMineralsData = await getPlanetMinerals()

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
                planetsHtml += `</ul>`
            }
        }
    } else {
        // Handle the case when planetMineral is null.
        planetsHtml += `<h2>Colony Minerals</h2>`
    }



    planetsHtml += `</div>`

    return planetsHtml

}


