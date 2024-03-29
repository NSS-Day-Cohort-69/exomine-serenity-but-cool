import { getPlanetDropDownHTML } from "./dropDownPlanet.js"
import { getFacilityMineralsHTML } from "./facility-minerals/facilityMineralsComponent.js"
//import { getFacilityMinerals } from "./facility-minerals/facilityMineralsData.js"
import { getMineralCartHTML } from "./mineralCartComponent.js"
//import { addFacilityMineral, doTransaction, removeFacilityMineral } from "./transaction.js"

const render = async () =>
{
    const container = document.querySelector("#container")
    let html = ""
    html += await getPlanetDropDownHTML()
    html += await getMineralCartHTML()
    container.innerHTML = html
}

render()

document.addEventListener("domUpdated", render)