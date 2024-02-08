import { getDropDownHTML } from "./dropDowns.js"
import { getPlanetHTML } from "../planets/planetComponent.js"

export const getPlanetDropDownHTML = async () => {
    const dropdownHTML = await getDropDownHTML()
    const planetHTML = await getPlanetHTML()
   
    const planetDropDownHTML = `<div class="dropdowns-planet">
                            ${dropdownHTML}
                            ${planetHTML}
                         </div>`
    return planetDropDownHTML
}

