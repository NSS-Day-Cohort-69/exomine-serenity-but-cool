import { doTransaction, getFacilityMineral, getPlanet, transactionIsValid } from "../transaction.js"

export const getSpaceCartHTML = async () => {
    const facilityMineral = getFacilityMineral()

    //get facilityMinerals
    //get planets

    //get current facilityMineralId from transaction
    //get current planet from transaction

    //find facilityMineral instance in facilityMinerals
    //find planet instance in planets

    let spaceCartHTML = `<div class="space-cart">
     <h3 class="space-cart--header">Space Cart</h3>`
    if (facilityMineral != null) {
        spaceCartHTML += `<p> 1 ton of ${facilityMineral.mineral.name} from ${facilityMineral.facility.name}</p>`
    }

    spaceCartHTML += `<button data-type="spaceCart" class="space-cart--button">Purchase Mineral</button>
    </div>
    `

    return spaceCartHTML
}

document.addEventListener(
    "mouseup",
    (event) =>
    {
        const spaceCartElement = event.target
        if(spaceCartElement.dataset.type === "spaceCart")
        {
            if(transactionIsValid())
            {
                doTransaction()
            } else
            {
                window.alert("Transaction invalid. Either form is not complete or the facility is out of the chosen mineral.")
            }
        }
    }
)