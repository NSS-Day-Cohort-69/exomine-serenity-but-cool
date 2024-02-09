import { getPlanetDropDownHTML } from "./dropDownPlanet.js"
import { getMineralCartHTML } from "./mineralCartComponent.js"

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