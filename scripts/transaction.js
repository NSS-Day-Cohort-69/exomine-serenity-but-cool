import { getPlanetMinerals } from "./planetMineralsData.js"


const facilityMinerals = []
const planetMineral = []


let planet = null

export const updatePlanet = async (newPlanet) =>
{
    planet = newPlanet

    if(transaction.facilityMineral !== null && planet !== null)
    {
        await updatePlanetMineral()
    }
}

export const updateFacilityMineral = async (newFacilityMineral) => 
{
    transaction.facilityMineral = newFacilityMineral

    //if planet has been set
    if(planet !== null && transaction.facilityMineral !== null)
    {
        await updatePlanetMineral()
    }
    
}

export const addFacilityMineral = async (newFacilityMineral) =>
{
    facilityMinerals.push(newFacilityMineral)
}

export const removeFacilityMineral = (removeFacilityMineralId) =>
{
    const facilityMineral = facilityMinerals.find(facilityMineral => facilityMineral.id === removeFacilityMineralId)
    if(facilityMineral !== undefined)
    {
        const index = facilityMinerals.indexOf(facilityMineral)

        if(index >= 0)
        {
            facilityMinerals.splice(index, 1)
        }
    }
}

export const updatePlanetMineral = async () =>
{
    const planetMinerals = await getPlanetMinerals()
    
    const thisPlanetMineral = planetMinerals.find(planetMineral => planetMineral.mineralId === transaction.facilityMineral.mineralId && planetMineral.planetId === planet.id)

    //if there was not a planetMineral that meets condition, find will return undefined.
    if (thisPlanetMineral != undefined)
    {
        transaction.planetMineral = thisPlanetMineral
    } else
    {
        transaction.planetMineral = null
    }
}

export const getPlanetMineral = () => {
    return transaction.planetMineral
}

export const getFacilityMineral = () => {
    return transaction.facilityMineral
}

export const getPlanet = () =>{
    return planet
}

export const transactionIsValid = () =>
{
    //this returns true if neither of facility mineral and planet mineral are null (null evaluates to false in boolean operations, objects evaluate to true). the transaction also isnt valid if the facility is out of the mineral.
    return transaction.facilityMineral != null && planet != null && transaction.facilityMineral.mineralTons > 0
}

export const doTransaction = async () => {
    transaction.facilityMineral.mineralTons--
    
    //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
    const cleanFacilityMineral = 
    {
        id: transaction.facilityMineral.id,
        facilityId: transaction.facilityMineral.facilityId,
        mineralId: transaction.facilityMineral.mineralId,
        mineralTons: transaction.facilityMineral.mineralTons
    }

    const facilityMineralOptions =
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFacilityMineral)
    }
    const facilityMineralResponse = await fetch(`http://localhost:8088/facilityMinerals/${cleanFacilityMineral.id}`, facilityMineralOptions)

    //if planetMineral is an object, it will put it to the database. If it is null, it means that there is not yet a planet mineral for that mineral on that planet, so it creates a new one instead
    
    if(transaction.planetMineral != null)
    {
        transaction.planetMineral.mineralTons++

        //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
        const planetMineralObject = 
        {
            id: transaction.planetMineral.id,
            planetId: transaction.planetMineral.planetId,
            mineralId: transaction.planetMineral.mineralId,
            mineralTons: transaction.planetMineral.mineralTons
        }

        const planetMineralOptions =
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planetMineralObject)
        }

        const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals/${planetMineralObject.id}`, planetMineralOptions)
    } else 
    {
        
        //planetMineral doesn't exist, so create a new one
        const planetMineralObject = 
        {
            planetId: planet.id,
            mineralId: transaction.facilityMineral.mineralId,
            mineralTons: 1
        }
        
        transaction.planetMineral

        const planetMineralOptions =
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planetMineralObject)
        }

        const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals`, planetMineralOptions)

        updatePlanetMineral()
    }
}
