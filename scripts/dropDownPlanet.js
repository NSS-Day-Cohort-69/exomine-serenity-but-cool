import { getDropDownHTML } from "./dropDowns.js"
import { getPlanetHTML } from "../planets/planetComponent.js"

export const getPlanetDropDownHTML = async () => {
    const dropdownHTML = await getDropDownHTML()
    const planetHTML = await getFacilitiesHTML()
    const planetDropDownHTML = `<div class="dropdownsPlanet">
                            ${dropdownHTML}
                            ${planetHTML}
                         </div>`
    return planetDropDownHTML
}

