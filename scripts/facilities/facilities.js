import { getCurrentFacility, setCurrentFacility } from "../facility-minerals/facilityMineralsComponent.js"
import { getFacilities } from "./facilitiesData.js"

const renderEvent = new CustomEvent("domUpdated")

const facilities = getFacilities()

export const getFacilitiesHTML = async  ()  => {
    const facilities = await getFacilities()

    const filteredFacilities = facilities.filter(facility => facility.active)

    const currentFacility = getCurrentFacility()

    let facilitiesString = `
        <div class="facilities">
            <label class="facility-label">Choose a facility</label>
            <select name="facility-names" data-type="facility" class="facilities--facilities-dropdown">`

    if(currentFacility === -1)
    {
        facilitiesString += `<option value="none" selected disabled hidden>Select an Option</option>`
    }

    for (const facility of filteredFacilities) {
        if(currentFacility !== null && facility.id == currentFacility)
        {
            facilitiesString += `<option value="${facility.id}" class="facilities--option" selected >
                            ${facility.name}</option>`
        } else 
        {
            facilitiesString += `<option value="${facility.id}" class="facilities--option">
                            ${facility.name}</option>`
        }
    }
    facilitiesString +=`
            </select>
        </div>`
    return facilitiesString
}

document.addEventListener(
    "change",
    (event) =>
    {
        const facilityElement = event.target
        if(facilityElement.dataset.type === "facility")
        {
            setCurrentFacility(facilityElement.value)

            document.dispatchEvent(renderEvent)
        }
    }
)
