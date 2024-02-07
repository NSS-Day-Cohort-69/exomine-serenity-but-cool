import { getDropDownHTML } from "./dropDowns.js"

const render = async () =>
{
    const dropDownsHTML = await getDropDownHTML()
    const  dropdownsPlanetElement = document.querySelector(".dropdowns-planet")
    dropdownsPlanetElement.innerHTML = dropDownsHTML

}

render()
