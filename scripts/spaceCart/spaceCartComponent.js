import { doTransaction, getCurrentFacilityMinerals, transactionIsValid } from "../transaction.js"

const renderEvent = new CustomEvent("domUpdated")

export const getSpaceCartHTML = async () => {
    const facilityMinerals = getCurrentFacilityMinerals()

    let spaceCartHTML = `<div class="space-cart">
     <h3 class="space-cart--header">Space Cart</h3>`
    
    for (const facilityMineral of facilityMinerals) 
    {
        spaceCartHTML += `<p> 1 ton of ${facilityMineral.mineral.name} from ${facilityMineral.facility.name}</p>`
    }

    spaceCartHTML += `<button data-type="spaceCart" class="space-cart--button">Purchase Mineral</button>
    </div>
    `

    return spaceCartHTML
}

document.addEventListener(
    "mouseup",
    async (event) =>
    {
        const spaceCartElement = event.target
        if(spaceCartElement.dataset.type === "spaceCart")
        {
            if(transactionIsValid())
            {
                await doTransaction()
            } else
            {
                window.alert("Transaction invalid. Either form is not complete or the facility is out of the chosen mineral.")
            }

            document.dispatchEvent(renderEvent)
        }
    }
)