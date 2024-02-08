import { getFacilitiesHTML } from "./facilities/facilities.js"
import { getFacilityMineralsHTML } from "./facility-minerals/facilityMineralsComponent.js"
import { getFacilityMinerals } from "./facility-minerals/facilityMineralsData.js"
import { getGovernorsHTML } from "./governors/governorComponent.js"
import { getSpaceCartHTML } from "./spaceCart/spaceCartComponent.js"
import { getDropDownHTML } from "./dropDowns.js"
import { doTransaction, updateFacilityMineral, updatePlanetMineral } from "./transaction.js"
import { getPlanetMineralData } from "./planetMineralData.js"

const render = async () =>
{
    //this is for drop downs test
    
    const dropDownsHTML = await getDropDownHTML()
    const dropdownsPlanetElement = document.querySelector(".dropdowns-planet")
    dropdownsPlanetElement.innerHTML = dropDownsHTML
    

    
    const dropdowns = document.querySelector(`.dropdowns`)

    const governorsHTML = await getGovernorsHTML()
    dropdowns.innerHTML = governorsHTML
    

    
    //this is to test facilities HTML
    
    
    const facilitiesHTML = await getFacilitiesHTML()
    const dropdownElement = document.querySelector(".dropdowns")
    dropdownElement.innerHTML += facilitiesHTML  
    

    const spaceCartContainer = document.querySelector(".minerals-cart")
    const spaceCartHTML = await getSpaceCartHTML()
    spaceCartContainer.innerHTML = spaceCartHTML
    //this is to test facility minerals

    
    const facilityMineralElement = document.querySelector(`.minerals-cart`)
    const spaceCart = facilityMineralElement.innerHTML
    const facilityMineralsHTML = await getFacilityMineralsHTML()
    facilityMineralElement.innerHTML = facilityMineralsHTML
    facilityMineralElement.innerHTML += spaceCart
    

    
    // updateFacilityMineral({ id: 1, facilityId: 1, mineralId: 1, mineralTons: 100 })
    // updatePlanetMineral({ id: 1, planetId: 1, mineralId: 1, mineralTons: 500 })
    // doTransaction()
    
}

render()

document.addEventListener("domUpdated", render)

//testing getPlanetMineralData : 
//console.log(await getPlanetMineralData())
