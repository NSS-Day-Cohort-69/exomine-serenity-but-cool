import { getFacilitiesHTML } from "./facilities/facilities.js"
const facilitiesHTML = getFacilitiesHTML()
const dropdownElement = document.querySelector(".dropdowns")
dropdownElement.innerHTML = facilitiesHTML  

