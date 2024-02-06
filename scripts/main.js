import { getFacilitiesHTML } from "./facilities/facilities.js"


const facilitiesHTML = await getFacilitiesHTML()
const dropdownElement = document.querySelector(".dropdowns")
dropdownElement.innerHTML = facilitiesHTML  

