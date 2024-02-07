import { getFacilitiesHTML } from "./facilities/facilities.js"
import { getGovernorsHTML } from "./governors/governorComponent.js"

export const getDropDownHTML = async () => {

    const dropdownElement = document.querySelector(".dropdowns")
    const governorsHTML = await getGovernorsHTML()
    const facilitiesHTML = await getFacilitiesHTML()
    dropdownElement.innerHTML = governorsHTML + facilitiesHTML  
  
}