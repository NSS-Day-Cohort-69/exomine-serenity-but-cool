import { getSpaceCartHTML } from "./spaceCart/spaceCartComponent.js"
import { getFacilityMineralsHTML } from "./facility-minerals/facilityMineralsComponent.js"

export const getMineralCartHTML = async () => {
    const spaceCartHTML = await getSpaceCartHTML()
    const facilityMineralHTML = await getFacilityMineralsHTML()
   
    const mineralComponentHTML = `<div class="minerals-cart">
                            ${facilityMineralHTML}
                            ${spaceCartHTML}
                         </div>`
    return mineralComponentHTML
}
