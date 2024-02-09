import { getCurrentFacilityMinerals, addFacilityMineral, removeFacilityMineral } from "../transaction.js"
import { getFacilityMinerals } from "./facilityMineralsData.js"

let currentFacilityId = -1

const renderEvent = new CustomEvent("domUpdated")

export const getFacilityMineralsHTML = async () =>
{
    const facilityMinerals = await getFacilityMinerals()

    const currentFacilityMinerals = getCurrentFacilityMinerals()

    const facilityMineralsForFacility = facilityMinerals.filter(facilityMineral => facilityMineral.facilityId == currentFacilityId)

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
        const facilityMineralInCurrentFacilityMinerals = currentFacilityMinerals.find(curFacilityMineral => curFacilityMineral.id === facilityMineral.id) !== undefined
        returnHTML += getFacilityMineralHTML(facilityMineral, facilityMineralInCurrentFacilityMinerals)
    }
    returnHTML += `
    </div>
</div>
    `
    
    return returnHTML
}

const getFacilityMineralHTML = (facilityMineral, isSelected) =>
{
    if(isSelected)
    {
        return `
        <div class="facility-minerals--mineral">
            <input type="checkbox" name="mineral" data-type="mineral" data-facilityMineralId="${facilityMineral.id}" id="${facilityMineral.mineral.name}" value="${facilityMineral.mineral.name}" checked >
            <label>${facilityMineral.mineralTons} tons of ${facilityMineral.mineral.name}</label>
        </div>
    `
    } else
    {
        return `
        <div class="facility-minerals--mineral">
            <input type="checkbox" name="mineral" data-type="mineral" data-facilityMineralId="${facilityMineral.id}" id="${facilityMineral.mineral.name}" value="${facilityMineral.mineral.name}">
            <label>${facilityMineral.mineralTons} tons of ${facilityMineral.mineral.name}</label>
        </div>
    `
    }
    
}

export const setCurrentFacility = (newFacilityId) =>
{
    currentFacilityId = newFacilityId
}

export const getCurrentFacility = () =>
{
    return currentFacilityId
}

document.addEventListener( "change",
    async (event) =>
    {
        const mineralElement = event.target
        if(mineralElement.dataset.type === "mineral")
        {
            const facilityMinerals = await getFacilityMinerals()
            const thisFacilityMineral = facilityMinerals.find(facilityMineral => facilityMineral.id == mineralElement.dataset.facilitymineralid)
            if(mineralElement.checked)
            {
                addFacilityMineral(thisFacilityMineral)
            } else
            { 
                removeFacilityMineral(thisFacilityMineral.id)
            }
            document.dispatchEvent(renderEvent)
        }
    }
)