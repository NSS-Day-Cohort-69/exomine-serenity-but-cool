
/// get current facility mineral 

// import transaction module 
// 
// a function with an if statement that invokes a function that renders the facility mineral if it is not undefined 

//import { getFacilityMineral, getPlanet } from "./transaction.js"

export const getSpaceCartHTML = async () => {
    //const facilityMineral = getFacilityMineral()
    //const currentPlanet = getPlanet()

    //get facilityMinerals
    //get planets

    //get current facilityMineralId from transaction
    //get current planet from transaction

    //find facilityMineral instance in facilityMinerals
    //find planet instance in planets

    const facilityMineral = { id: 1, facilityId: 1, mineralId: 1, mineralTons: 100, mineral: {id: 1, name: "Gigglium"} }
    const currentPlanet = { id: 1, name: "Laughalotia" }

    let spaceCartHTML = `<div class="space-cart">
     <h3 class="space-cart--header">Space Cart</h3>`
    if (facilityMineral != null) {
        spaceCartHTML += `<p> 1 ton of ${facilityMineral.mineral.name} from ${currentPlanet.name}</p>`
        // spaceCartMineralHTML()
    }

    spaceCartHTML += `<button class="space-cart--button">Purchase Mineral</button>
    </div>
    `

    return spaceCartHTML
}
