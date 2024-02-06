import { getFacilities } from "./facilityData.js"

const facilities = getFacilities()

const facilitiesHTML = ()  => {
    let facilitiesString = `
        <div class="facilities">
            <label for="facility-names" class="facility-label">Choose a facility</label>
            <select name="facility-names" class="facilities--facilities-dropdown">`
    for (const facility of facilities) {
        if (facility.active == true) {
            facilitiesString += `<option value="${facility.id}" class="facilities--option">
                                ${facility.name}</option>`
            }
    }
    facilitiesString +=`
            </select>
        </div>`
    return facilitiesString
}


