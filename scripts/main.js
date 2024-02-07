import { getFacilitiesHTML } from "./facilities/facilities.js"
import { getFacilityMineralsHTML } from "./facility-minerals/facilityMineralsComponent.js"
import { getFacilityMinerals } from "./facility-minerals/facilityMineralsData.js"
import { getGovernorsHTML } from "./governors/governorComponent.js"
import { getDropDownHTML } from "./dropDowns.js"

const render = async () =>
{
    //this is for drop downs test
    /*
    const dropDownsHTML = await getDropDownHTML()
    const dropdownsPlanetElement = document.querySelector(".dropdowns-planet")
    dropdownsPlanetElement.innerHTML = dropDownsHTML
    */

    /*
    const dropdowns = document.querySelector(`.dropdowns`)

    const governorsHTML = await getGovernorsHTML()
    dropdowns.innerHTML += governorsHTML
    */

    
    //this is to test facilities HTML
    
    /*
    const facilitiesHTML = await getFacilitiesHTML()
    const dropdownElement = document.querySelector(".dropdowns")
    dropdownElement.innerHTML = facilitiesHTML  
    */

    //this is to test facility minerals

    /*
    const facilityMineralElement = document.querySelector(`.minerals-cart`)
    const spaceCart = facilityMineralElement.innerHTML
    const facilityMineralsHTML = await getFacilityMineralsHTML()
    facilityMineralElement.innerHTML = facilityMineralsHTML
    facilityMineralElement.innerHTML += spaceCart
    */
}

render()
