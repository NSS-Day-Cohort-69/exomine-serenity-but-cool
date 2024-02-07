import { getFacilitiesHTML } from "./facilities/facilities.js"
import { getGovernorsHTML } from "./governors/governorComponent.js"

export const getDropDownHTML = async () => {
    const governorsHTML = await getGovernorsHTML()
    const facilitiesHTML = await getFacilitiesHTML()
    const dropDownsHTML = `<div class="dropdowns">
                            ${governorsHTML}
                            ${facilitiesHTML}
                         </div>`
    return dropDownsHTML
}