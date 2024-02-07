import { getFacilitiesHTML } from "./facilities/facilities.js"
import { getGovernorsHTML } from "./governors/governorComponent.js"
import { getSpaceCartHTML } from "./spaceCart/spaceCartComponent.js"

const render = async () =>
{
    // the following is temp code to test that getGovernorsHTML works. Uncomment if testing feature branch

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

    const spaceCartContainer = document.querySelector(".minerals-cart")
    const spaceCartHTML = await getSpaceCartHTML()
    spaceCartContainer.innerHTML = spaceCartHTML
}

render()
