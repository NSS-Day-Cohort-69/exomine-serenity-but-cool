
/// get current facility mineral 

// import transaction module 
// 
// a function with an if statement that invokes a function that renders the facility mineral if it is not undefined 

import { getFacilityMineral, getPlanet } from "./transaction.js"



export const getSpaceCartHTML = async () => {
    const facilityMineral = getFacilityMineral()
    const currentPlanet = getPlanet()

    let spaceCartHTML = `<div class="space-cart">
     <h3 class="space-cart--header">Space Cart</h3>`
    if (facilityMineral != null) {
        spaceCartHTML += `<p> 1 ton of ${facilityMineral} from ${currentPlanet}</p>`
        // spaceCartMineralHTML()
    }

    spaceCartHTML += `<button class="space-cart--button">Purchase Mineral</button>
     </div>
     `
}




