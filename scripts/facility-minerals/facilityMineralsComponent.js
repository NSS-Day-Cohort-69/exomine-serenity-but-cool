import { updateFacilityMineral } from "../transaction.js"
import { getFacilityMinerals } from "./facilityMineralsData.js"

let currentFacilityId = -1

const renderEvent = new CustomEvent("domUpdated")

export const getFacilityMineralsHTML = async () =>
{
    const facilityMinerals = await getFacilityMinerals()

    const facilityMineralsForFacility = facilityMinerals.filter(facilityMineral => facilityMineral.facilityId === currentFacilityId)

    //this is the structure of the HTML

/* 
<div class="facility-minerals">
    <h2 class="facility-minerals--header">Facility Minerals</h2>
    <div class="facility-minerals--mineralsDiv">
        <div class="facility-minerals--mineral">
            <input type="radio" id="iron" name="mineral" value="iron">
            <label for="iron">10 tons of Iron</label>
        </div>
        <div class="facility-minerals--mineral">
            <input type="radio" id="malybdenum" name="mineral" value="iron">
            <label for="malybdenum">16 tons of Malybdenum</label>
        </div>
    </div>
</div>
*/
    let returnHTML = `
<div class="facility-minerals">
    <h2 class="facility-minerals--header">Facility Minerals</h2>
    <div class="facility-minerals--mineralsDiv">`
    for (const facilityMineral of facilityMineralsForFacility) 
    {
        returnHTML += getFacilityMineralHTML(facilityMineral)
    }
    returnHTML += `
    </div>
</div>
    `

    return returnHTML
}

const getFacilityMineralHTML = (facilityMineral) =>
{
    return `
        <div class="facility-minerals--mineral">
            <input type="radio" name="mineral" data-type="mineral" data-facilityMineralId=${facilityMineral.id} id="${facilityMineral.mineral.name}" value="${facilityMineral.mineral.name}">
            <label for="${facilityMineral.mineral.name}">${facilityMineral.mineralTons} tons of ${facilityMineral.mineral.name}</label>
        </div>
    `
}

export const setCurrentFacility = (newFacilityId) =>
{
    currentFacilityId = newFacilityId
}

document.addEventListener( "mouseup",
    async (event) =>
    {
        const mineralElement = event.target
        if(mineralElement.dataset.type === "mineral")
        {
            const facilityMinerals = await getFacilityMinerals()

            const currentFacilityMineral = facilityMinerals.find(facilityMineral => facilityMineral.id == mineralElement.dataset.facilitymineralid)

            const currentMineral = currentFacilityMineral.mineral

            updateFacilityMineral(currentFacilityMineral) 

            document.dispatchEvent(renderEvent)
        }
    }
)