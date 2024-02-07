import { getPlanets } from "./planetData.js"
import { getPlanetMineral } from "../transaction.js"
import { getMinerals } from "../minerals/mineralsData.js"
const planets = getPlanets()
const minerals = getMinerals()
export const getPlanetHtml = () => {
    
    const planetMineral = getPlanetMineral()
    let planetsHtml = `<div class="planet">`
    for (const planet of planets) {
        if (planet.id == planetMineral.planetId) {
            planetsHtml += `<h2 class="planet--name">${planet.name} Minerals</h2>
                            <ul class="planet--mineralsDiv">
                            <li class="planet--mineral">${planetMineral.mineralTons}`
        }
    }
    for (const mineral of minerals) {
        if (planetMineral.mineralId == mineral.id){
            planetsHtml += `tons ${minerakl.name}</span>`
        }
    }
    planetsHtml += `tons ${planetMineral.name}</span>`



    planetsHtml += `</ul>
                </div>`
    return planetsHtml
}